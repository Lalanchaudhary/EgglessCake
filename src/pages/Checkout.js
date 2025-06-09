import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
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
import ShipAddr from '../components/checkout/ShipAddr';
import Payment from '../components/checkout/Payment';
const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { user} = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Address form data
  const [addressFormData, setAddressFormData] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    pincode: '',
    location: {
      latitude: '',
      longitude: ''
    },
    isDefault: false
  });



  useEffect(() => {
    // Set default address if available
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      setSelectedAddress1(defaultAddress || user.addresses[0]);
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user?.addresses]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      setError('Please select a shipping address');
      return;
    }

    // await handlePayment();
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedAddress) {
      setError('Please select a shipping address');
      return;
    }
    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError(null);
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ShipAddr setSelectedAddress1={setSelectedAddress1}/>
        );
      case 2:
        return (
          <Payment selectedAddress={selectedAddress}/>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Order Review</h2>
            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Shipping Information</Typography>
                <Typography>
                  {user?.name}<br />
                  {selectedAddress?.street}<br />
                  {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.pincode}<br />
                  {user?.email}<br />
                  {user?.phone}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Order Summary</Typography>
                {cartItems.map(item => (
                  <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography>{item.name} x {item.quantity}</Typography>
                    <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                  </Box>
                ))}
                <Box sx={{ borderTop: 1, borderColor: 'divider', mt: 2, pt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Shipping</Typography>
                    <Typography>${shipping.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Tax</Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontWeight: 'bold' }}>
                    <Typography variant="subtitle1">Total</Typography>
                    <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Shipping', 'Payment', 'Review'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > index + 1 ? 'bg-rose-500' : 
                  currentStep === index + 1 ? 'bg-rose-300' : 'bg-gray-200'
                }`}>
                  <span className="text-white font-medium">{index + 1}</span>
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep === index + 1 ? 'text-rose-500 font-medium' : 'text-gray-500'
                }`}>{step}</span>
                {index < 2 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > index + 1 ? 'bg-rose-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleOrderSubmit} className="bg-white rounded-lg shadow-md p-6">
          {renderStep()}
          
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <Button
                variant="outlined"
                onClick={prevStep}
                disabled={loading}
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                variant="contained"
                onClick={nextStep}
                disabled={loading || (currentStep === 1 && !selectedAddress)}
                sx={{ ml: 'auto', bgcolor: '#272361', '&:hover': { bgcolor: '#272361' } }}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ ml: 'auto', bgcolor: '#e098b0', '&:hover': { bgcolor: '#d88aa2' } }}
              >
                {loading ? <CircularProgress size={24} /> : 'Place Order'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 