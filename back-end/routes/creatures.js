const express = require('express');
const sanitize = require('sanitize-html');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const Creature = require('../models/Creature');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create creature (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const creature = new Creature(req.body);
    await creature.save();
    res.status(201).json(creature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit creature (admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Creature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Creature not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete creature (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Creature.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Creature not found' });
    res.json({ message: 'Creature deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all creatures (anyone)
router.get('/', async (req, res) => {
  const creatures = await Creature.find();
  res.json(creatures);
});

// Search creatures by name (any user with token)
// Helper function to escape regex special characters to prevent ReDoS
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Rate limiter to prevent abuse (e.g. brute-force search or DoS)
const searchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 20, // limit to 20 requests per IP per minute
  message: 'Too many search requests, please try again later.'
});

// Route: Search for creatures by name or origin
// Protection: Token required, rate limited
router.get('/search', authenticate, searchLimiter, async (req, res) => {
  const rawQuery = req.query.query || '';

  // Sanitize the query to remove HTML and trim spaces
  const query = sanitize(rawQuery).trim();

  // Basic validation: reject empty, overly long, or dangerous inputs
  if (!query || query.length > 50 || !/^[\w\s\-]+$/.test(query)) {
    return res.status(400).json({ message: 'Invalid or missing search query' });
  }

  // Escape regex characters to avoid injection and ReDoS
  const safeQuery = escapeRegex(query);

  try {
    // Search using case-insensitive regex (safe version)
    const creatures = await Creature.find({
      $or: [
        { name: new RegExp(safeQuery, 'i') },
        { origin: new RegExp(safeQuery, 'i') }
      ]
    });

    // Return matching creatures
    res.json(creatures);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error during search' });
  }
});

module.exports = router;
