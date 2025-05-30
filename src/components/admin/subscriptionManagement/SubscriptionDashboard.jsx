// src/components/admin/SubscriptionManagement/SubscriptionDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubscriptionFilters from './SubscriptionFilters';
import SubscriptionTable from './SubscriptionTable';
import SubscriptionAnalytics from './SubscriptionAnalytics';

const SubscriptionDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    plan: '',
    expiryRange: '',
    sort: 'createdAt',
    order: 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalSubscriptions: 0
  });

  const fetchSubscriptions = async (page = 1) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page,
        limit: 10,
        status: filters.status,
        plan: filters.plan,
        expiryRange: filters.expiryRange,
        sort: filters.sort,
        order: filters.order
      });

      const response = await axios.get(`/api/admin/subscriptions?${queryParams}`);
      
      setSubscriptions(response.data.subscriptions);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalSubscriptions: response.data.totalSubscriptions
      });
    } catch (error) {
      toast.error('Failed to fetch subscriptions');
      console.error('Error fetching subscriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/admin/subscriptions/analytics/summary');
      setAnalytics(response.data);
    } catch (error) {
      toast.error('Failed to fetch subscription analytics');
      console.error('Error fetching subscription analytics:', error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
    fetchAnalytics();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    fetchSubscriptions(newPage);
  };

// Continuing from where we left off:
const handleSubscriptionAction = async (subscriptionId, action, data = {}) => {
    try {
      let response;
      switch (action) {
        case 'extend':
          response = await axios.post(`/api/admin/subscriptions/${subscriptionId}/extend`, data);
          toast.success('Subscription extended successfully');
          break;
        case 'upgrade':
          response = await axios.post(`/api/admin/subscriptions/${subscriptionId}/upgrade`, data);
          toast.success('Subscription upgraded successfully');
          break;
        case 'cancel':
          response = await axios.post(`/api/admin/subscriptions/${subscriptionId}/cancel`);
          toast.success('Subscription cancelled successfully');
          break;
        case 'reactivate':
          response = await axios.post(`/api/admin/subscriptions/${subscriptionId}/reactivate`);
          toast.success('Subscription reactivated successfully');
          break;
        default:
          throw new Error('Invalid action');
      }
      
      // Refresh the subscriptions data
      fetchSubscriptions(pagination.currentPage);
      fetchAnalytics();
    } catch (error) {
      toast.error(`Failed to ${action} subscription: ${error.response?.data?.message || error.message}`);
      console.error(`Error during ${action} subscription:`, error);
    }
  };
  
  const exportSubscriptionsData = async () => {
    try {
      // Apply current filters to export
      const queryParams = new URLSearchParams({
        status: filters.status,
        plan: filters.plan,
        expiryRange: filters.expiryRange
      });
      
      const response = await axios.get(`/api/admin/subscriptions/export?${queryParams}`, {
        responseType: 'blob'
      });
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `subscriptions-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success('Subscriptions data exported successfully');
    } catch (error) {
      toast.error('Failed to export subscriptions data');
      console.error('Error exporting subscriptions:', error);
    }
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Management</h1>
        <button 
          onClick={exportSubscriptionsData}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export Data
        </button>
      </div>
      
      {analytics && <SubscriptionAnalytics analytics={analytics} />}
      
      <SubscriptionFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      
      <SubscriptionTable 
        subscriptions={subscriptions}
        loading={loading}
        onAction={handleSubscriptionAction}
      />
      
      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="flex items-center">
          <button 
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-3 py-1 rounded-l border disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-1 border-t border-b">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-3 py-1 rounded-r border disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
  };
  
  export default SubscriptionDashboard;