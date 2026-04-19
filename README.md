# Role-Based E-Commerce Admin Dashboard

A backend-focused eCommerce admin system built with **Node.js**, **Express**, **Sequelize**, **PostgreSQL**, **JWT Authentication**, and **AdminJS**.

This project demonstrates:
- secure login with hashed passwords,
- JWT-protected API routes,
- and role-based access control (**admin** vs **user**) in AdminJS.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- AdminJS + @adminjs/express + @adminjs/sequelize
- bcrypt
- JSON Web Token (JWT)
- dotenv

---

## 📁 Project Structure

```bash
project-root/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── user.js
│   ├── category.js
│   ├── product.js
│   ├── order.js
│   ├── orderItem.js
│   ├── setting.js
│   └── index.js
├── routes/
│   └── authRoutes.js
├── admin/
│   └── admin.js
├── seed/
│   └── seedAdmin.js
├── app.js
├── .env
├── screenshots
└── package.json

```

---

## ⚙️ Setup Instructions

### 1) Clone repository
```bash
git clone <repo-url>
cd <project-folder>
```

### 2) Install dependencies
```bash
npm install
```

### 3) Create `.env` file
Add the following values:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=database_name
DB_USER=database_user
DB_PASSWORD=database_password

JWT_SECRET=jwt_secret

SESSION_SECRET=session_secret
COOKIE_SECRET=cookie_secret
```

### 4) Run project
```bash
npm run dev
```

Server runs on:
- `http://localhost:5000`
- Admin panel: `http://localhost:5000/admin`

---

## 🗄️ Database Models

- **User**
- **Category**
- **Product**
- **Order**
- **OrderItem**
- **Setting**

### Relationships
- User → Orders
- Category → Products
- Order → OrderItems
- Product → OrderItems

---

## 🔐 Authentication APIs

### 1) Login
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Responses:
- `200 OK` → returns JWT token
- `401 Unauthorized` → invalid credentials

### 2) Current User
**GET** `/api/auth/me`  
Requires Bearer token in `Authorization` header.

Responses:
- `200 OK` → user info
- `401 Unauthorized` → missing/invalid token

---

## 👥 Role-Based Access Control (RBAC)

### Admin Role
- Full CRUD access to:
  - Users
  - Categories
  - Products
  - Orders
  - OrderItems
  - Settings

### User Role
- Read-only access to:
  - Categories
  - Products
  - Orders
  - OrderItems
- No access to:
  - Users
  - Settings

> Password field is hidden in AdminJS views for security.

---

## 🌱 Seed Admin User

Use seed script to create default admin user (hashed password).

Example credentials:
- Email: `admin@example.com`
- Password: `admin123`
- Role: `admin`

---
## 📸 Evidence / Screenshots
This project includes proof screenshots for AdminJS, Postman API testing, and pgAdmin database verification.

Tested features:
- Login success/failure
- JWT protected route (`/api/auth/me`)
- Admin full permissions
- User restricted permissions
- CRUD operations in AdminJS
- DB relationships
- Password hashing with bcrypt


## 👨‍💻 Author

- Name: `chamika Raigama`

---
