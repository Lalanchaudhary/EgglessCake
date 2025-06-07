const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Razorpay', 'Wallet'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  shippingAddress: {
    type: {
      type: String,
      enum: ['Home', 'Work', 'Other'],
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    location: {
      latitude: Number,
      longitude: Number
    }
  },
  deliveryInstructions: {
    type: String
  },
  estimatedDelivery: {
    type: Date
  },
  actualDelivery: {
    type: Date
  },
  trackingNumber: {
    type: String
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  razorpaySignature: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate a unique order ID
orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.orderId = `ORD${year}${month}${day}${random}`;
  }
  next();
});

// Add method to calculate total amount
orderSchema.methods.calculateTotal = function() {
  return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Add method to update order status
orderSchema.methods.updateStatus = async function(newStatus) {
  this.status = newStatus;
  if (newStatus === 'Delivered') {
    this.actualDelivery = new Date();
  }
  return this.save();
};

// Add method to verify payment
orderSchema.methods.verifyPayment = async function(paymentDetails) {
  if (this.paymentMethod === 'Razorpay') {
    this.razorpayPaymentId = paymentDetails.paymentId;
    this.razorpaySignature = paymentDetails.signature;
  }
  this.paymentStatus = 'Completed';
  return this.save();
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order; 