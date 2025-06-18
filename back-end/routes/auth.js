const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { logAction } = require('../utils/logger');
const { body, validationResult } = require('express-validator');

// POST /api/auth/signup
router.post('/signup', [
  body('email').isEmail().normalizeEmail(),
  body('username').trim().escape(),
  body('password').isLength({ min: 8 }),
  
], async (req, res) => {
  // Check validation result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    // Append pepper before hashing
    const pepperedPassword = password + process.env.PEPPER;
    const hashedPassword = await bcrypt.hash(pepperedPassword, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    await logAction({
      userId: user._id,
      action: 'signup',
      details: { email: user.email }
    });

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      await logAction({
        action: 'failed_signin',
        details: { email, reason: 'User not found' }
      });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Append pepper before comparing
    const pepperedPassword = password + process.env.PEPPER;
    const match = await bcrypt.compare(pepperedPassword, user.password);
    if (!match) {
      await logAction({
        userId: user._id,
        action: 'failed_signin',
        details: { email: user.email, reason: 'Wrong password' }
      });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    await logAction({
      userId: user._id,
      action: 'signin',
      details: { email: user.email }
    });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
