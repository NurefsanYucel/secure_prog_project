# Express Creature API

A RESTful API built with Express.js and MongoDB for managing mythical creatures. The project supports user authentication, role-based access control, detailed admin capabilities, logging, and unit testing.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup & Installation](#setup--installation)  
- [Environment Variables](#environment-variables)  
- [Running the Project](#running-the-project)  
- [Testing](#testing)  
- [Admin User](#admin-user)  
- [Authentication Flow & Password Requirements](#authentication-flow--password-requirements)  
- [User Roles & Permissions](#user-roles--permissions)  
- [Logging](#logging)  
- [Security Notes](#security-notes)  
- [Project Structure](#project-structure)  

---

## Features

- **User Signup and Signin:**
  - Email format validation.
  - Password must be at least 8 characters and include lowercase, uppercase, number, and special character.
  - Confirm password matching during signup.
  - Passwords hashed with bcrypt and a secret pepper.
- **JWT-based authentication** with tokens stored client-side.
- **Role-Based Access Control:**
  - **Admin users** can:
    - Add, edit, and delete creatures in the system.
    - View all registered users.
    - Promote normal users to admin role.
    - Delete users.
    - View system logs.
  - **Normal users** can:
    - Search creatures in the system.
    - Add creatures to their personal list.
    - Remove creatures from their personal list.
- **Logging:** All critical user actions (signup, signin, failed signin, admin actions) are logged with timestamps.
- **Frontend:** Sign-in form with password visibility toggle and redirects based on user roles.
- **Unit Testing:** Jest and Supertest used to test API endpoints.

---

## Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- bcrypt for secure password hashing
- JSON Web Token (JWT) for authentication
- express-validator for request validation
- Jest & Supertest for testing
- dotenv for environment variables

---


