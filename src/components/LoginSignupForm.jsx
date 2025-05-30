// frontend/src/components/LoginSignupForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LoginSignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/user/login', {
        email,
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      console.log('Login successful');
      navigate('/user-dashboard'); // Redirect after login
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          {/* ✅ Email/Password Login Form */}
          <form onSubmit={handleLogin}>
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

            {/* ✅ Password Field with Show/Hide Toggle */}
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
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12C3 7 7 3 12 3s9 4 11 9c-2 5-6 9-11 9S3 17 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12C3 7 7 3 12 3s9 4 11 9c-2 5-6 9-11 9S3 17 1 12z" />
                    <line x1="4" y1="4" x2="20" y2="20" />
                  </svg>
                )}
              </span>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md">
              Login
            </button>
          </form>

          {/* ✅ OR Separator */}
          <p className="text-center text-gray-500 my-4">or</p>

          {/* ✅ Google Login Button */}
          <GoogleLogin
            onSuccess={async (response) => {
              console.log("✅ Google Token:", response.credential); // Should be a long JWT string

              try {
                const res = await axios.post('http://localhost:3000/api/auth/google/login', {
                  token: response.credential, // ✅ Send Google ID Token
                });

                const { token, role } = res.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('userRole', role);

                console.log('Google login successful');
                navigate('/user-dashboard'); // Redirect all users to dashboard
              } catch (err) {
                console.error("❌ Google login error:", err);
                setError("Google login failed. Please try again.");
              }
            }}
            onError={() => {
              setError("Google login failed. Please try again.");
            }}
          />

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{' '}
              <span onClick={() => navigate('/signup')} className="text-blue-600 cursor-pointer hover:underline">
                Signup
              </span>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginSignupForm;
