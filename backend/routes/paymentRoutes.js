const express = require('express');
const router = express.Router();
const { paymentOrder, VerifyOrder, handleCODPayment, confirmCODPayment } = require('../controller/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Razorpay routes
router.post('/create-order', protect, paymentOrder);
router.post('/verify-order', protect, VerifyOrder);

// COD routes
router.post('/cod', protect, handleCODPayment);
router.put('/cod/:orderId/confirm', protect, confirmCODPayment);

module.exports = router;