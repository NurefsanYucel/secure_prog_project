# secure_prog_project  
A secure programming demo project showcasing best-practices in authentication, access control and system logging.

---

## Table of Contents
- [About](#about)  
- [Features](#features)  
- [Security Highlights](#security-highlights)  
- [Technologies](#technologies)  
- [Project Structure](#project-structure)  
- [Setup & Installation](#setup-installation)  
- [License](#license)  

---

## About  
This project demonstrates a secure backend (and optionally frontend) implementation for user management and role-based access. It is structured to allow for safe authentication flows, privileged operations, and system-level monitoring of key actions.  

It is intended as a reference for how to **design** and **implement** secure programming patterns in a modern JS/Node environment.

---

## Features  
- User signup, sign-in, and role assignment (e.g., normal user vs. admin)  
- Role-based access control: only certain roles can perform high-privilege actions  
- Logging of critical user actions (sign-ups, log-ins, failed attempts, admin changes)  
- Secure password handling and authentication token handling  
- Clear separation of modules/components (e.g., controllers, services, validation)  

---

## Security Highlights  
This section calls out the main security-specific practices implemented in the project:

- **Password hashing**: All stored passwords are hashed (and salted) using strong algorithms (e.g., bcrypt) rather than storing plaintext.  
- **Token‐based authentication**: Authentication uses JSON Web Tokens (JWT) or equivalent — validating tokens on each request and enforcing minimal privileges.  
- **Input validation & sanitization**: Incoming requests (signup, signin, data modifications) are validated to prevent injection or malformed data.  
- **Role-based access control (RBAC)**: Users are assigned roles (normal users, admins) and each API endpoint checks the role before allowing the operation.  
- **Logging & audit trails**: Key events (successful and failed logins, privilege changes, data deletion etc.) are logged with timestamps and user identifiers so that suspicious activity can be traced.  
- **Environment configuration & secrets management**: Secrets (e.g., database credentials, JWT secret keys) are kept in environment variables and not committed to source control.  
- **Least privilege principle**: Admin operations are separated and only executed if the user has an explicit admin role. Normal users cannot escalate privileges or perform deletion operations.  
- **Secure dependencies & updates**: Care is taken to keep dependencies up to date and review for known vulnerabilities (using audit tools, scanning).  
- **Error handling & information exposure**: Errors do not leak sensitive information (e.g., stack traces or database internals) to the client side, reducing information that an attacker could exploit.

By following these practices, the project is structured to serve as a strong example of how to build secure server-side software in a JavaScript/Node context.

---

## Technologies  
- **Node.js** – JavaScript runtime for server-side development  
- **Express.js** – Web framework for routing and middleware  
- **MongoDB & Mongoose** – NoSQL database and ODM for storing user data and logs  
- **bcrypt** – For secure password hashing  
- **JSON Web Token (JWT)** – For token-based authentication and session management  
- **express-validator** (or similar) – For request input validation  
- **dotenv** – For environment variable management  
- **Jest & Supertest** – For unit and integration testing of APIs  
- Others as required (e.g., logging library, rate-limiting/helmet middleware)  

---

## Project Structure  
A high-level outline of the folder and file organisation:



