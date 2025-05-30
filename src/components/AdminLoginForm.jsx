import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Login request started with:", { email, password: '***' });

      const response = await axios.post('http://localhost:3000/api/auth/admin/login', {
        email: email.toLowerCase(),
        password,
      });
      console.log("Full response:", response);

      if (!response.data.token) {
        console.error("No token received in response");
        setError('Authentication failed. No token received.');
        return;
      }

      const token = response.data.token;
      const role = response.data.admin?.role || 'admin';

      console.log("Token:", token);
      console.log("Role:", role);

      // Save token and role to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      alert('Login successful');

      if (role === 'admin') {
        console.log("Redirecting to admin dashboard");
        navigate('/admin-dashboard');
        console.log("Navigation function called");
      } else {
        console.log("Not an admin role:", role);
        setError('Unauthorized access. This page is for admin users only.');
      }
      setTimeout(() => {
        console.log("This runs 500ms after navigate call");
        window.location.href = '/admin-dashboard'; // Fallback redirect
      }, 500);

      
    } catch (error) {
      console.error('Login error:', error);
      
      // Use both msg and message for backward compatibility
      setError(error.response?.data?.msg || error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>

        <div className="mb-4">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
