// to connect the db

// mythodex-backend/server.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { connectDB } = require('./config/db');

dotenv.config();

const PORT = process.env.PORT || 5050;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
  });
