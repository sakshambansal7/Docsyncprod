// src/components/UserManagement/UserTable.jsx
import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Input, Select, Space, Tag, Modal, Form, 
  message, Tooltip, Popconfirm, Card, Row, Col, Badge 
} from 'antd';
import { 
  SearchOutlined, EditOutlined, DeleteOutlined, 
  UserAddOutlined, DownloadOutlined, FilterOutlined, 
  LockOutlined, UnlockOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import UserForm from './UserForm';
import { CSVLink } from 'react-csv';

const { Option } = Select;

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    examGoal: '',
    subscriptionStatus: '',
    missingDocs: false,
    inactive: false
  });
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('descend');
  const [editUser, setEditUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvLoading, setCsvLoading] = useState(false);

  // Initial data fetch
  useEffect(() => {
    fetchUsers();
  }, [pagination.current, pagination.pageSize, filters, sortField, sortOrder]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      // Build query parameters
      const params = new URLSearchParams({
        page: pagination.current,
        limit: pagination.pageSize,
        sort: sortField,
        order: sortOrder === 'ascend' ? 'asc' : 'desc',
        ...filters
      });
      
      const response = await axios.get(`/api/admin/users?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(response.data.users);
      setPagination({
        ...pagination,
        total: response.data.totalUsers
      });
      
    } catch (error) {
      message.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle table change (pagination, filters, sorting)
  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    
    if (sorter.field && sorter.order) {
      setSortField(sorter.field);
      setSortOrder(sorter.order);
    }
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, current: 1 })); // Reset to first page
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      search: '',
      examGoal: '',
      subscriptionStatus: '',
      missingDocs: false,
      inactive: false
    });
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setShowUserForm(true);
  };

  // Delete user
  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
      console.error(error);
    }
  };

  // Toggle user block status
  const toggleBlockStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(
        `/api/admin/users/${userId}/status`,
        { isBlocked: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      message.success(`User ${currentStatus ? 'unblocked' : 'blocked'} successfully`);
      fetchUsers();
    } catch (error) {
      message.error(`Failed to ${currentStatus ? 'unblock' : 'block'} user`);
      console.error(error);
    }
  };

  // Prepare CSV export data
  const prepareCSVExport = async () => {
    try {
      setCsvLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/admin/users/export/csv', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/csv'
        },
        responseType: 'blob'
      });
      
      // Convert blob to text
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',');
        
        const data = rows.slice(1).map(row => {
          const values = row.split(',');
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });
        
        setCsvData(data);
        // Trigger download
        document.getElementById('csvDownloadLink').click();
        setCsvLoading(false);
      };
      
      reader.readAsText(response.data);
    } catch (error) {
      message.error('Failed to export users');
      console.error(error);
      setCsvLoading(false);
    }
  };

  // Define table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      render: (text, record) => (
        <Space>
          {text}
          {record.isBlocked && <Tag color="red">BLOCKED</Tag>}
        </Space>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile'
    },
    {
      title: 'Exam Goal',
      dataIndex: 'examGoal',
      key: 'examGoal',
      render: text => text || 'N/A'
    },
    {
      title: 'Documents',
      key: 'documents',
      render: (_, record) => {
        const missingDocs = [];
        if (!record.tenResult) missingDocs.push('10th');
        if (!record.twelveResult) missingDocs.push('12th');
        if (!record.aadhaar) missingDocs.push('Aadhaar');
        if (!record.pan) missingDocs.push('PAN');
        
        return (
          <>
            {missingDocs.length > 0 ? (
              <Tooltip title={`Missing: ${missingDocs.join(', ')}`}>
                <Tag color="red">{missingDocs.length} Missing</Tag>
              </Tooltip>
            ) : (
              <Tag color="green">Complete</Tag>
            )}
          </>
        );
      }
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: text => new Date(text).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          />
          <Button 
            icon={record.isBlocked ? <UnlockOutlined /> : <LockOutlined />} 
            onClick={() => toggleBlockStatus(record._id, record.isBlocked)}
            size="small"
            type={record.isBlocked ? "primary" : "default"}
          />
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger 
              size="small"
            />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="user-management">
      <Card title="User Management">
        <Row gutter={16} className="filter-row" style={{ marginBottom: 16 }}>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search by name, email or mobile"
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: 16 }}>
            <Select
              placeholder="Filter by exam goal"
              style={{ width: '100%' }}
              value={filters.examGoal}
              onChange={value => handleFilterChange('examGoal', value)}
              allowClear
            >
              <Option value="UPSC">UPSC</Option>
              <Option value="SSC">SSC</Option>
              <Option value="Banking">Banking</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: 16 }}>
            <Select
              placeholder="Subscription status"
              style={{ width: '100%' }}
              value={filters.subscriptionStatus}
              onChange={value => handleFilterChange('subscriptionStatus', value)}
              allowClear
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={{ marginBottom: 16 }}>
            <Space>
              <Button
                type={filters.missingDocs ? "primary" : "default"}
                onClick={() => handleFilterChange('missingDocs', !filters.missingDocs)}
                icon={<FilterOutlined />}
              >
                Missing Docs
              </Button>
              <Button
                type={filters.inactive ? "primary" : "default"}
                onClick={() => handleFilterChange('inactive', !filters.inactive)}
                icon={<FilterOutlined />}
              >
                Inactive
              </Button>
            </Space>
          </Col>
        </Row>

        <Row style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Space>
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => {
                  setEditUser(null);
                  setShowUserForm(true);
                }}
              >
                Add User
              </Button>
              <Button
                icon={<DownloadOutlined />}
                onClick={prepareCSVExport}
                loading={csvLoading}
              >
                Export CSV
              </Button>
              {Object.values(filters).some(x => x !== '' && x !== false) && (
                <Button onClick={resetFilters}>Reset Filters</Button>
              )}
              
              {/* Hidden CSV download link */}
              <CSVLink
                id="csvDownloadLink"
                data={csvData}
                filename="users.csv"
                className="hidden"
              />
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      </Card>

      {/* User Form Modal */}
      <Modal
        title={editUser ? "Edit User" : "Add New User"}
        visible={showUserForm}
        onCancel={() => setShowUserForm(false)}
        footer={null}
        width={800}
      >
        <UserForm
          user={editUser}
          onSuccess={() => {
            setShowUserForm(false);
            fetchUsers();
          }}
        />
      </Modal>
    </div>
  );
};

export default UserTable;