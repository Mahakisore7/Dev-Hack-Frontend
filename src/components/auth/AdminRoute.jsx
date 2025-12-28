import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, role, isLoading } = useAuthStore();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If authenticated but not admin, redirect to unauthorized
  if (role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;