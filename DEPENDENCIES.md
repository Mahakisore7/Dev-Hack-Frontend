# Required Dependencies for Auth System

Run this command to install all required dependencies:

```bash
npm install axios zustand react-router-dom react-hook-form @react-oauth/google
```

## Dependency Breakdown:

- **axios** (^1.6.0): HTTP client for API calls
- **zustand** (^4.4.0): Lightweight state management
- **react-router-dom** (^6.20.0): Routing and navigation
- **react-hook-form** (^7.48.0): Form validation and handling
- **@react-oauth/google** (^0.12.0): Google OAuth integration

## Dev Dependencies (if not already installed):

```bash
npm install -D tailwindcss postcss autoprefixer
```

## Complete package.json example:

```json
{
  "name": "dev-hack-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-router-dom": "^6.20.0",
    "react-hook-form": "^7.48.0",
    "@react-oauth/google": "^0.12.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```
