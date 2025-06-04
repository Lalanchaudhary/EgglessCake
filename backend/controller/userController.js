const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'phone', 'profilePicture'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates' });
  }

  try {
    updates.forEach(update => req.user[update] = req.body[update]);
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add new address
exports.addAddress = async (req, res) => {
  try {
    req.user.addresses.push(req.body);
    await req.user.save();
    res.status(201).json(req.user.addresses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const address = req.user.addresses.id(req.params.addressId);
    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    Object.assign(address, req.body);
    await req.user.save();
    res.json(req.user.addresses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    req.user.addresses = req.user.addresses.filter(
      address => address._id.toString() !== req.params.addressId
    );
    await req.user.save();
    res.json(req.user.addresses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add UPI account
exports.addUPI = async (req, res) => {
  try {
    req.user.upiAccounts.push(req.body);
    await req.user.save();
    res.status(201).json(req.user.upiAccounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update UPI account
exports.updateUPI = async (req, res) => {
  try {
    const upiAccount = req.user.upiAccounts.id(req.params.upiId);
    if (!upiAccount) {
      return res.status(404).json({ error: 'UPI account not found' });
    }

    Object.assign(upiAccount, req.body);
    await req.user.save();
    res.json(req.user.upiAccounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete UPI account
exports.deleteUPI = async (req, res) => {
  try {
    req.user.upiAccounts = req.user.upiAccounts.filter(
      upi => upi._id.toString() !== req.params.upiId
    );
    await req.user.save();
    res.json(req.user.upiAccounts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add money to wallet
exports.addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    req.user.wallet.balance += amount;
    req.user.wallet.transactions.push({
      type: 'Credit',
      amount,
      description: 'Added to wallet'
    });
    await req.user.save();
    res.json(req.user.wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get wallet transactions
exports.getWalletTransactions = async (req, res) => {
  try {
    res.json(req.user.wallet.transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update account settings
exports.updateSettings = async (req, res) => {
  try {
    const { notifications, privacy, security } = req.body;
    
    if (notifications) {
      req.user.settings.notifications = {
        ...req.user.settings.notifications,
        ...notifications
      };
    }
    
    if (privacy) {
      req.user.settings.privacy = {
        ...req.user.settings.privacy,
        ...privacy
      };
    }
    
    if (security) {
      req.user.settings.security = {
        ...req.user.settings.security,
        ...security
      };
    }

    await req.user.save();
    res.json(req.user.settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get orders
exports.getOrders = async (req, res) => {
  try {
    res.json(req.user.orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get membership details
exports.getMembership = async (req, res) => {
  try {
    res.json(req.user.membership);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 