import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to the user's appropriate home portal
    const fallbackPath = {
      STUDENT: '/student/dashboard',
      FACULTY: '/faculty/dashboard',
      WARDEN: '/warden/dashboard',
      SECURITY: '/security/dashboard',
      ACCOUNTS: '/accounts/dashboard',
      TRANSPORT: '/transport/dashboard',
      ADMIN: '/admin/dashboard'
    }[role] || '/login';

    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
