// src/components/admin/SubscriptionManagement/SubscriptionFilters.jsx
import React from 'react';

const SubscriptionFilters = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Subscriptions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
          <select
            name="plan"
            value={filters.plan}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Plans</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
          <select
            name="expiryRange"
            value={filters.expiryRange}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="7days">Expiring in 7 days</option>
            <option value="30days">Expiring in 30 days</option>
            <option value="expired">Already Expired</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="createdAt">Created Date</option>
            <option value="expiryDate">Expiry Date</option>
            <option value="price">Price</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <select
            name="order"
            value={filters.order}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionFilters;