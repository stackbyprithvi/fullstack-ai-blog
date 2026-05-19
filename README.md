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
├── backend/
│ ├── controller/ Business logic
│ ├── models/ MongoDB schemas
│ ├── routes/ API endpoints
│ ├── middleware/ Auth middleware
│ └── utils/ Helper functions
└── frontend/
├── src/
│ ├── components/ Reusable UI components
│ ├── pages/ Page components
│ ├── context/ React Context providers
│ ├── services/ API services
│ └── utils/ Frontend utilities
