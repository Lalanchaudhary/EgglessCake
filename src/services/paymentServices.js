import axios from 'axios';

const API_URL = 'http://localhost:9000';

// Initialize Razorpay
const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create Razorpay Order
const createRazorpayOrder = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/payment/create-order`, {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to create order');
  }
};

// Verify Razorpay Payment
const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/payment/verify-order`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Payment verification failed');
  }
};

// Handle Razorpay Payment
const handleRazorpayPayment = async (orderData, userData) => {
  try {
    const res = await initializeRazorpay();
    if (!res) {
      throw new Error('Razorpay SDK failed to load');
    }

    const order = await createRazorpayOrder(orderData.amount);

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'EggLessCake',
      description: 'Payment for your order',
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyData = await verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyData.success) {
            return { success: true, orderId: order.id };
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (err) {
          throw new Error('Payment verification failed');
        }
      },
      prefill: {
        name: userData.name,
        email: userData.email,
        contact: userData.phone,
      },
      theme: {
        color: '#272361',
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        emi: true,
      },
      modal: {
        escape: false,
        backdropclose: false,
      }
    };

    return new Promise((resolve, reject) => {
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        reject(new Error('Payment failed'));
      });
      paymentObject.on('payment.success', function (response) {
        resolve({ success: true, orderId: order.id });
      });
      paymentObject.open();
    });
  } catch (error) {
    throw error;
  }
};

// Handle COD Payment
const handleCODPayment = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/payment/cod`, {
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      userId: orderData.userId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to place COD order');
  }
};

// Handle Wallet Payment
const handleWalletPayment = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/payment/wallet`, {
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      userId: orderData.userId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to process wallet payment');
  }
};

// Get Payment Methods
const getPaymentMethods = () => {
  return [
    {
      id: 'razorpay',
      name: 'Razorpay',
      description: 'Pay with Cards, UPI, Netbanking',
      icon: 'https://razorpay.com/assets/razorpay-logo-white.svg',
      available: true
    },
    {
      id: 'cod',
      name: 'Cash on Delivery',
      description: 'Pay when you receive',
      icon: '/icons/cod.svg',
      available: true
    },
    {
      id: 'wallet',
      name: 'Wallet Balance',
      description: 'Pay using your wallet balance',
      icon: '/icons/wallet.svg',
      available: true
    }
  ];
};

// Get Payment Status
const getPaymentStatus = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/payment/status/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to get payment status');
  }
};

export {
  initializeRazorpay,
  createRazorpayOrder,
  verifyRazorpayPayment,
  handleRazorpayPayment,
  handleCODPayment,
  handleWalletPayment,
  getPaymentMethods,
  getPaymentStatus
}; 