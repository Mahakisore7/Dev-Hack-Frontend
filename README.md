# 🚒 ResQ Frontend

ResQ is a modern, responsive **real-time emergency incident reporting and command-center management system** built for smart cities and emergency services.

This repository contains the **frontend web application**, developed using **React + Vite**, that enables citizens to report incidents and allows administrators/responders to verify, prioritize, and resolve them using a live dashboard and interactive maps.

---

## 📌 Project Overview

Emergency response systems often suffer from:
- Delayed reporting
- Duplicate or fake incident alerts
- Poor real-time visibility for responders

**ResQ** solves this by providing:
- Fast citizen-side reporting
- Community-assisted verification
- Real-time incident tracking
- A centralized admin command panel with map-based monitoring

The application is designed to be **simple, explainable, and scalable**, making it suitable for real-world deployment as well as hackathon evaluation.

---

## 👥 User Roles

### 🟢 Citizen
Citizens can:
- Report emergency incidents (fire, accident, medical, public safety)
- Upload optional images
- View live incident status
- Participate in verification using upvotes/downvotes

### 🛡️ Admin / Responder
Admins can:
- View all reported incidents in real time
- Verify or reject incidents
- Resolve confirmed incidents
- Track incidents visually on a live map
- Manage incident lifecycle states

---

## ✨ Key Features

### 👤 Citizen Interface
- **Quick Incident Reporting**  
  Simple form with minimal inputs to reduce reporting delay

- **Real-Time Incident Feed**  
  Live updates showing incident status changes

- **Community Verification**  
  Upvote/downvote mechanism to improve report credibility

- **Map Visualization**  
  Interactive map displaying nearby incidents

---

### 🛡️ Admin Dashboard
- **Incident Lifecycle Management**  
  Incidents move through:
  - Unverified
  - Verified
  - Resolved
  - Rejected

- **Interactive Command Map**  
  Live geospatial view of all incidents using Leaflet

- **Incident Actions**
  - Verify incident
  - Reject false reports
  - Mark incidents as resolved

- **Real-Time Sync**
  - Updates reflected instantly without page reload

---

## 🔐 Authentication & Authorization

- Role-based access control:
  - Citizen
  - Admin
- JWT-based authentication
- Protected routes
- Session persistence using localStorage

---

## 🎨 UI / UX Design

- Clean, modern dashboard layout
- Fully responsive (mobile-first)
- Designed for fast decision-making
- Dark-themed admin interface for command-center usage

---

## 🧩 Frameworks & Platforms Used

### 🌐 Frontend
- **React** – Component-based UI framework
- **Vite** – Fast development server and build tool
- **Tailwind CSS** – Utility-first styling
- **React Router DOM** – Client-side routing
- **Lucide React** – Icon library
- **Leaflet & React-Leaflet** – Interactive maps

### 🖥️ Backend (Integrated)
- **Node.js** – JavaScript runtime
- **Express.js** – REST API framework
- **JWT (JSON Web Tokens)** – Authentication
- **Socket.io** – Real-time communication

### 🗄️ Database & Cloud
- **MongoDB Atlas** – Cloud NoSQL database
- **Render** – Backend deployment
- **Netlify** – Frontend deployment

---

## 🌍 Live Deployment

The frontend application is deployed and publicly accessible:

- **Frontend (Netlify)**  
  👉 https://resqq.netlify.app/

> The deployed app supports real-time UI updates and is optimized for both desktop and mobile devices.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

- ```git clone <repository_url>```
- ```cd Dev-Hack-Frontend```
- ```npm install```
- ```npm run dev```
  
- App runs at: http://localhost:5173
