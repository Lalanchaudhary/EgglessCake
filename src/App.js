import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavbarDemo } from './components/Navbar'
import './App.css'
import logo from './assets/Egglesscake.png'
import HeroSection from './components/HeroSection'
import AllCakes from './pages/AllCakes'
import CakeDetails from './pages/CakeDetails'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import Home from './components/Home'
import Products from './components/Products'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'

const App = () => {
  return (
    <CartProvider>
      <Router>
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App
