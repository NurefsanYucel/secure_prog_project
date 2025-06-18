const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Creature = require('../models/Creature');
const { verifyToken } = require('../middleware/auth');

// GET /api/my-creatures - View user's personal creature list
router.get('/my-creatures', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).populate('myCreatures');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.myCreatures); // Return the full creature objects
    } catch (err) {
      console.error('Error fetching my creatures:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// POST /api/my-creatures/:creatureId - Add a creature to user's list
router.post('/my-creatures/:creatureId', verifyToken, async (req, res) => {
    try {
      console.log('Authenticated user:', req.user); // will show userId
  
      const user = await User.findById(req.user.userId); 
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const creature = await Creature.findById(req.params.creatureId);
      if (!creature) return res.status(404).json({ message: 'Creature not found' });
  
      if (!user.myCreatures) user.myCreatures = [];
  
      if (user.myCreatures.includes(creature._id)) {
        return res.status(400).json({ message: 'Creature already in your list' });
      }
  
      user.myCreatures.push(creature._id);
      await user.save();
  
      res.json({ message: 'Creature added to your list', creature });
    } catch (err) {
      console.error('Error in /my-creatures route:', err);
      res.status(500).json({ message: err.message });
    }
});
  

// DELETE /api/my-creatures/:creatureId - Remove a creature from user's list
router.delete('/my-creatures/:creatureId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.myCreatures = user.myCreatures.filter(
      id => id.toString() !== req.params.creatureId
    );
    await user.save();
    res.json({ message: 'Creature removed from your list' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


