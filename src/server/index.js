const paymentRoutes = require('./routes/payment');

// ... existing middleware ...

app.use('/api', paymentRoutes);

// ... rest of the existing code ... 