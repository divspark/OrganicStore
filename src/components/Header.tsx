import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, Mail, User, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };


  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-800 text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@organic.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Free shipping on orders over ₹500!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-green-800">Organic</span>
                <div className="text-xs text-green-600 -mt-1">Fresh & Natural</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
              </Link>
              <button onClick={() => handleNavigation("/shop")} className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
              </button>
              <Link to="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
              </Link>
              <button onClick={() => handleNavigation("/blog")} className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => handleNavigation("/contact")} className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"></span>
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => handleNavigation("/wishlist")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => handleNavigation("/login")} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={() => handleNavigation("/cart")} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Home</Link>
                <button onClick={() => handleNavigation("/shop")} className="text-gray-700 hover:text-green-600 font-medium transition-colors text-left">Shop</button>
                <Link to="#" className="text-gray-700 hover:text-green-600 font-medium transition-colors">About</Link>
                <button onClick={() => handleNavigation("/blog")} className="text-gray-700 hover:text-green-600 font-medium transition-colors text-left">Blog</button>
                <button onClick={() => handleNavigation("/contact")} className="text-gray-700 hover:text-green-600 font-medium transition-colors text-left">Contact</button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;