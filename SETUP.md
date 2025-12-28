# Manual Authentication System - Setup Guide

## Overview
This is a complete manual authentication system built with React, Vite, Tailwind CSS, Zustand, and React Router.

## Features
- ✅ User Signup with validation
- ✅ User Login (email/username)
- ✅ Google OAuth integration
- ✅ Apple Sign-In UI (placeholder)
- ✅ Forgot Password (2-step verification)
- ✅ Role-based access control (User/Admin)
- ✅ Protected routes
- ✅ HttpOnly cookie authentication
- ✅ Persistent auth state (localStorage)

## Installation

### 1. Install Dependencies

```bash
npm install axios zustand react-router-dom react-hook-form @react-oauth/google
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the following values:
- `VITE_API_BASE_URL`: Your backend API URL
- `VITE_GOOGLE_CLIENT_ID`: Your Google OAuth Client ID (from Google Cloud Console)

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins (e.g., `http://localhost:5173`)
6. Copy the Client ID to your `.env` file

### 4. Tailwind CSS Setup

If not already set up, install Tailwind:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Update main.jsx

Make sure your `src/main.jsx` looks like this:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## Project Structure

```
src/
├── api/
│   └── axios.js                 # Axios instance with baseURL & credentials
├── store/
│   └── authStore.js             # Zustand auth store
├── components/
│   ├── PublicRoute.jsx          # Redirects to home if authenticated
│   ├── ProtectedRoute.jsx       # Redirects to login if not authenticated
│   └── AdminRoute.jsx           # Redirects to unauthorized if not admin
├── pages/
│   ├── auth/
│   │   ├── Login.jsx           # Login with social auth
│   │   ├── Signup.jsx          # Signup with validation
│   │   └── ForgotPassword.jsx  # 2-step password reset
│   ├── Home.jsx                # Public home page
│   ├── Dashboard.jsx           # Protected user dashboard
│   ├── AdminPanel.jsx          # Admin-only page
│   └── Unauthorized.jsx        # Access denied page
└── App.jsx                      # Main app with routes
```

## Usage

### Start Development Server

```bash
npm run dev
```

### Using the Auth Store

```jsx
import useAuthStore from './store/authStore';

function MyComponent() {
  const { user, isAuthenticated, role, login, logout } = useAuthStore();
  
  // Use auth state and methods
}
```

### API Contract

The system expects these backend endpoints:

#### Authentication
- `POST /auth/signup` - Register new user
  ```json
  { "username": "string", "email": "string", "password": "string" }
  ```

- `POST /auth/login` - Login user
  ```json
  { "identifier": "string", "password": "string" }
  ```

- `POST /auth/google` - Google OAuth login
  ```json
  { "token": "string" }
  ```

- `GET /auth/me` - Get current user (requires auth cookie)
  ```json
  Response: { "user": { "id": "...", "email": "...", "role": "..." } }
  ```

#### Password Reset
- `POST /auth/forgot-request` - Request reset code
  ```json
  { "email": "string" }
  ```

- `POST /auth/reset-verify` - Verify code and reset password
  ```json
  { "email": "string", "code": "string", "newPassword": "string" }
  ```

### Backend Requirements

Your backend must:
1. Set HttpOnly cookies on successful authentication
2. Accept `credentials: true` in CORS config
3. Return user object with `role` field
4. Validate cookies on `/auth/me` endpoint

Example Express.js CORS config:

```js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Security Notes

- Passwords are sent over HTTPS only in production
- Auth state persists in localStorage (non-sensitive data only)
- Actual session managed via HttpOnly cookies
- CSRF protection should be implemented on backend
- Rate limiting recommended for auth endpoints

## Customization

### Adding More Social Providers

Check the Login.jsx file for the Apple Sign-In placeholder. Follow similar patterns for other providers.

### Changing Styles

All components use Tailwind CSS. Customize the colors and styles by modifying the className attributes.

### Adding More Roles

Update the `AdminRoute` component to support additional roles:

```jsx
if (!['admin', 'moderator'].includes(role)) {
  return <Navigate to="/unauthorized" replace />;
}
```

## Troubleshooting

### Google Sign-In not working
- Verify `VITE_GOOGLE_CLIENT_ID` is correct
- Check authorized origins in Google Cloud Console
- Ensure you're running on the same origin as configured

### Cookies not being sent
- Verify `withCredentials: true` in axios config
- Check backend CORS configuration
- Ensure backend sets cookies with proper domain/path

### Auth state not persisting
- Check browser localStorage
- Verify Zustand persist middleware is configured
- Check browser console for errors

## License

MIT
