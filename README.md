# Expenso - Expense Tracker Backend

[Repository Link](https://github.com/ShivamMathtech/expenso_)

---

## Project Overview

Expenso is an industry-level **Expense Tracker backend** built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. It supports **user authentication**, **income management**, and **forgot/reset password functionality** with email notifications.

---

## Features

* User registration and login with **JWT authentication**
* Password hashing with **bcryptjs**
* Forgot password and reset password using **email tokens**
* CRUD operations for **Income** (create, read, update, delete)
* Protected routes for logged-in users only
* Modular controllers and routes for maintainability

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/ShivamMathtech/expenso_.git
cd expenso_
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file** with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
USER_MAIL=youremail@.com
MAIL_PASS=yourmailpass
```

4. **Start the server**

```bash
npm run dev
```

---

## API Endpoints

### Auth Routes

| Method | Route                           | Description                  |
| ------ | ------------------------------- | ---------------------------- |
| POST   | /api/auth/register              | Register a new user          |
| POST   | /api/auth/login                 | Login user and get JWT       |
| POST   | /api/auth/forgot-password       | Request password reset email |
| POST   | /api/auth/reset-password/:token | Reset password using token   |
| GET    | /api/auth/user/me               | Get logged-in user details   |

### Income Routes (Protected)

| Method | Route           | Description                      |
| ------ | --------------- | -------------------------------- |
| GET    | /api/income/me  | Get all income of logged-in user |
| GET    | /api/income/:id | Get single income by ID          |
| POST   | /api/income     | Add new income                   |
| PUT    | /api/income/:id | Update income by ID              |
| DELETE | /api/income/:id | Delete income by ID              |

---

## Usage Example

### Add Income (POST /api/income)

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**

```json
{
  "title": "Freelance Project",
  "amount": 5000,
  "source": "Freelance",
  "date": "2025-10-26",
  "notes": "Payment from client for October project"
}
```

### Forgot Password (POST /api/auth/forgot-password)

**Body:**

```json
{
  "email": "user@example.com"
}
```

### Reset Password (POST /api/auth/reset-password/:token)

**Body:**

```json
{
  "newPassword": "123456"
}
```

---

## Notes

* Make sure to use **JWT token** in the `Authorization` header for protected routes.
* Passwords are automatically hashed using **bcryptjs**.
* Reset tokens expire in 10 minutes.

---

This backend is ready to integrate with any frontend framework like React, Angular, or Vue for a full-featured Expense Tracker application.
