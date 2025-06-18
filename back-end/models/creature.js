// --- models/Creature.js ---
const { Schema, model } = require('mongoose');
const creatureSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Japanese', 'Greek', 'Egyptian', 'Nordic'], required: true },
  description: { type: String },
  imageUrl: { type: String }
});
module.exports = model('Creature', creatureSchema);