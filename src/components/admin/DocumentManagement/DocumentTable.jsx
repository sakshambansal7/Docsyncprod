// src/components/admin/DocumentManagement/DocumentTable.jsx
import React from 'react';

const DocumentTable = ({ users, onUserClick }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Rejected</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">Not Uploaded</span>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">User</th>
            <th className="py-3 px-6 text-center">Completion</th>
            <th className="py-3 px-6 text-center">10th Result</th>
            <th className="py-3 px-6 text-center">12th Result</th>
            <th className="py-3 px-6 text-center">Aadhaar</th>
            <th className="py-3 px-6 text-center">PAN</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-6 text-center text-gray-500">
                No users found matching the current filters
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr 
                key={user._id} 
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => onUserClick(user._id)}
              >
                <td className="py-3 px-6 text-left">
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {user.mobile && <p className="text-xs text-gray-500">{user.mobile}</p>}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          user.docStatus.percentage > 70 
                            ? 'bg-green-500' 
                            : user.docStatus.percentage > 30 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        }`}
                        style={{ width: `${user.docStatus.percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-medium">{user.docStatus.percentage}%</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  {getStatusBadge(user.documentVerificationStatus?.tenResult)}
                </td>
                <td className="py-3 px-6 text-center">
                  {getStatusBadge(user.documentVerificationStatus?.twelveResult)}
                </td>
                <td className="py-3 px-6 text-center">
                  {getStatusBadge(user.documentVerificationStatus?.aadhaar)}
                </td>
                <td className="py-3 px-6 text-center">
                  {getStatusBadge(user.documentVerificationStatus?.pan)}
                </td>
                <td className="py-3 px-6 text-center">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUserClick(user._id);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;