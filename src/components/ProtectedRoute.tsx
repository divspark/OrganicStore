import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGrowStore } from '../store/useGrowStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'producer' | 'consumer' | string>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = useGrowStore((state) => state.user);
  const isAuthenticated = useGrowStore((state) => state.isAuthenticated);
  const location = useLocation();

  // If user is not logged in, redirect to login page preserving the target route
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If roles are specified and user's role does not match
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to the user's appropriate dashboard or home
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user.role === 'producer') {
      return <Navigate to="/producer/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
