# 🛒 eCommerce Admin Dashboard

This project is a simple **Role-Based Admin Dashboard** for an eCommerce system.
It is built using **Node.js, Express, Sequelize, PostgreSQL, and AdminJS**.

---

## 🚀 Features

* User login with JWT authentication
* Password hashing using bcrypt
* Admin and User roles
* Admin panel using AdminJS
* Basic eCommerce models (User, Product, Order, etc.)

---

## 🛠️ Technologies

* Node.js
* Express.js
* PostgreSQL
* Sequelize
* AdminJS

---

## ⚙️ Setup

### 1. Install dependencies

```
npm install
```

### 2. Create `.env` file

```
PORT=5000
DB_NAME=ecommerce_admin
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=mysecret
```

### 3. Create database

```
CREATE DATABASE ecommerce_admin;
```

### 4. Run project

```
npm start
```

---

## 🌐 Access

* Server: http://localhost:5000
* Admin Panel: http://localhost:5000/admin

---

## 🔐 Login

```
Email: admin@example.com  
Password: admin123  
```

---

## 📦 Models

* User
* Category
* Product
* Order
* OrderItem
* Setting

---

## 👤 Roles

* **Admin** → full access
* **User** → limited access

---

