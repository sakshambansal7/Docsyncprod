// src/components/admin/DocumentManagement/DocumentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DocumentTable from './DocumentTable';

const DocumentDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Uncomment and adjust for actual API call when ready
      // const response = await axios.get('/api/admin/documents/users');
      // setUsers(response.data);

      // Mock data
      setUsers([
        {
          _id: '1',
          username: 'John Doe',
          email: 'john@example.com',
          mobile: '1234567890',
          docStatus: { percentage: 75 },
          documentVerificationStatus: {
            tenResult: 'approved',
            twelveResult: 'pending',
            aadhaar: 'rejected',
            pan: 'not_uploaded',
          },
        },
        {
          _id: '2',
          username: 'Jane Smith',
          email: 'jane@example.com',
          mobile: '9876543210',
          docStatus: { percentage: 90 },
          documentVerificationStatus: {
            tenResult: 'approved',
            twelveResult: 'approved',
            aadhaar: 'approved',
            pan: 'pending',
          },
        },
      ]);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    console.log(`View details for user ${userId}`);
    // Implement navigation or modal opening as needed
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Document Management</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <DocumentTable users={users} onUserClick={handleUserClick} />
      )}
    </div>
  );
};

export default DocumentDashboard;