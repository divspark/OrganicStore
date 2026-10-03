import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, Loader2, Info } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGrowStore } from '../store/useGrowStore';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'consumer' | 'producer' | 'admin'>('consumer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const login = useGrowStore((state) => state.login);

  const fromPath = (location.state as any)?.from;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
        role: role,
      });

      console.log('Login successful:', res);

      const userRole = res?.user?.role || role;

      // If user came from a protected route or cart checkout, prioritize that if valid for role
      if (fromPath) {
        if (fromPath.includes('/admin') && userRole === 'admin') {
          navigate(fromPath);
          return;
        }
        if (fromPath.includes('/producer') && userRole === 'producer') {
          navigate(fromPath);
          return;
        }
        if (fromPath === '/cart' || fromPath === '/shop' || fromPath.startsWith('/product')) {
          navigate(fromPath);
          return;
        }
      }

      // Default role based navigation
      if (userRole === 'producer') {
        navigate('/producer/dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(fromPath || '/');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid credentials or connection error.');
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData(prev => ({
      ...prev,
      [name]: checked !== undefined ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-400 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Return to Homepage Top CTA */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white/90 hover:bg-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-200/80 shadow-xs hover:shadow-md transition-all group"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform text-emerald-600" />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-200">
            🌱 Organic Store
          </span>
        </div>

        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-left">
              <span className="text-3xl font-black text-green-900">Grow<span className="text-emerald-600">Organic</span></span>
              <div className="text-xs text-green-600 font-semibold -mt-1">Fresh Farm-to-Table</div>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
          <p className="text-sm text-gray-600">Sign in to access your organic platform</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {fromPath && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs flex items-center space-x-2">
              <Info className="w-4 h-4 flex-shrink-0 text-emerald-600" />
              <span>
                {fromPath.includes('/cart')
                  ? 'Please sign in to proceed with checkout & harvest delivery.'
                  : fromPath.includes('/admin')
                  ? 'Admin authentication required to access Admin Dashboard.'
                  : fromPath.includes('/producer')
                  ? 'Producer authentication required to access Producer Dashboard.'
                  : 'Please sign in to continue to your destination.'}
              </span>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}


          {/* Role Switcher */}
          <div className="mb-6">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Select Role</label>
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1.5 rounded-2xl">
              {(['consumer', 'producer', 'admin'] as const).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    role === r 
                      ? 'bg-green-600 text-white shadow-sm' 
                      : 'text-gray-600 hover:text-green-800'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-gray-700 uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm placeholder-gray-400"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-gray-700 uppercase">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-600">
                  Keep me signed in
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-600">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-green-700 hover:text-green-800 font-bold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;