import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
  });

  const menuItems = [
    { id: 1, title: 'My Orders', icon: '📦' },
    { id: 2, title: 'My Wallet', icon: '💰' },
    { id: 3, title: 'Address Book', icon: '📚' },
    { id: 4, title: 'Manage Saved UPI', icon: '💳' },
    { id: 5, title: 'My Profile', icon: '👤' },
    { id: 6, title: 'My Account', icon: '🔑' },
    { id: 7, title: 'Account Settings', icon: '⚙️' },
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
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-[#e098b0] hover:text-white rounded-md transition-colors duration-200"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 