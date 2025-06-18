// --- models/Log.js ---
const { Schema, model } = require('mongoose');
const logSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object }
});
module.exports = model('Log', logSchema);
