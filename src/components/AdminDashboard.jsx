
import React, { useState,useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserAnalyticsDashboard from './admin/UserAnalytics/UserAnalyticsDashboard';
import SubscriptionDashboard from './admin/SubscriptionManagement/SubscriptionDashboard';
import DocumentManagementDashboard from './admin/DocumentManagement/DocumentDashboard';
// DocumentDashboard Component (since DocumentTable was provided)


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token (adjust based on your auth system)
    localStorage.removeItem('authToken');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return(
<div className="relative flex min-h-screen bg-gray-100">
{/* Sidebar */}
  <div
    className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
  >
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
    </div>
    <nav className="mt-4">
      <Link
        to="/admin/users"
        className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition"
        onClick={() => setSidebarOpen(false)}
      >
        User Analytics
      </Link>
      <Link
        to="/admin/subscriptions"
        className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition"
        onClick={() => setSidebarOpen(false)}
      >
        Subscription Management
      </Link>
      <Link
        to="/admin/documents"
        className="block py-2 px-4 text-gray-700 hover:bg-blue-500 hover:text-white transition"
        onClick={() => setSidebarOpen(false)}
      >
        Document Management
      </Link>
    </nav>
  </div>

  {/* Main Content */}
  <div
    className={`flex-1 flex flex-col transition-all duration-300 ${
      sidebarOpen ? 'ml-64' : 'ml-0'
    }`}
  >
    {/* Header */}
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        {!sidebarOpen && (
  <button
    onClick={() => setSidebarOpen(true)}
    className="absolute top-4 left-4 z-50 bg-white p-2 rounded shadow-md md:hidden"
  >
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>
)}


        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </header>

    {/* Content Area */}
    <main className="flex-1 p-6">
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Welcome to the Admin Dashboard</h2>
              <p className="text-gray-600">
                Use the sidebar to navigate to User Analytics, Subscription Management, or Document Management.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800">User Analytics</h3>
                  <p className="text-sm text-blue-600">View user statistics and activity.</p>
                  <Link
                    to="/admin/users"
                    className="mt-2 inline-block text-blue-500 hover:underline"
                  >
                    Go to User Analytics
                  </Link>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800">Subscription Management</h3>
                  <p className="text-sm text-green-600">Manage user subscriptions and analytics.</p>
                  <Link
                    to="/admin/subscriptions"
                    className="mt-2 inline-block text-green-500 hover:underline"
                  >
                    Go to Subscriptions
                  </Link>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800">Document Management</h3>
                  <p className="text-sm text-yellow-600">Review and manage user documents.</p>
                  <Link
                    to="/admin/documents"
                    className="mt-2 inline-block text-yellow-500 hover:underline"
                  >
                    Go to Documents
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/users" element={<UserAnalyticsDashboard />} />
        <Route path="/subscriptions" element={<SubscriptionDashboard />} />
        <Route path="/documents" element={<DocumentManagementDashboard />} />
      </Routes>
    </main>
  </div>
</div>
  );
};

export default AdminDashboard;
