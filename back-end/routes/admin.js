const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Creature = require('../models/Creature');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { logAction } = require('../utils/logger');
const Log = require('../models/Log');



// GET all users
router.get('/users', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a user
router.delete('/users/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    // Log admin action
    await logAction({
      userId: req.user.userId,
      action: 'delete_user',
      details: { deletedUserId: req.params.id, deletedUserEmail: deleted.email }
    });

    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Promote user to admin
router.put('/users/:id/promote', verifyToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: 'admin' },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Log admin action
    await logAction({
      userId: req.user.userId,
      action: 'promote_user',
      details: { promotedUserId: req.params.id, promotedUserEmail: user.email }
    });

    res.json({ message: 'User promoted to admin', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all logs
router.get('/logs', verifyToken, isAdmin, async (req, res) => {
  try {
    const logs = await Log.find().populate('userId', 'username email');
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Creature management ---

// GET all creatures
router.get('/creatures', verifyToken, isAdmin, async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new creature
router.post('/creatures', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, origin, description } = req.body;
    const newCreature = new Creature({ name, origin, description });
    await newCreature.save();

    // Log admin action
    await logAction({
      userId: req.user.userId,
      action: 'create_creature',
      details: { creatureId: newCreature._id, name }
    });

    res.status(201).json({ message: 'Creature added', creature: newCreature });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update creature by ID
router.put('/creatures/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const { name, origin, description } = req.body;
    const updatedCreature = await Creature.findByIdAndUpdate(
      req.params.id,
      { name, origin, description },
      { new: true }
    );
    if (!updatedCreature) return res.status(404).json({ message: 'Creature not found' });

    // Log admin action
    await logAction({
      userId: req.user.userId,
      action: 'update_creature',
      details: { creatureId: req.params.id, name }
    });

    res.json({ message: 'Creature updated', creature: updatedCreature });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE creature by ID
router.delete('/creatures/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedCreature = await Creature.findByIdAndDelete(req.params.id);
    if (!deletedCreature) return res.status(404).json({ message: 'Creature not found' });

    // Log admin action
    await logAction({
      userId: req.user.userId,
      action: 'delete_creature',
      details: { creatureId: req.params.id, name: deletedCreature.name }
    });

    res.json({ message: 'Creature deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
