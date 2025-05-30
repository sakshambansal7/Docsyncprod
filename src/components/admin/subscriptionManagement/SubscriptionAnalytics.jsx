// src/components/admin/SubscriptionManagement/SubscriptionAnalytics.jsx
import React from 'react';
import { Bar, Line } from 'recharts';
import { 
  LineChart, 
  BarChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const SubscriptionAnalytics = ({ analytics }) => {
  const { 
    summary, 
    revenueByMonth, 
    subscriptionsByPlan, 
    upcomingRenewals
  } = analytics;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Subscription Analytics</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.totalRevenue)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Active Subscriptions</p>
          <p className="text-2xl font-bold text-gray-800">{summary.activeSubscriptions}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Avg. Subscription Value</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(summary.avgSubscriptionValue)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Renewals This Month</p>
          <p className="text-2xl font-bold text-gray-800">{summary.renewalsThisMonth}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  activeDot={{ r: 8 }} 
                  name="Revenue" 
                />
                <Line 
                  type="monotone" 
                  dataKey="newSubscriptions" 
                  stroke="#10B981" 
                  name="New Subscriptions" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscriptions by Plan Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium mb-4">Subscriptions by Plan</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionsByPlan}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plan" />
                <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="count" 
                  fill="#3B82F6" 
                  name="Number of Subscriptions" 
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="revenue" 
                  fill="#10B981" 
                  name="Revenue" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Upcoming Renewals */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium mb-4">Upcoming Renewals (Next 7 Days)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingRenewals.length > 0 ? (
                upcomingRenewals.map((renewal) => (
                  <tr key={renewal._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{renewal.userName}</div>
                      <div className="text-sm text-gray-500">{renewal.userEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{renewal.plan}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(renewal.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(renewal.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center" colSpan="4">
                    No upcoming renewals in the next 7 days
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAnalytics;