
//   src/components/admin/UserAnalytics/UserStatCards.jsx


import React from 'react';

const UserStatCards = ({ stats }) => {
  const { 
    totalUsers, 
    activeUsers, 
    inactiveUsers, 
    incompleteProfiles, 
    verifiedUsers, 
    unverifiedUsers, 
    userGrowthRate 
  } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Total Users</p>
        <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
        <p className="text-xs text-green-600">+{userGrowthRate}% from last month</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Active Users</p>
        <p className="text-2xl font-bold text-gray-800">{activeUsers}</p>
        <p className="text-xs text-blue-600">{((activeUsers / totalUsers) * 100).toFixed(1)}% of total</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Inactive Users</p>
        <p className="text-2xl font-bold text-gray-800">{inactiveUsers}</p>
        <p className="text-xs text-gray-600">{((inactiveUsers / totalUsers) * 100).toFixed(1)}% of total</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Incomplete Profiles</p>
        <p className="text-2xl font-bold text-gray-800">{incompleteProfiles}</p>
        <p className="text-xs text-orange-600">{((incompleteProfiles / totalUsers) * 100).toFixed(1)}% of total</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Verified Users</p>
        <p className="text-2xl font-bold text-gray-800">{verifiedUsers}</p>
        <p className="text-xs text-green-600">{((verifiedUsers / totalUsers) * 100).toFixed(1)}% of total</p>
      </div>
      
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Unverified Users</p>
        <p className="text-2xl font-bold text-gray-800">{unverifiedUsers}</p>
        <p className="text-xs text-red-600">{((unverifiedUsers / totalUsers) * 100).toFixed(1)}% of total</p>
      </div>
    </div>
  );
};

export default UserStatCards;