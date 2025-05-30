// src/components/admin/SubscriptionManagement/SubscriptionActionModal.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';

const SubscriptionActionModal = ({ isOpen, onClose, onSubmit, action, subscription }) => {
  const [formData, setFormData] = useState({
    months: 1,
    plan: subscription?.plan || 'basic',
    reason: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  const renderModalContent = () => {
    switch (action) {
      case 'extend':
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Extend Subscription</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extension Period (months)
              </label>
              <input
                type="number"
                name="months"
                value={formData.months}
                onChange={handleChange}
                min="1"
                max="36"
                className="w-full p-2 border rounded"
              />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Current expiry date: {format(new Date(subscription.expiryDate), 'MMM dd, yyyy')}
            </p>
          </>
        );
      case 'upgrade':
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upgrade Subscription</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Plan
              </label>
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Current plan: <span className="capitalize">{subscription.plan}</span>
            </p>
          </>
        );
      case 'cancel':
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Subscription</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Cancellation
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded"
                placeholder="Please provide a reason for cancellation"
              />
            </div>
            <p className="text-sm text-red-500 mb-4">
              This will cancel the subscription immediately. The user will lose access to premium features.
            </p>
          </>
        );
      case 'reactivate':
        return (
          <>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Reactivate Subscription</h3>
            <p className="text-sm text-gray-500 mb-4">
              This will reactivate the subscription with the original expiry date if it's in the future.
              Otherwise, you'll need to extend it after reactivation.
            </p>
          </>
        );
      default:
        return <p>Invalid action</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <form onSubmit={handleSubmit}>
          {renderModalContent()}
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionActionModal;