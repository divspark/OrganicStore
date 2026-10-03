import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Phone, Mail, User, Heart, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGrowStore } from '../store/useGrowStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Zustand Store Selectors
  const user = useGrowStore((state) => state.user);
  const logout = useGrowStore((state) => state.logout);
  const totalItems = useGrowStore((state) => state.getTotalItems());

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isLinkActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path === '/shop') return pathname === '/shop' || pathname.startsWith('/product');
    if (path === '/producer/dashboard') return pathname.startsWith('/producer');
    if (path === '/admin/dashboard') return pathname.startsWith('/admin');
    return pathname === path || pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
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
              <span>support@organic-store.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Free shipping on organic orders over ₹500!</span>
            {user && (
              <span className="bg-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Role: {user.role} ({user.district || 'All Districts'})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-green-600 to-emerald-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">🌱</span>
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-green-900">Grow<span className="text-emerald-600">Organic</span></span>
                <div className="text-xs text-green-600 font-medium -mt-1">Fresh Farm-to-Table</div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link
                to="/"
                className={`font-semibold transition-colors relative group py-1 ${
                  isLinkActive('/')
                    ? 'text-emerald-800 font-bold'
                    : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                <span>Home</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    isLinkActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>

              <button
                onClick={() => handleNavigation('/shop')}
                className={`font-semibold transition-colors relative group py-1 ${
                  isLinkActive('/shop')
                    ? 'text-emerald-800 font-bold'
                    : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                <span>Shop Products</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    isLinkActive('/shop') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>

              <Link
                to="/smartbite"
                className={`font-semibold transition-colors relative group py-1 ${
                  isLinkActive('/smartbite')
                    ? 'text-emerald-800 font-bold'
                    : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                <span>Recipes & Nutrition</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    isLinkActive('/smartbite') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>

              <button
                onClick={() => handleNavigation('/blog')}
                className={`font-semibold transition-colors relative group py-1 ${
                  isLinkActive('/blog')
                    ? 'text-emerald-800 font-bold'
                    : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                <span>Stories & Blog</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    isLinkActive('/blog') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>

              <button
                onClick={() => handleNavigation('/contact')}
                className={`font-semibold transition-colors relative group py-1 ${
                  isLinkActive('/contact')
                    ? 'text-emerald-800 font-bold'
                    : 'text-gray-700 hover:text-emerald-700'
                }`}
              >
                <span>Contact</span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                    isLinkActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </button>

              {user?.role === 'producer' && (
                <Link
                  to="/producer/dashboard"
                  className={`font-semibold transition-colors relative group py-1 ${
                    isLinkActive('/producer/dashboard')
                      ? 'text-emerald-900 font-bold'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  <span>Producer Hub</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                      isLinkActive('/producer/dashboard') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              )}

              {user?.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className={`font-semibold transition-colors relative group py-1 ${
                    isLinkActive('/admin/dashboard')
                      ? 'text-emerald-900 font-bold'
                      : 'text-emerald-700 hover:text-emerald-900'
                  }`}
                >
                  <span>Admin Panel</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all duration-300 ${
                      isLinkActive('/admin/dashboard') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handleNavigation("/wishlist")} 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-600" />
              </button>

              {user ? (
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={() => handleNavigation(user.role === 'producer' ? '/producer/dashboard' : user.role === 'admin' ? '/admin/dashboard' : '/')}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-green-800"
                    title={`Logged in as ${user.email}`}
                  >
                    <User className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-full transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-xs font-bold text-green-700 border border-green-600 hover:bg-green-50 rounded-xl transition-colors"
                >
                  Sign In
                </Link>
              )}

              {/* Cart Button */}
              <button 
                onClick={() => handleNavigation("/cart")} 
                className="relative p-2.5 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors shadow-md"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100 space-y-1.5">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isLinkActive('/')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <button 
                onClick={() => handleNavigation("/shop")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isLinkActive('/shop')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Shop Products
              </button>
              <Link 
                to="/smartbite" 
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isLinkActive('/smartbite')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Recipes & Nutrition
              </Link>
              <button 
                onClick={() => handleNavigation("/blog")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isLinkActive('/blog')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Stories & Blog
              </button>
              <button 
                onClick={() => handleNavigation("/contact")}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isLinkActive('/contact')
                    ? 'bg-emerald-50 text-emerald-800 font-bold border-l-4 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contact
              </button>
              {user ? (
                <div className="pt-2 border-t border-gray-100 space-y-1">
                  <div className="px-4 py-2 text-xs text-gray-500">
                    Logged in as <strong className="text-gray-800">{user.email}</strong> ({user.role})
                  </div>
                  {user.role === 'producer' && (
                    <button 
                      onClick={() => handleNavigation("/producer/dashboard")}
                      className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold ${
                        isLinkActive('/producer/dashboard')
                          ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600'
                          : 'text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      Producer Hub
                    </button>
                  )}
                  {user.role === 'admin' && (
                    <button 
                      onClick={() => handleNavigation("/admin/dashboard")}
                      className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold ${
                        isLinkActive('/admin/dashboard')
                          ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600'
                          : 'text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      Admin Panel
                    </button>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold flex items-center space-x-2 text-xs"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-100 px-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center py-2 px-4 bg-green-600 text-white rounded-xl font-bold text-xs shadow-sm"
                  >
                    Sign In / Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;