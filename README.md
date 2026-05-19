# MERN Blog Platform with AI Assistant

A full-stack blog application built with the MERN stack featuring AI-powered blog generation, authentication, and dark mode.

## Features

### Core Features
- JWT based authentication with login and register
- Create, read, update, and delete blog posts
- Like and unlike posts with real-time updates
- Comment system for post engagement
- User profiles with personal post management

### Advanced Features
- AI blog post generator using Google Gemini API
- Dark and light mode theme toggle with persistent preference
- Email based password reset and recovery
- Fully responsive design for all devices

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Axios
- React Router DOM
- Context API

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for emails

### AI Integration
- Google Gemini API via OpenRouter

## Project Structure
mern-blog-app/
│
├── backend/
│   ├── controller/
│   │   └── authController.js
│   │
│   ├── models/
│   │   └── User.js
│   │   └── Post.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │   └── postRoutes.js
│   │   └── commentRoutes.js
│   │   └── aiRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── NavBar.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── AIBlogGenerator.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── postService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
