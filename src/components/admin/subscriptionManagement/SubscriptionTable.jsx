// src/components/admin/SubscriptionManagement/SubscriptionTable.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import SubscriptionActionModal from './SubscriptionActionModal';

const SubscriptionTable = ({ subscriptions, loading, onAction }) => {
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    subscriptionId: null,
    action: '',
    subscription: null
  });

  const openActionModal = (subscription, action) => {
    setActionModal({
      isOpen: true,
      subscriptionId: subscription._id,
      action,
      subscription
    });
  };

  const closeActionModal = () => {
    setActionModal({
      isOpen: false,
      subscriptionId: null,
      action: '',
      subscription: null
    });
  };

  const handleActionSubmit = (data) => {
    onAction(actionModal.subscriptionId, actionModal.action, data);
    closeActionModal();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded shadow">
        <p className="text-gray-500">No subscriptions found matching your filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded shadow">
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((subscription) => (
              <tr key={subscription._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {subscription.user.name}
                  </div>
                  <div className="text-sm text-gray-500">{subscription.user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">{subscription.plan}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(subscription.startDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(subscription.expiryDate), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{subscription.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openActionModal(subscription, 'extend')}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Extend
                    </button>
                    <button
                      onClick={() => openActionModal(subscription, 'upgrade')}
                      className="text-green-600 hover:text-green-900"
                    >
                      Upgrade
                    </button>
                    {subscription.status === 'active' ? (
                      <button
                        onClick={() => openActionModal(subscription, 'cancel')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => openActionModal(subscription, 'reactivate')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {actionModal.isOpen && (
        <SubscriptionActionModal
          isOpen={actionModal.isOpen}
          onClose={closeActionModal}
          onSubmit={handleActionSubmit}
          action={actionModal.action}
          subscription={actionModal.subscription}
        />
      )}
    </>
  );
};

export default SubscriptionTable;