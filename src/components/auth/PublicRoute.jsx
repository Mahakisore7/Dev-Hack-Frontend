import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore();
  const location = useLocation();

  // If user is already authenticated, redirect to appropriate dashboard
  if (isAuthenticated) {
    const redirectTo = role === 'admin' ? '/admin' : '/user';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;