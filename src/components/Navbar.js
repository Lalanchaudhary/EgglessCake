import { useEffect, useState, useRef } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "../lib/utils";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/Egglesscake.png'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
export function NavbarDemo() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className='sticky top-0 z-50 py-2 md:py-3 px-3 md:px-6 border-b  border-gray-200  bg-white shadow-sm backdrop-blur-sm bg-white/95' style={{ height: isMobile ? '60px' : '100px' }}>
      <div className="max-w-7xl mx-auto" style={{ height: isMobile ? '50px' : '80px' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-6" onClick={()=>{navigate("/")}}>
            <img src={logo} alt='logo' className='h-10 md:h-14 lg:h-20 transition-all duration-300 hover:scale-105' />
          </div>

          {/* Search input - visible on all screen sizes */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#e098b0] focus:ring-2 focus:ring-[#e098b0]/20 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e098b0] transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <Navbar />
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Cart Icon */}
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 md:top-0 md:right-0 inline-flex items-center justify-center px-1.5 py-0.5 md:px-2 md:py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#e098b0] rounded-full">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Profile Icon */}
            <button 
              onClick={() => navigate('/user-profile')}
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-5 h-5 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu with search */}
        <div 
          ref={mobileMenuRef}
          className={cn(
            "relative w-full transition-all duration-300 ease-in-out bg-white",
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none md:hidden"
          )}>
          {/* Mobile search input */}
          <div className="relative w-full mt-2 mb-4">
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#e098b0] focus:ring-2 focus:ring-[#e098b0]/20 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e098b0] transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <Navbar />
        </div>
      </div>
    </div>
  );
}

function Navbar({
  className
}) {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <div
      className={cn(
        "inset-x-0 max-w-2xl mx-auto z-50",
        "mt-2 md:mt-0",
        className
      )}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="flex flex-col space-y-4 text-sm">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-600 hover:text-rose-400"
                onClick={() => setActive(item.name)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Cakes">
          <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 p-2 md:p-4 w-[90vw] max-w-md md:max-w-2xl">
            <ProductItem
              title="All Cakes"
              href="/all-cakes"
              src={logo}
              description="Browse our complete collection of delicious eggless cakes" />
            <ProductItem
              title="Custom Orders"
              href="/custom-orders"
              src={logo}
              description="Order custom cakes for your special occasions" />
            <ProductItem
              title="Seasonal Specials"
              href="/seasonal"
              src={logo}
              description="Check out our limited-time seasonal cake offerings" />
            <ProductItem
              title="Gift Sets"
              href="/gift-sets"
              src={logo}
              description="Perfect cake combinations for gifting" />
              
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Support">
          <div className="flex flex-col space-y-4 text-sm">
            <Link
              to="/about-us"
              className="text-gray-600 hover:text-rose-400"
              onClick={() => setActive('About Us')}
            >
              About Us
            </Link>
            <Link
              to="/contact-us"
              className="text-gray-600 hover:text-rose-400"
              onClick={() => setActive('Contact Us')}
            >
              Contact Us
            </Link>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
