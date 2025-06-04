import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavbarDemo } from './components/Navbar'
import './App.css'
import HeroSection from './components/HeroSection'
import AllCakes from './pages/AllCakes'
import CakeDetails from './pages/CakeDetails'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import Products from './components/Products'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import { UserProvider } from './context/UserContext'
import ScrollToTop from './ScrollToTop'

const App = () => {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <ScrollToTop /> {/* ✅ Now placed correctly */}
          <div className='bg-[#f4eee1] min-h-screen flex flex-col'>
            <NavbarDemo />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/products" element={<Products />} />
                <Route path="/all-cakes" element={<AllCakes />} />
                <Route path="/cake/:id" element={<CakeDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </UserProvider>
    </CartProvider>
  )
}

export default App
