import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { NavbarDemo } from './components/Navbar'
import './App.css'
import HeroSection from './components/HeroSection'
import AllCakes from './pages/AllCakes'
import CakeDetails from './pages/CakeDetails'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Products from './components/Products'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import ScrollToTop from './ScrollToTop'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import RefundPolicy from './pages/RefundPolicy'
import ShippingDelivery from './pages/ShippingDelivery'
import AdminLayout from './components/admin/AdminLayout'
import Dashboard from './components/admin/Dashboard'
import Orders from './components/admin/Orders'
import AdminProducts from './components/admin/Products'
import Users from './components/admin/Users'
import Analytics from './components/admin/Analytics'
import AdminLogin from './pages/AdminLogin'
import DeliveryBoys from './components/admin/DeliveryBoys'
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Public Route Component
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/user-profile" replace />
  }
  return children
}

// Admin Route Component
const AdminRoute = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('admin'))
  const token = localStorage.getItem('token')

  if (!token || !admin) {
    return <Navigate to="/admin/login" />
  }

  if (admin.role !== 'admin') {
    return <Navigate to="/" />
  }

  return children
}

// App Content with useLocation
const App = () => {
  const location = useLocation()
  const adminPaths = [
    '/admin',
    '/admin/login',
    '/admin/orders',
    '/admin/products',
    '/admin/users',
    '/admin/analytics'
  ]

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path))

  return (
    <>
      <ScrollToTop />
      <div className="bg-[#f4eee1] min-h-screen flex flex-col">
        {!isAdminRoute && <NavbarDemo />}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/products" element={<Products />} />
            <Route path="/delievery" element={<DeliveryBoys />} />
            <Route path="/all-cakes" element={<AllCakes />} />
            <Route path="/cake/:id" element={<CakeDetails />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />

            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Profile />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Orders />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <AdminProducts />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Users />
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <Analytics />
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isAdminRoute && <Footer />}
      </div>
    </>
  )
}

export default App
