const express = require('express');
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
router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const creatures = await Creature.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { origin: new RegExp(query, 'i') }
      ]
    });

    res.json(creatures);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'Server error during search' });
  }
});


module.exports = router;
