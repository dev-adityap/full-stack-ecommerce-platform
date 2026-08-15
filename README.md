# 🛒 NexusStore - Full Stack E-Commerce Platform

NexusStore is a full-stack e-commerce web application built using the MERN stack. 
It provides a complete online shopping experience with product browsing, authentication, cart management, wishlist functionality, order processing, customer feedback, and an admin dashboard.

---

## 🚀 Live Project

Coming soon.

---

## 📌 Project Overview

NexusStore is designed as a modern e-commerce platform where customers can:

- Browse products across multiple categories
- Search and filter products
- View detailed product information
- Add products to their cart
- Manage their wishlist
- Create an account and log in
- Place orders
- Track orders
- View previous orders
- Submit customer feedback and reviews

The platform also includes an admin system for managing products, users, orders, and customer feedback.

---

## ✨ Features

### 🛍️ Shopping

- Product listing
- Product categories
- Product search
- Product details page
- Product ratings and reviews
- Featured products
- Best-selling products
- New arrivals
- Product stock information
- INR pricing with Indian number formatting

### 🛒 Cart & Wishlist

- Add products to cart
- Remove products from cart
- Update product quantities
- Automatic cart total calculation
- Wishlist functionality
- Cart persistence

### 👤 Authentication

- User registration
- User login
- User profile
- Authentication using JWT
- Protected routes
- Admin authentication

### 📦 Orders

- Checkout system
- Shipping information
- Order creation
- Order history
- Order tracking
- Order success page
- Admin order management

### ⭐ Customer Feedback

- Customer feedback form
- Customer name and email
- Product/customer rating
- Review comments
- Review display
- Feedback management

### 👨‍💼 Admin Dashboard

- Admin dashboard
- Product management
- Order management
- User management
- Customer feedback management
- Admin-only functionality

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- React Context API

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm

---

## 📁 Project Structure

```text
full-stack-ecommerce-platform/
│
├── backened/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── feedbackController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   │
│   ├── data/
│   │   └── products.js
│   │
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── feedbackModel.js
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── feedbackRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── server.js
│   ├── seed.js
│   ├── seeder.js
│   ├── package.json
│   └── .env
│
├── frontened/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── vite.config.js
└── README.md
