const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
const paymentOrder = async (req, res) => {
  console.log('====================================');
  console.log("hello");
  console.log('====================================');
  try {
    const { amount, currency = 'INR' } = req.body;

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Error creating payment order' });
  }
};

// Verify Razorpay payment
const VerifyOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update order payment status
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      await order.verifyPayment({
        paymentId: razorpay_payment_id,
        signature: razorpay_signature
      });

      res.json({
        message: 'Payment verified successfully',
        order
      });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};

// Handle COD payment
const handleCODPayment = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount } = req.body;

    // Create new order with COD payment method
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: 'COD',
      status: 'Pending',
      paymentStatus: 'Pending'
    });

    await order.save();

    // Add order reference to user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { orders: order._id }
    });

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Error creating COD order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Confirm COD payment (admin only)
const confirmCODPayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update order status
    order.paymentStatus = 'Completed';
    order.status = 'Processing';
    await order.save();

    res.json({
      message: 'COD payment confirmed',
      order
    });
  } catch (error) {
    console.error('Error confirming COD payment:', error);
    res.status(500).json({ message: 'Error confirming payment' });
  }
};

module.exports = {
  paymentOrder,
  VerifyOrder,
  handleCODPayment,
  confirmCODPayment
};
  
