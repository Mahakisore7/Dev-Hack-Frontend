import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// AdminRoute - redirects to unauthorized if not admin
const AdminRoute = ({ children }) => {
  const { isAuthenticated, role } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    role: state.role,
  }));

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
