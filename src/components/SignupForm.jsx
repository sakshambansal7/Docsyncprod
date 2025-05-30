// src/components/SignupForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // ✅ Handle Manual Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/signup', {
        username,
        email: email.toLowerCase(), 
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      navigate('/user-dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Signup</h2>

          <form onSubmit={handleSignup}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter full name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
              <span
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                required
              />
              <span
                className="absolute right-3 top-2/3 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '🙈'}
              </span>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md">
              Signup
            </button>
          </form>

          {/* ✅ Google Signup Button */}
          <div className="flex justify-center mt-4">
            <GoogleLogin
              onSuccess={async (response) => {
                console.log('✅ Google Token:', response.credential);

                if (!response.credential) {
                  console.error('❌ No Google Token Received');
                  setError('Google authentication failed. Please try again.');
                  return;
                }

                try {
                  const res = await axios.post(
                    'http://localhost:3000/api/auth/google/signup',
                    { token: response.credential },
                    { headers: { 'Content-Type': 'application/json' } }
                  );

                  const { token, role } = res.data;
                  localStorage.setItem('authToken', token);
                  localStorage.setItem('userRole', role);

                  navigate('/user-dashboard');
                } catch (err) {
                  console.error('❌ Google Signup Error:', err);
                  setError('Google signup failed. Please try again.');
                }
              }}
              onError={() => {
                console.error('❌ Google login failed');
                setError('Google login failed. Please try again.');
              }}
            />
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <span onClick={() => navigate('/login')} className="text-blue-600 cursor-pointer hover:underline">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignupForm;
''