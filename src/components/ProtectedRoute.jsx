import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, type }) => {
  const token = localStorage.getItem('authToken'); // Fetch the token from localStorage
  const userRole = localStorage.getItem('userRole'); // Fetch the user role

  // If no token or role mismatch
  if (!token || (type === 'admin' && userRole !== 'admin') || (type === 'user' && userRole !== 'user')) {
    console.log("Redirecting due to authentication failure");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
