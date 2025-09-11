import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but role does not match, redirect to their dashboard
  if (allowedRole && userRole && allowedRole !== userRole) {
    if (userRole === 'landlord') return <Navigate to="/landlord-dashboard" replace />;
    if (userRole === 'tenant') return <Navigate to="/tenant-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
