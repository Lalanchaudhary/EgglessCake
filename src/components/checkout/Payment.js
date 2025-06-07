import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Alert,
    CircularProgress,
    RadioGroup,
    Radio,
    FormControlLabel,
  } from '@mui/material';
import { useUser } from '../../context/UserContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  handleRazorpayPayment,
  handleCODPayment,
  handleWalletPayment,
  getPaymentMethods
} from '../../services/paymentServices';

const Payment = ({ selectedAddress }) => {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const renderPaymentMethodSelection = () => {
      const paymentMethods = getPaymentMethods();

      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Select Payment Method
          </Typography>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((method) => (
              <FormControlLabel
                key={method.id}
                value={method.id}
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {method.icon && (
                      <img
                        src={method.icon}
                        alt={method.name}
                        style={{ height: '24px' }}
                        className={method.id === 'razorpay' ? 'border' : ''}
                      />
                    )}
                    <Box>
                      <Typography>{method.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {method.description}
                      </Typography>
                    </Box>
                  </Box>
                }
                disabled={!method.available}
              />
            ))}
          </RadioGroup>

          {paymentMethod === 'wallet' && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Available Balance: ₹{user?.walletBalance || 0}
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: '#272361', '&:hover': { bgcolor: '#272361' } }}
            onClick={handleOrderSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue to Payment'}
          </Button>
        </Box>
      );
    };

    const handlePayment = async () => {
      try {
        setLoading(true);
        setError(null);

        const orderData = {
          items: cartItems,
          totalAmount: total,
          shippingAddress: selectedAddress,
          userId: user._id
        };

        let result;

        switch (paymentMethod) {
          case 'razorpay':
            result = await handleRazorpayPayment(
              { amount: total },
              { name: user.name, email: user.email, phone: user.phone }
            );
            break;
          case 'cod':
            result = await handleCODPayment(orderData);
            break;
          case 'wallet':
            result = await handleWalletPayment(orderData);
            break;
          default:
            throw new Error('Invalid payment method');
        }

        if (result.success) {
          navigate('/order-success');
        } else {
          throw new Error(result.message || 'Payment failed');
        }
      } catch (err) {
        setError(err.message || 'Payment failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const handleOrderSubmit = async (e) => {
      e.preventDefault();
      if (!selectedAddress) {
        setError('Please select a shipping address');
        return;
      }

      await handlePayment();
    };

    return (
        <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

        <Box sx={{ my: 2 }}>
  <Typography variant="h6">Total: ₹{total.toFixed(2)}</Typography>
</Box>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        {renderPaymentMethodSelection()}
      </div>
    )
}

export default Payment