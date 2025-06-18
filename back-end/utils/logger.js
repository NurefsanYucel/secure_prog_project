//Covers both:  File-based server logs (server.log) and MongoDB audit logs 

// utils/logger.js
const fs = require('fs');
const path = require('path');
const Log = require('../models/Log');

const logFilePath = path.join(__dirname, '../logs/server.log');

// Save audit log in MongoDB (who, what, when)
const logAction = async ({ userId, action, details = {} }) => {
  try {
    const log = new Log({ userId, action, details });
    await log.save();
    logToFile('INFO', `Audit: ${action}`, userId);
  } catch (err) {
    logToFile('ERROR', `Audit log failed: ${err.message}`);
  }
};

// Save general logs in file (info, warning, error)
const logToFile = (level, message, userId = null) => {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] [${level}]${userId ? ` [User: ${userId}]` : ''} ${message}\n`;

  fs.appendFile(logFilePath, entry, err => {
    if (err) console.error('Failed to write to log file:', err);
  });

  console.log(entry); // Optional: also print to console
};

module.exports = { logAction, logToFile };

