# Project Structure Documentation

This document outlines the organized structure of the Dev Hack Frontend project, designed for scalability and maintainability.

## 📁 Current Directory Structure

```
Dev-Hack-Frontend/
├── public/                          # Static assets
├── src/
│   ├── api/                        # API configuration
│   │   └── axios.js               # Axios instance with base config
│   ├── components/                 # Reusable components
│   │   ├── ui/                    # Basic UI components
│   │   │   └── index.js           # Button, Input, Card, Badge, Alert
│   │   ├── layout/                # Layout components
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── Footer.jsx         # Footer
│   │   │   └── Layout.jsx         # Main layout wrapper
│   │   ├── PublicRoute.jsx        # Route guard for public pages
│   │   ├── ProtectedRoute.jsx     # Route guard for authenticated users
│   │   └── AdminRoute.jsx         # Route guard for admin users
│   ├── pages/                      # Page components
│   │   ├── auth/                  # Authentication pages
│   │   │   ├── Login.jsx          # Login page with social auth
│   │   │   ├── Signup.jsx         # Registration page
│   │   │   └── ForgotPassword.jsx # Password reset flow
│   │   ├── Home.jsx               # Landing page
│   │   ├── Dashboard.jsx          # User dashboard
│   │   ├── AdminPanel.jsx         # Admin dashboard
│   │   └── Unauthorized.jsx       # Access denied page
│   ├── store/                      # State management
│   │   └── authStore.js           # Zustand auth store
│   ├── hooks/                      # Custom React hooks
│   │   └── index.js               # useLocalStorage, useDebounce, etc.
│   ├── utils/                      # Utility functions
│   │   └── helpers.js             # Common helper functions
│   ├── constants/                  # Application constants
│   │   └── index.js               # API endpoints, routes, roles
│   ├── assets/                     # Images, fonts, etc.
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles + Tailwind
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── package.json                   # Dependencies and scripts
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── index.html                    # HTML template
├── SETUP.md                      # Setup instructions
├── DEPENDENCIES.md               # Dependency documentation
└── PROJECT_STRUCTURE.md          # This file
```

## 🎯 Design Principles

### 1. **Separation of Concerns**
- **Components**: Reusable UI components
- **Pages**: Route-specific page components
- **Store**: Global state management
- **Utils**: Pure functions and helpers
- **Constants**: Configuration and static values

### 2. **Scalability**
- Organized folder structure for easy navigation
- Reusable components in `/ui`
- Centralized state management
- Modular architecture

### 3. **Maintainability**
- Clear naming conventions
- Consistent file organization
- Centralized configuration
- Comprehensive documentation

## 🚀 Adding New Features

### Adding a New Page
1. Create component in `/src/pages/[feature]/`
2. Add route in `App.jsx`
3. Update navigation in `Navbar.jsx` if needed
4. Add route constant in `constants/index.js`

### Adding a New Component
1. Create component in appropriate folder:
   - UI components: `/src/components/ui/`
   - Layout components: `/src/components/layout/`
   - Feature-specific: `/src/components/[feature]/`

### Adding a New API Endpoint
1. Add endpoint constant in `constants/index.js`
2. Use in components via the axios instance
3. Add to auth store if authentication-related

### Adding a New Hook
1. Create hook in `/src/hooks/`
2. Export from `/src/hooks/index.js`
3. Import where needed

## 📝 File Naming Conventions

### Components
- **PascalCase**: `MyComponent.jsx`
- **Descriptive names**: `UserProfileCard.jsx`
- **Feature prefixes**: `AuthLoginForm.jsx`

### Pages
- **PascalCase**: `Dashboard.jsx`
- **Nested by feature**: `auth/Login.jsx`

### Utilities & Hooks
- **camelCase**: `formatDate.js`
- **Descriptive names**: `useLocalStorage.js`

### Constants
- **UPPER_SNAKE_CASE**: `API_ENDPOINTS`
- **Grouped logically**: `AUTH.LOGIN`, `ROUTES.DASHBOARD`

## 🔧 Configuration Files

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# OAuth Providers
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

### Tailwind CSS
- Custom colors and spacing in `tailwind.config.js`
- Utility classes in `src/index.css`

### Vite
- Development server configuration
- Build optimization
- Plugin configuration

## 🛠 Future Feature Areas

Ready-to-expand directories:

### `/src/components/`
- Add feature-specific component folders
- UI component library expansion
- Form components
- Data visualization components

### `/src/pages/`
- User management pages
- Content management
- Analytics dashboards
- Settings pages

### `/src/store/`
- Feature-specific stores
- API caching stores
- UI state stores

### `/src/services/`
- External API integrations
- WebSocket connections
- File upload services

### `/src/types/` (when adding TypeScript)
- Type definitions
- Interface declarations
- API response types

## 📊 State Management Strategy

### Zustand Stores
- **Auth Store**: User authentication state
- **Future stores**: Feature-specific state
- **Persistence**: LocalStorage for non-sensitive data
- **Security**: Sensitive data in HttpOnly cookies

### Local State
- Component-specific state with `useState`
- Form state with React Hook Form
- UI state (modals, dropdowns)

## 🔒 Security Considerations

### Authentication
- HttpOnly cookies for session management
- JWT tokens handled by backend
- Role-based access control
- Secure route protection

### Data Protection
- Environment variables for secrets
- Input validation and sanitization
- XSS protection via React
- CSRF protection (backend responsibility)

## 📦 Dependency Strategy

### Core Dependencies
- **React**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Zustand**: State management
- **Axios**: HTTP client
- **React Hook Form**: Form handling
- **Tailwind CSS**: Utility-first styling

### Development Dependencies
- **TypeScript** (future): Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Testing Library**: Component testing

## 🎨 Styling Strategy

### Tailwind CSS
- Utility-first approach
- Custom design system in config
- Responsive design built-in
- Dark mode ready

### Component Styles
- Consistent spacing using Tailwind
- Custom utility classes in `index.css`
- Reusable component patterns
- Mobile-first design

This structure provides a solid foundation for scaling your application while maintaining clean, organized, and maintainable code.