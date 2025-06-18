// mythodex-backend/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const creatureRoutes = require('./routes/creatures');
const adminRoutes = require('./routes/admin');
const userCreaturesRoutes = require('./routes/userCreatures');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/creatures', creatureRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', userCreaturesRoutes);

module.exports = app;  // export app only


