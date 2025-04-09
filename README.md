# 🚀 Node.js Starter API with Express, JWT Auth & MySQL

A modular Node.js REST API starter with versioned routes, JWT authentication, middleware support, and MySQL database.

---

## 📁 Project Structure

```
/node-api-starter
├── config/
├── controllers/
├── middlewares/
├── routes/v1/
├── .env
├── .gitignore
├── app.js
└── README.md
```

---

## ⚙️ Requirements

- Node.js v16+
- MySQL
- Postman/cURL for testing

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Setup database

Create a MySQL database and run:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

### 3. Create `.env` file

Refer to `.env` example included in the project.

---

## 🧪 API Endpoints

### Public Routes
| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| POST   | `/api/v1/register` | Register a user    |
| POST   | `/api/v1/login`    | Login and get JWT  |

### Protected Routes
| Method | Endpoint      | Description           |
|--------|---------------|-----------------------|
| GET    | `/api/v1/me`  | Get authenticated user|

> Header: `Authorization: Bearer <your-token>`

---

## ✅ Features

- Modular folder structure
- JWT Authentication
- MySQL DB connection with pooling
- Route versioning (`/api/v1/...`)
- Middleware-based protection
- CORS enabled
- JSON responses

---

## 🤝 License

MIT
