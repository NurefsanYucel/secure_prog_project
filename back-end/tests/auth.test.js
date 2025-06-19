/*
This test:
Sends a POST to /signup
Checks for HTTP 201
Checks success message
*/
// tests/auth.test.js

jest.setTimeout(15000); // 15 seconds timeout for slow DB connections

require('dotenv').config({ path: '.env.test' });

const request = require('supertest'); //simulate HTTP requests to Express app.
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST); //connects to test db
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/signup', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'TestPassword123'
      });
  
    console.log(res.body); // 👈 print the error
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created');
  });
  
});

