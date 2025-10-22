# secure_prog_project

A secure programming demo project showcasing best practices in authentication, access control, and system logging.

---

## Table of Contents
- [About](#about)
- [Features](#features)
- [Security Highlights](#security-highlights)
- [Technologies](#technologies)
- [Project Structure](#project-structure)

---

## About

This project demonstrates a secure backend (and optionally frontend) implementation for user management and role-based access.  
It is structured to allow for safe authentication flows, privileged operations, and system-level monitoring of key actions.  

The goal is to illustrate how to **design** and **implement** secure programming patterns in a modern JavaScript/Node.js environment.

---

## Features

- User signup, sign-in, and role assignment (e.g., normal user vs. admin)  
- Role-based access control ensuring restricted actions for privileged users only  
- Logging of critical user actions (sign-ups, log-ins, failed attempts, admin changes)  
- Secure password handling and authentication token management  
- Clear separation of modules/components (controllers, services, validation)  
- Example tests for security validation and role enforcement  

---

## Security Highlights

Security is at the core of this project. Below are the key aspects implemented to ensure the system’s robustness:

### 1. Password Hashing
All passwords are **hashed and salted** using strong algorithms such as **bcrypt**. No plaintext passwords are ever stored.

### 2. Token-Based Authentication
Authentication uses **JSON Web Tokens (JWT)** to manage sessions.  
Each request is validated to confirm user identity and permissions.

### 3. Input Validation & Sanitization
All user input is validated and sanitized to prevent **SQL/NoSQL injection**, **XSS**, and other input-based attacks.  

### 4. Role-Based Access Control (RBAC)
Users are assigned roles (normal users, admins) and access is granted based on these roles.  
Endpoints verify the requester’s role before allowing any privileged operation.

### 5. Logging & Audit Trails
Key security events (logins, failed attempts, privilege changes, and deletions) are logged with timestamps and user identifiers.  
This supports **incident response** and **auditing**.

### 6. Environment Configuration & Secrets Management
Sensitive data such as database credentials and JWT secrets are stored in `.env` files, not in version control.  
**dotenv** handles configuration securely.

### 7. Least Privilege Principle
Each user and process only has the permissions it needs. Admin features are isolated and protected from regular users.

### 8. Secure Dependencies
Dependencies are reviewed and updated regularly to minimize vulnerabilities using `npm audit` or similar tools.

### 9. Error Handling & Information Exposure
Errors are sanitized to avoid leaking internal system details to clients.  
This reduces the amount of exploitable information available to attackers.

By following these principles, the project serves as a strong example of secure Node.js application development.

---

## Technologies

This project was built using the following technologies:

- **Node.js** – JavaScript runtime for server-side development  
- **Express.js** – Web framework for routing and middleware  
- **MongoDB & Mongoose** – NoSQL database and ODM for storing user data and logs  
- **bcrypt** – For secure password hashing  
- **JSON Web Token (JWT)** – For token-based authentication and session management  
- **express-validator** – For validating and sanitizing user input  
- **dotenv** – For managing environment variables securely  
- **Helmet & rate limiting** – For securing HTTP headers and limiting request frequency  
- **Jest & Supertest** – For unit and integration testing of APIs  

---

## Project Structure

Below is a high-level overview of the folder and file organization:

```bash
.
├── back-end/             # Server-side code (Node/Express)
│   ├── controllers/      # Request handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── services/         # Business logic & role checks
│   ├── utils/            # Logging, token helpers, etc.
│   ├── tests/            # Unit and integration tests
│   └── app.js            # Entry point
├── front-end/            # (Optional) UI client code
├── .env.example          # Example environment variables
├── package.json          # Dependencies & scripts
└── README.md             # This file



