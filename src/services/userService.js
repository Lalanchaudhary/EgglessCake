import axios from 'axios';

const API_URL ='http://localhost:9000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth services
export const checkPhoneNumber = async (phoneNumber) => {
  const response = await api.post('/users/check-phone', { phoneNumber });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const loginWithPhone = async (phoneNumber) => {
  const response = await api.post('/users/login/phone', { phoneNumber });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Profile services
export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (profileData) => {
  console.log(profileData);
  
  const response = await api.patch('/users/profile', profileData);
  // Update local storage if user data is returned
  if (response.data.user) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

// Address services
export const addAddress = async (addressData) => {
  const response = await api.post('/users/addresses', addressData);
  return response.data;
};

export const updateAddress = async (addressId, addressData) => {
  const response = await api.patch(`/users/addresses/${addressId}`, addressData);
  return response.data;
};

export const deleteAddress = async (addressId) => {
  const response = await api.delete(`/users/addresses/${addressId}`);
  return response.data;
};

// UPI services
export const addUPI = async (upiData) => {
  const response = await api.post('/users/upi', upiData);
  return response.data;
};

export const updateUPI = async (upiId, upiData) => {
  const response = await api.patch(`/users/upi/${upiId}`, upiData);
  return response.data;
};

export const deleteUPI = async (upiId) => {
  const response = await api.delete(`/users/upi/${upiId}`);
  return response.data;
};

// Wallet services
export const addMoney = async (amount) => {
  const response = await api.post('/users/wallet/add-money', { amount });
  return response.data;
};

export const getWalletTransactions = async () => {
  const response = await api.get('/users/wallet/transactions');
  return response.data;
};

// Settings services
export const updateSettings = async (settingsData) => {
  const response = await api.patch('/users/settings', settingsData);
  return response.data;
};

// Orders services
export const getOrders = async () => {
  const response = await api.get('/users/orders');
  return response.data;
};

// Membership services
export const getMembership = async () => {
  const response = await api.get('/users/membership');
  return response.data;
}; 