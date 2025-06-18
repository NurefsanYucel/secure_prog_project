const jwt = require('jsonwebtoken');
const { logAction, logToFile } = require('../utils/logger');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logToFile('WARN', '401 - No token provided');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    logToFile('INFO', `Verified token for user: ${decoded.userId}`);
    next();
  } catch (err) {
    logToFile('WARN', '401 - Invalid token');
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware to check for admin role
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    logToFile('WARN', `403 - Non-admin access attempt by user: ${req.user.userId}`);
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  logToFile('INFO', `Admin access granted to user: ${req.user.userId}`);
  next();
};

module.exports = { verifyToken, isAdmin };
