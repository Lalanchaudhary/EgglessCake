import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// MyOrders Component
const MyOrders = () => {
  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      date: '2024-03-15',
      status: 'Delivered',
      total: 299.99,
      items: [
        { name: 'Product 1', quantity: 2, price: 99.99 },
        { name: 'Product 2', quantity: 1, price: 100.01 },
      ],
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      date: '2024-03-10',
      status: 'Processing',
      total: 149.99,
      items: [
        { name: 'Product 3', quantity: 1, price: 149.99 },
      ],
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order #{order.orderNumber}</h3>
                <p className="text-sm text-gray-500">Placed on {order.date}</p>
              </div>
              <div className="mt-2 sm:mt-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between font-semibold">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MyWallet Component
const MyWallet = () => {
  const walletData = {
    balance: 1250.75,
    transactions: [
      { id: 1, type: 'Credit', amount: 500, date: '2024-03-15', description: 'Added to wallet' },
      { id: 2, type: 'Debit', amount: -299.99, date: '2024-03-10', description: 'Order #ORD-2024-002' },
      { id: 3, type: 'Credit', amount: 1000, date: '2024-03-01', description: 'Added to wallet' },
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wallet</h2>
      
      {/* Balance Card */}
      <div className="bg-gradient-to-r from-[#e098b0] to-[#d88aa2] rounded-lg p-6 text-white mb-6">
        <h3 className="text-lg font-medium mb-2">Available Balance</h3>
        <p className="text-3xl font-bold">${walletData.balance.toFixed(2)}</p>
      </div>

      {/* Add Money Button */}
      <button className="w-full mb-6 px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
        Add Money
      </button>

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
        <div className="space-y-4">
          {walletData.transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span className={`font-semibold ${
                transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'Credit' ? '+' : ''}{transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// AddressBook Component
const AddressBook = () => {
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main St, Apartment 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      phone: '+1 234-567-8900',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Ave, Suite 100',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      phone: '+1 234-567-8901',
      isDefault: false,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Address Book</h2>
        <button className="px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Add New Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{address.type}</h3>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{address.name}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-[#e098b0]">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
            <div className="text-gray-600">
              <p>{address.address}</p>
              <p>{address.city}, {address.state} {address.zip}</p>
              <p>{address.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ManageSavedUPI Component
const ManageSavedUPI = () => {
  const upiAccounts = [
    {
      id: 1,
      name: 'Personal UPI',
      upiId: 'john.doe@upi',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Business UPI',
      upiId: 'business@upi',
      isDefault: false,
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Saved UPI</h2>
        <button className="px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Add New UPI
        </button>
      </div>

      <div className="space-y-4">
        {upiAccounts.map((account) => (
          <div key={account.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                  {account.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600">{account.upiId}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-gray-600 hover:text-[#e098b0]">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// MyAccount Component
const MyAccount = () => {
  const accountInfo = {
    membershipLevel: 'Gold',
    memberSince: '2023-01-15',
    points: 2500,
    benefits: [
      'Free shipping on all orders',
      'Priority customer support',
      'Exclusive member discounts',
      'Early access to sales',
    ],
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Account</h2>

      {/* Membership Card */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-6 text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium mb-2">{accountInfo.membershipLevel} Member</h3>
            <p className="text-sm">Member since {accountInfo.memberSince}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{accountInfo.points}</p>
            <p className="text-sm">Points</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Benefits</h3>
        <ul className="space-y-2">
          {accountInfo.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center space-x-2">
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Account Actions */}
      <div className="space-y-4">
        <button className="w-full px-4 py-2 border border-[#e098b0] text-[#e098b0] rounded-md hover:bg-[#e098b0] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          View Transaction History
        </button>
        <button className="w-full px-4 py-2 border border-[#e098b0] text-[#e098b0] rounded-md hover:bg-[#e098b0] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Download Account Statement
        </button>
      </div>
    </div>
  );
};

// AccountSettings Component
const AccountSettings = () => {
  const settings = [
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your notification preferences',
      options: [
        { id: 'email', label: 'Email Notifications', checked: true },
        { id: 'sms', label: 'SMS Notifications', checked: false },
        { id: 'push', label: 'Push Notifications', checked: true },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Control your privacy preferences',
      options: [
        { id: 'profile', label: 'Public Profile', checked: true },
        { id: 'activity', label: 'Show Activity Status', checked: true },
        { id: 'data', label: 'Data Collection', checked: false },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Manage your account security',
      options: [
        { id: '2fa', label: 'Two-Factor Authentication', checked: false },
        { id: 'login', label: 'Login Notifications', checked: true },
        { id: 'password', label: 'Change Password', checked: false },
      ],
    },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

      <div className="space-y-6">
        {settings.map((section) => (
          <div key={section.id} className="border rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
            <div className="space-y-3">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={option.checked}
                      className="rounded border-gray-300 text-[#e098b0] focus:ring-[#e098b0]"
                    />
                    <span className="text-gray-700">{option.label}</span>
                  </label>
                  {option.id === 'password' && (
                    <button className="text-[#e098b0] hover:text-[#d88aa2]">
                      Change
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Cancel
        </button>
        <button className="px-4 py-2 bg-[#e098b0] text-white rounded-md hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
          Save Changes
        </button>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeComponent, setActiveComponent] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
  });

  const menuItems = [
    { id: 1, title: 'My Orders', icon: '📦', component: 'orders' },
    { id: 2, title: 'My Wallet', icon: '💰', component: 'wallet' },
    { id: 3, title: 'Address Book', icon: '📚', component: 'address' },
    { id: 4, title: 'Manage Saved UPI', icon: '💳', component: 'upi' },
    { id: 5, title: 'My Profile', icon: '👤', component: 'profile' },
    { id: 6, title: 'My Account', icon: '🔑', component: 'account' },
    { id: 7, title: 'Account Settings', icon: '⚙️', component: 'settings' },
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate('/profile');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'orders':
        return <MyOrders />;
      case 'wallet':
        return <MyWallet />;
      case 'address':
        return <AddressBook />;
      case 'upi':
        return <ManageSavedUPI />;
      case 'account':
        return <MyAccount />;
      case 'settings':
        return <AccountSettings />;
      case 'profile':
      default:
        return (
          <div className="bg-white shadow rounded-lg">
            {/* Profile Header */}
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h3 className="text-2xl font-bold leading-6 text-gray-900">Profile</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and preferences</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e098b0] hover:bg-[#d88aa2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]"
                    >
                      Save Changes
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  {isEditing && (
                    <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e098b0]">
                      Change Photo
                    </button>
                  )}
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    {isEditing ? (
                      <textarea
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#e098b0] focus:border-[#e098b0] sm:text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-sm text-gray-900">{userData.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Account</h2>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveComponent(item.component)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-[#e098b0] hover:text-white rounded-md transition-colors duration-200 ${
                        activeComponent === item.component ? 'bg-[#e098b0] text-white' : ''
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 