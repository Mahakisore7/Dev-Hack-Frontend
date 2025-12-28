import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// PublicRoute - redirects to home if already authenticated
const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
