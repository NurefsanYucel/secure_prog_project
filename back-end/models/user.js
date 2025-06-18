
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  myCreatures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Creature' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
