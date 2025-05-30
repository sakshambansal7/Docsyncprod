import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import User from '../components/User';
import AdminLoginForm from '../components/AdminLoginForm';
import AdminDashboard from '../components/AdminDashboard';
import LoginSignupForm from '../components/LoginSignupForm';
import SignupForm from '../components/SignupForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginSignupForm />} />
      <Route path="/admin-login" element={<AdminLoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/user-dashboard" element={<User />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      
    </Routes>
  );
};

export default Routing;
