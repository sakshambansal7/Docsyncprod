


// src/components/admin/UserAnalytics/UserAnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Temporary placeholder components until you create the actual files
const UserStatCards = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">Total Users</h3>
      <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">Active Users</h3>
      <p className="text-2xl font-bold">{stats?.activeUsers || 0}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">New Users (30d)</h3>
      <p className="text-2xl font-bold">{stats?.newUsers || 0}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">Retention Rate</h3>
      <p className="text-2xl font-bold">{stats?.retentionRate || 0}%</p>
    </div>
  </div>
);

const UserCharts = ({ userGrowth, usersByExamGoal, activityByDay }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">User Growth</h3>
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500">Chart placeholder - User Growth</p>
      </div>
    </div>
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Users by Exam Goal</h3>
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500">Chart placeholder - Users by Exam Goal</p>
      </div>
    </div>
  </div>
);

const UserActivityTable = ({ recentActivity }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-medium mb-4">Recent User Activity</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {(recentActivity || []).map((activity, index) => (
            <tr key={index}>
              <td className="px-6 py-4">{activity?.user || 'Unknown'}</td>
              <td className="px-6 py-4">{activity?.action || 'No action'}</td>
              <td className="px-6 py-4">{activity?.timestamp || 'Unknown time'}</td>
            </tr>
          ))}
          {(!recentActivity || recentActivity.length === 0) && (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No recent activity</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const UserAnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    stats: {
      totalUsers: 1250,
      activeUsers: 842,
      newUsers: 128,
      retentionRate: 76
    },
    userGrowth: [],
    usersByExamGoal: [],
    activityByDay: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('30days');
  
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      // Comment out actual API call for now
      // const response = await axios.get(`/api/admin/analytics/users?timeRange=${timeRange}`);
      // setAnalytics(response.data);
      
      // Use mock data instead
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error('Failed to fetch user analytics');
      console.error('Error fetching user analytics:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);
  
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };
  
  if (loading && !analytics) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Analytics</h1>
        <div>
          <select
            value={timeRange}
            onChange={handleTimeRangeChange}
            className="p-2 border rounded"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      
      {analytics && (
        <>
          <UserStatCards stats={analytics.stats} />
          <UserCharts 
            userGrowth={analytics.userGrowth}
            usersByExamGoal={analytics.usersByExamGoal}
            activityByDay={analytics.activityByDay}
          />
          <UserActivityTable recentActivity={analytics.recentActivity} />
        </>
      )}
    </div>
  );
};

export default UserAnalyticsDashboard;