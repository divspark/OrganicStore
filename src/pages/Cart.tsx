import React, { useState, useEffect } from 'react';
import { 
  Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, CheckCircle, 
  Loader2, ArrowRight, Sparkles, MapPin, CreditCard, DollarSign, 
  Leaf, Clock, Check, LogIn
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useGrowStore } from '../store/useGrowStore';
import { api } from '../services/api';

const Cart: React.FC = () => {
  // Zustand Store
  const cartItems = useGrowStore((state) => state.cartItems);
  const totalAmount = useGrowStore((state) => state.getTotalCartAmount());
  const updateQuantity = useGrowStore((state) => state.updateQuantity);
  const removeFromCart = useGrowStore((state) => state.removeFromCart);
  const clearCart = useGrowStore((state) => state.clearCart);
  const addToCart = useGrowStore((state) => state.addToCart);
  const placeOrder = useGrowStore((state) => state.placeOrder);
  const user = useGrowStore((state) => state.user);
  const isAuthenticated = useGrowStore((state) => state.isAuthenticated);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Checkout Flow state
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'payment'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('card');
  const [deliverySlot, setDeliverySlot] = useState('Morning Harvest (7:00 AM - 11:00 AM)');
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<any>(null);
  const [orderError, setOrderError] = useState<string | null>(null);

  const [address, setAddress] = useState({
    name: user?.email ? user.email.split('@')[0] : 'Suresh Patil',
    email: user?.email || 'suresh@example.com',
    phone: '+91 98765 43210',
    street: 'Plot 42, Green Valley Organic Enclave',
    city: user?.district || 'Pune',
    state: user?.state || 'Maharashtra',
    postalCode: '411045',
    country: 'India',
  });

  // Sync user details to address when user logs in
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        name: user.email ? user.email.split('@')[0] : prev.name,
        email: user.email || prev.email,
        city: user.district || prev.city,
        state: user.state || prev.state,
      }));
    }
  }, [user]);

  // Handle Stripe callback URL params if redirected back
  useEffect(() => {
    const isSuccess = searchParams.get('payment_success') === 'true' || searchParams.get('success') === 'true';
    const orderRef = searchParams.get('orderId') || searchParams.get('order_id');
    if (isSuccess) {
      setOrderPlaced({
        _id: orderRef || `ORD-STRIPE-${Date.now().toString().slice(-6)}`,
        status: 'PAID (STRIPE)',
        deliverySlot: 'Morning Harvest (7:00 AM - 11:00 AM)',
      });
      clearCart();
    }
  }, [searchParams]);

  // Guard: require login before opening checkout modal
  const handleStartCheckout = () => {
    if (!isAuthenticated || !user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    setIsCheckingOut(true);
  };


  // Curated sample products for quick add when cart is low or empty
  const quickSuggestions = [
    {
      _id: 'quick-1',
      name: 'Organic Hass Avocados (2 pcs)',
      price: 180,
      originalPrice: 220,
      photo: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Exotic Fruits',
      stock: 20,
      rating: 4.9
    },
    {
      _id: 'quick-2',
      name: 'Baby Spinach Bunches',
      price: 45,
      originalPrice: 60,
      photo: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fresh Greens',
      stock: 35,
      rating: 4.8
    },
    {
      _id: 'quick-3',
      name: 'Farm Heirloom Vine Tomatoes (1 kg)',
      price: 70,
      originalPrice: 95,
      photo: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Vegetables',
      stock: 40,
      rating: 4.9
    },
    {
      _id: 'quick-4',
      name: 'Cold Pressed Wild Mustard Oil (500ml)',
      price: 195,
      originalPrice: 250,
      photo: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
      category: 'Cold-Pressed Oils',
      stock: 15,
      rating: 4.9
    }
  ];

  // Calculations
  const freeShippingThreshold = 500;
  const isFreeShipping = totalAmount >= freeShippingThreshold || totalAmount === 0;
  const shippingFee = isFreeShipping ? 0 : 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - totalAmount);
  const progressPercent = Math.min(100, Math.round((totalAmount / freeShippingThreshold) * 100));
  
  const estimatedGst = Math.round(totalAmount * 0.05);
  const finalTotal = Math.max(0, Math.round(totalAmount + shippingFee + estimatedGst));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setOrderLoading(true);
    setOrderError(null);

    try {
      const orderData = {
        user: address.email || user.email,
        products: cartItems.map(item => ({
          product: item.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        })),
        totalAmount: finalTotal,
        paymentMethod: paymentMethod === 'card' ? 'STRIPE_CARD' : paymentMethod.toUpperCase(),
        deliverySlot,
        shippingAddress: {
          name: address.name,
          phone: address.phone,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
        },
        status: paymentMethod === 'card' ? 'awaiting_payment' : 'pending',
      };

      const res = await placeOrder(orderData);
      const createdOrderId = res?._id || `ORD-${Date.now()}`;

      // If Card / Stripe payment selected, invoke payment API endpoint
      if (paymentMethod === 'card') {
        try {
          const paymentRes = await api.payment.createIntent({
            amount: finalTotal,
            orderId: createdOrderId,
            currency: 'inr',
          });

          // Check if Stripe Checkout session URL is provided
          const stripeUrl = paymentRes?.url || paymentRes?.sessionUrl || paymentRes?.redirectUrl;
          if (stripeUrl) {
            clearCart();
            window.location.href = stripeUrl;
            return;
          }
        } catch (payErr: any) {
          console.warn('[Stripe Payment] Initiating checkout:', payErr.message);
        }
      }

      setOrderPlaced(res || { _id: createdOrderId, ...orderData });
      clearCart();
    } catch (err: any) {
      console.error('Order creation error:', err);
      setOrderError(err.message || 'Failed to connect with order backend.');
    } finally {
      setOrderLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-emerald-50/30 to-green-50/40 py-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-sm">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center space-x-2 text-emerald-800 hover:text-emerald-950 font-semibold text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-emerald-600" />
            <span>Continue Picking Farm Fresh Items</span>
          </button>

          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <Leaf className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              100% Certified Organic Basket
            </span>
          </div>
        </div>

        {/* Order Confirmed State */}
        {orderPlaced ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-emerald-100 text-center animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-inner">
              <CheckCircle className="w-12 h-12" />
            </div>
            
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Harvest Dispatched to Farm Queue
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-3 mb-2">Order Confirmed Successfully!</h2>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Thank you for supporting local organic farming. Our farmers have received your harvest request and are preparing freshly harvested produce.
            </p>

            <div className="bg-emerald-50/60 border border-emerald-100 p-6 rounded-2xl text-xs text-left mb-8 space-y-3">
              <div className="flex justify-between border-b border-emerald-100/80 pb-2">
                <span className="text-gray-500 font-medium">Order Reference:</span>
                <span className="font-mono font-bold text-gray-900">{orderPlaced._id || `ORD-${Date.now().toString().slice(-6)}`}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-100/80 pb-2">
                <span className="text-gray-500 font-medium">Delivery Slot:</span>
                <span className="font-bold text-emerald-800">{deliverySlot}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-100/80 pb-2">
                <span className="text-gray-500 font-medium">Delivery Destination:</span>
                <span className="font-medium text-gray-800 text-right">{address.street}, {address.city}, {address.state} - {address.postalCode}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-100/80 pb-2">
                <span className="text-gray-500 font-medium">Payment Method:</span>
                <span className="font-bold uppercase text-gray-800">{paymentMethod === 'cod' ? 'Cash / Pay on Harvest Delivery' : paymentMethod === 'upi' ? 'UPI Instant Pay' : 'Credit / Debit Card'}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-black text-emerald-950">
                <span>Final Paid Total:</span>
                <span className="text-emerald-700 text-base font-black">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setOrderPlaced(null);
                  navigate('/shop');
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Shop More Fresh Harvest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="space-y-12">
            <div className="text-center py-14 bg-white rounded-3xl shadow-sm border border-emerald-100 max-w-2xl mx-auto p-8">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-5 text-emerald-600 shadow-inner">
                <ShoppingBag className="w-12 h-12" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">Your Organic Basket is Empty</h2>
              <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                Fill your cart with pure, pesticide-free vegetables, native heirloom fruits, stone-ground flours, and natural cold-pressed oils.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Organic Store</span>
              </Link>
            </div>

            {/* Quick Suggestions for Empty Cart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-600" />
                    <span>Recommended Daily Organic Staples</span>
                  </h3>
                  <p className="text-xs text-gray-500">Add directly to your basket with one tap</p>
                </div>
                <Link to="/shop" className="text-xs font-bold text-emerald-700 hover:underline">
                  View All Products →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {quickSuggestions.map((prod) => (
                  <div key={prod._id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all flex flex-col justify-between group">
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-gray-50">
                        <img src={prod.photo} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute top-2 left-2 bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                          {prod.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-1 mb-1">{prod.name}</h4>
                      <div className="flex items-baseline space-x-2 mb-3">
                        <span className="font-extrabold text-sm text-emerald-800">₹{prod.price}</span>
                        {prod.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">₹{prod.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(prod, 1)}
                      className="w-full py-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Basket</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Active Cart Grid View */
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Left Col: Free Shipping Progress + Cart Items (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Free Delivery Progress Bar */}
              <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <div className="flex items-center space-x-2 font-bold text-gray-800">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>
                      {isFreeShipping 
                        ? '🎉 You unlocked FREE Farm Delivery on this basket!' 
                        : `Add ₹${amountToFreeShipping.toFixed(0)} more for FREE Express Delivery`}
                    </span>
                  </div>
                  <span className="font-extrabold text-emerald-800">
                    ₹{totalAmount.toFixed(0)} / ₹{freeShippingThreshold}
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Items Card Header */}
              <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="p-5 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 border-b border-emerald-100 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-700" />
                    <h2 className="text-base font-extrabold text-gray-900">
                      Produce Items in Cart ({cartItems.length})
                    </h2>
                  </div>
                  <button
                    onClick={clearCart}
                    className="text-xs text-red-600 hover:text-red-800 font-bold transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Basket</span>
                  </button>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-5 sm:p-6 hover:bg-stone-50/60 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        
                        {/* Image & Item Details */}
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-emerald-100 flex-shrink-0 bg-stone-100"
                          />
                          <div className="space-y-1">
                            <span className="inline-block text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {item.category || 'Farm Fresh'}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="font-extrabold text-emerald-800 text-sm">₹{item.price}</span>
                              <span className="text-gray-400">/ unit</span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="text-[11px] text-gray-400 line-through">₹{item.originalPrice}</span>
                              )}
                            </div>
                            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>In Stock & Ready for Harvest</span>
                            </p>
                          </div>
                        </div>

                        {/* Stepper + Subtotal + Remove */}
                        <div className="flex items-center justify-between sm:justify-end space-x-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          
                          {/* Stepper */}
                          <div className="flex items-center bg-gray-100/90 rounded-2xl p-1 border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-emerald-800 hover:bg-white rounded-xl transition-all shadow-xs"
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-9 text-center font-black text-sm text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-emerald-800 hover:bg-white rounded-xl transition-all shadow-xs"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right min-w-[80px]">
                            <div className="text-base font-black text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[11px] font-semibold text-red-500 hover:text-red-700 mt-1 inline-flex items-center space-x-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Farm-to-Door</h4>
                    <p className="text-[11px] text-gray-500">Harvested within 24h</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">100% Eco Packaging</h4>
                    <p className="text-[11px] text-gray-500">Zero plastic guarantee</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Quality Verified</h4>
                    <p className="text-[11px] text-gray-500">Pesticide residue tested</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Billing Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Billing Summary Box */}
              <div className="bg-white rounded-3xl shadow-md border border-emerald-100 p-6 sticky top-24">
                <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Harvest Billing Summary
                </h3>

                <div className="space-y-3 text-xs text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Items Total ({cartItems.length} items)</span>
                    <span className="font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <span>Farm Express Delivery</span>
                      {isFreeShipping && <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">FREE</span>}
                    </span>
                    <span className="font-medium text-gray-900">
                      {shippingFee === 0 ? <span className="text-emerald-700 font-bold">₹0.00</span> : `₹${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Plastic-Free Eco Packaging</span>
                    <span className="text-emerald-700 font-bold">FREE (₹0)</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Goods & Services Tax (5%)</span>
                    <span className="font-medium text-gray-900">₹{estimatedGst.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-2 flex justify-between items-baseline">
                    <div>
                      <span className="text-sm font-black text-gray-900 block">Total Payable</span>
                      <span className="text-[10px] text-gray-400">Inclusive of all organic farm taxes</span>
                    </div>
                    <span className="text-2xl font-black text-emerald-800">
                      ₹{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {!isAuthenticated && (
                  <div className="mb-4 p-3 bg-amber-50/90 border border-amber-200 text-amber-900 rounded-2xl text-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <LogIn className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>Sign in required to place order</span>
                    </div>
                    <Link
                      to="/login"
                      state={{ from: '/cart' }}
                      className="font-bold text-amber-800 hover:text-amber-950 underline ml-2 whitespace-nowrap"
                    >
                      Login →
                    </Link>
                  </div>
                )}

                <button
                  onClick={handleStartCheckout}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group"
                >
                  <span>Proceed to Delivery & Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit Encrypted Secure Farm Checkout</span>
                </p>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Checkout Modal / Drawer */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative animate-scale-up max-h-[90vh] overflow-y-auto border border-emerald-100">
            
            {/* Close Button */}
            <button
              onClick={() => setIsCheckingOut(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>

            {/* Stepper Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 mb-1">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Farm-to-Door Delivery</span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Complete Your Order</h3>
              
              {/* Step Tabs */}
              <div className="flex border-b border-gray-100 mt-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('details')}
                  className={`pb-2.5 px-4 transition-colors flex items-center space-x-1.5 border-b-2 ${
                    checkoutStep === 'details' 
                      ? 'border-emerald-600 text-emerald-800' 
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>1. Delivery Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('payment')}
                  className={`pb-2.5 px-4 transition-colors flex items-center space-x-1.5 border-b-2 ${
                    checkoutStep === 'payment' 
                      ? 'border-emerald-600 text-emerald-800' 
                      : 'border-transparent text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>2. Payment & Confirmation</span>
                </button>
              </div>
            </div>

            {orderError && (
              <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-medium">
                {orderError}
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
              {checkoutStep === 'details' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Customer Full Name</label>
                      <input
                        type="text"
                        required
                        value={address.name}
                        onChange={(e) => setAddress({ ...address, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Email (Order Updates & Invoice)</label>
                    <input
                      type="email"
                      required
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Street Address & Landmark</label>
                    <input
                      type="text"
                      required
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Preferred Delivery Slot</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Morning Harvest (7:00 AM - 11:00 AM)',
                        'Evening Fresh Batch (4:00 PM - 8:00 PM)'
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setDeliverySlot(slot)}
                          className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                            deliverySlot === slot 
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold' 
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[11px]">{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('payment')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center space-x-2"
                    >
                      <span>Next: Payment Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Payment Selection Step */}
                  <div>
                    <label className="font-bold text-gray-700 block mb-2">Select Payment Method</label>
                    <div className="space-y-2">
                      <div
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          paymentMethod === 'cod' 
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                            <DollarSign className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-xs">Cash on Delivery / Pay on Harvest</h4>
                            <p className="text-[11px] text-gray-500">Inspect fresh organic produce at your doorstep before paying</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>

                      <div
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          paymentMethod === 'upi' 
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 font-bold">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-xs">UPI Instant Pay (GPay, PhonePe, Paytm)</h4>
                            <p className="text-[11px] text-gray-500">Scan QR or enter UPI ID for instantaneous zero-fee transfer</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>

                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          paymentMethod === 'card' 
                            ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900 text-xs">Stripe Online Payment (Cards & Net Banking)</h4>
                              <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-md">
                                Stripe Gateway
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500">256-bit encrypted checkout via Stripe • Visa, Mastercard, RuPay & Amex</p>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary recap inside modal */}
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-1.5">
                    <div className="flex justify-between text-gray-600">
                      <span>Delivering To:</span>
                      <span className="font-bold text-gray-900">{address.name} ({address.city})</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Slot:</span>
                      <span className="font-bold text-emerald-800">{deliverySlot}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-gray-900 pt-2 border-t border-stone-200">
                      <span>Total to Pay:</span>
                      <span className="text-emerald-800 text-base font-black">₹{finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('details')}
                      className="text-gray-500 hover:text-gray-800 font-bold text-xs"
                    >
                      ← Back to Address
                    </button>

                    <button
                      type="submit"
                      disabled={orderLoading}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center space-x-2"
                    >
                      {orderLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Placing Organic Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm & Place Harvest Order</span>
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;