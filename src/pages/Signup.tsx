import React, { useState } from 'react';
import { Eye, EyeOff, Mail, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useGrowStore } from '../store/useGrowStore';

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'consumer',
    district: 'Pune',
    state: 'Maharashtra',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    subscribeNewsletter: true
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const signup = useGrowStore((state) => state.signup);

  const roles = [
    { value: 'consumer', label: 'Consumer', description: 'Buy fresh organic products' },
    { value: 'producer', label: 'Producer', description: 'Sell verified farm produce' },
    { value: 'admin', label: 'Admin', description: 'Manage platform & operations' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await signup({
        email: formData.email,
        password: formData.password,
        role: formData.role,
        district: formData.district,
        state: formData.state,
      });

      console.log('Signup success:', res);

      if (formData.role === 'producer') {
        navigate('/producer/dashboard');
      } else if (formData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError(err.message || 'Registration failed. Please try a different email.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      let strength = 0;
      if (value.length >= 6) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'border-purple-600 bg-purple-50 text-purple-900';
      case 'producer': return 'border-blue-600 bg-blue-50 text-blue-900';
      default: return 'border-green-600 bg-green-50 text-green-900';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        {/* Return to Homepage Top CTA */}
        <div className="mb-8 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white/90 hover:bg-white backdrop-blur-md px-4 py-2.5 rounded-2xl border border-emerald-200/80 shadow-xs hover:shadow-md transition-all group"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180 group-hover:-translate-x-1 transition-transform text-emerald-600" />
            <span>Return to Storefront</span>
          </Link>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-200">
            🌱 Join GrowOrganic
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div className="text-center lg:text-left space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 mb-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-800 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="text-left">
                <span className="text-3xl font-black text-green-900">Grow<span className="text-emerald-600">Organic</span></span>
                <div className="text-xs text-green-600 font-semibold -mt-1">Fresh Farm-to-Table</div>
              </div>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Join India's Fastest Growing Organic Marketplace!
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Create your account to buy pesticide-free harvest, sell your farm products, or manage your vendor portal.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span>Access to 100% verified organic harvest</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span>Direct farmer connection & fair transparent pricing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-700">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span>SmartBite healthy organic recipes & nutritional diet planner</span>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h2>
              <p className="text-xs text-gray-500">Sign up and choose your platform role</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Choose Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      type="button"
                      key={r.value}
                      onClick={() => setFormData(prev => ({ ...prev, role: r.value }))}
                      className={`p-2.5 border-2 rounded-xl text-left transition-all ${
                        formData.role === r.value
                          ? getRoleColor(r.value)
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-xs capitalize flex items-center justify-between">
                        <span>{r.label}</span>
                        {formData.role === r.value && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold text-gray-700 uppercase">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* District & State */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="district" className="text-xs font-bold text-gray-700 uppercase">
                    District
                  </label>
                  <input
                    id="district"
                    name="district"
                    type="text"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="e.g. Pune"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="state" className="text-xs font-bold text-gray-700 uppercase">
                    State
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="e.g. Maharashtra"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="password" className="text-xs font-bold text-gray-700 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-xs font-bold text-gray-700 uppercase">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2 pt-1">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="text-xs text-gray-600">
                  I agree to the Terms of Service & 100% Organic Quality Policy
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Create {formData.role.toUpperCase()} Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                Already registered?{' '}
                <Link to="/login" className="text-green-700 hover:text-green-800 font-bold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;