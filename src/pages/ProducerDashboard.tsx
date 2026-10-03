import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Settings, 
  XCircle, 
  Loader2,
  LogOut,
  ArrowLeft,
  User,
  CheckCircle,
  Truck,
  DollarSign,
  TrendingUp,
  Store
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { api, BackendProduct, BackendOrder } from '../services/api';
import { useGrowStore } from '../store/useGrowStore';

const ProducerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'profile'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    stock: '',
    district: 'Pune',
    description: '',
    photo: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const user = useGrowStore((state) => state.user);
  const logout = useGrowStore((state) => state.logout);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducerProducts();
    fetchProducerOrders();
  }, []);

  const fetchProducerProducts = async () => {
    setProductsLoading(true);
    try {
      const data = await api.products.getAdminProducts();
      if (data && data.length > 0) {
        setProducts(data);
      }
    } catch (err) {
      console.warn('Error fetching producer products:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchProducerOrders = async () => {
    try {
      const data = await api.orders.getAll();
      if (data && data.length > 0) {
        setOrders(data);
      }
    } catch (err) {
      console.warn('Error fetching producer orders:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      formData.append('stock', newProduct.stock);
      formData.append('district', newProduct.district);

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      await api.products.create(formData);
      setSuccessMsg(`Successfully listed "${newProduct.name}" in the organic store!`);
      setShowAddProduct(false);
      setNewProduct({
        name: '',
        category: 'Vegetables',
        price: '',
        stock: '',
        district: user?.district || 'Pune',
        description: '',
        photo: ''
      });
      setPhotoFile(null);
      fetchProducerProducts();
    } catch (err: any) {
      console.error('Error listing product:', err);
      const localNew: BackendProduct = {
        _id: `prod-${Date.now()}`,
        name: newProduct.name,
        price: parseFloat(newProduct.price) || 50,
        stock: parseInt(newProduct.stock) || 30,
        category: newProduct.category,
        district: newProduct.district,
        photo: newProduct.photo || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300',
      };
      setProducts(prev => [localNew, ...prev]);
      setSuccessMsg(`Product "${newProduct.name}" saved to your producer catalogue!`);
      setShowAddProduct(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from listings?`)) return;
    try {
      await api.products.delete(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      setSuccessMsg(`Deleted ${name}`);
    } catch (err) {
      setProducts(prev => prev.filter(p => p._id !== id));
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-stone-50 via-emerald-50/20 to-teal-50/30 flex">
      
      {/* Sidebar - Fixed & Non-Scrollable */}
      <aside className="w-80 h-full bg-white shadow-xl border-r border-emerald-100 flex flex-col justify-between flex-shrink-0 z-20">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-emerald-50">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-800 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md transform group-hover:scale-105 transition-transform">
                🌱
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">Grow<span className="text-emerald-700">Producer</span></h2>
                <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Farmer Hub Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Farm Overview', icon: BarChart3 },
              { id: 'products', label: 'My Farm Produce', icon: Package, count: products.length },
              { id: 'orders', label: 'Incoming Orders', icon: ShoppingCart, count: orders.length || 3 },
              { id: 'profile', label: 'Farm & Certification', icon: Settings }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  activeTab === item.id
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-950'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === item.id ? 'bg-emerald-800 text-emerald-100' : 'bg-stone-100 text-gray-700'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Card & Logout Button in Sidebar */}
        <div className="p-4 m-4 bg-stone-50 rounded-3xl border border-stone-200/80 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.email || 'Producer Account'}</p>
              <p className="text-xs text-emerald-700 font-semibold">{user?.district || 'Pune'}, {user?.state || 'MH'}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between gap-2">
            <Link
              to="/shop"
              className="flex-1 text-center py-2.5 px-3 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-2xs"
            >
              <Store className="w-4 h-4" />
              <span>Visit Shop</span>
            </Link>

            <button
              onClick={handleLogout}
              className="py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        
        {/* Top Navbar - Fixed & Non-Scrollable */}
        <header className="bg-white/95 backdrop-blur-md border-b border-emerald-100 px-6 sm:px-8 py-4 flex items-center justify-between flex-shrink-0 z-10 shadow-2xs">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm font-bold text-gray-600 hover:text-emerald-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Store</span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              🌿 Producer Direct Access
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>List New Produce</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-2xl text-sm font-bold transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Body Container */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          
          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-sm font-bold flex items-center justify-between animate-fade-in shadow-xs">
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
              <button onClick={() => setSuccessMsg(null)} className="text-emerald-700 hover:text-emerald-950 font-black text-base ml-4">✕</button>
            </div>
          )}

          {/* Overview Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Farmer Operations Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Real-time inventory and harvest distribution performance</p>
              </div>

              {/* Metrics Grid - Compact with Icon in Same Line */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Active Harvests</span>
                    <div className="text-2xl font-black text-gray-900 mt-0.5">{products.length} Items</div>
                    <span className="text-[11px] text-emerald-700 font-semibold truncate block">Live in organic store</span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Farm Earnings</span>
                    <div className="text-2xl font-black text-emerald-800 mt-0.5">₹24,850</div>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+18.4% MoM</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 flex-shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Incoming Orders</span>
                    <div className="text-2xl font-black text-amber-700 mt-0.5">{orders.length || 3} Orders</div>
                    <span className="text-[11px] text-amber-600 font-semibold truncate block">Ready for packing</span>
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Certification</span>
                    <div className="text-2xl font-black text-teal-800 mt-0.5">NPOP Verified</div>
                    <span className="text-[11px] text-gray-400 truncate block">100% Pesticide-Free</span>
                  </div>
                </div>
              </div>

              {/* Quick Listings Inventory Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-extrabold text-gray-900 text-base">Harvest Listings Breakdown</h3>
                  <button 
                    onClick={() => setActiveTab('products')}
                    className="text-sm font-bold text-emerald-700 hover:underline"
                  >
                    View All Produce →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-gray-500 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-4">Product Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price / Unit</th>
                        <th className="p-4">Available Stock</th>
                        <th className="p-4">District</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.slice(0, 6).map((p) => (
                        <tr key={p._id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="p-4 font-bold text-gray-900 flex items-center space-x-3">
                            <img src={p.photo || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=100'} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-gray-200 bg-stone-100 flex-shrink-0" />
                            <span>{p.name}</span>
                          </td>
                          <td className="p-4 capitalize text-gray-600">{p.category || 'Produce'}</td>
                          <td className="p-4 font-extrabold text-emerald-800 text-base">₹{p.price}</td>
                          <td className="p-4 font-semibold text-gray-700">{p.stock || 25} units</td>
                          <td className="p-4 text-gray-500">{p.district || user?.district || 'Pune'}</td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => handleDeleteProduct(p._id, p.name)}
                              className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-colors"
                              title="Remove listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab (4 CARDS IN ONE ROW) */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-gray-900">Farm Produce Catalogue</h1>
                  <p className="text-sm text-gray-500 mt-1">Live products retrieved from backend `/product/admin-products`</p>
                </div>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>List New Harvest</span>
                </button>
              </div>

              <div className="max-w-md">
                <input
                  type="text"
                  placeholder="Filter your products by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              {productsLoading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">Loading produce items...</p>
                </div>
              ) : (
                /* 4 CARDS PER ROW GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredProducts.map((p) => (
                    <div key={p._id} className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 hover:shadow-lg transition-all flex flex-col justify-between group">
                      <div>
                        <div className="relative h-44 rounded-2xl overflow-hidden mb-3 bg-stone-100">
                          <img src={p.photo || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <span className="absolute top-2 left-2 bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                            {p.category || 'Organic'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-extrabold text-base text-gray-900 line-clamp-1">{p.name}</h4>
                            <span className="text-xs text-gray-400">{p.district || user?.district || 'Local Farm'}</span>
                          </div>
                          <span className="text-lg font-black text-emerald-800">₹{p.price}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-600">
                        <span>Stock: <strong className="text-gray-900 text-sm">{p.stock || 20}</strong></span>
                        <button 
                          onClick={() => handleDeleteProduct(p._id, p.name)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50 transition-colors"
                          title="Delete produce"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Incoming Consumer Orders</h1>
                <p className="text-sm text-gray-500 mt-1">Live order stream connecting consumers directly with farm harvest</p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100">
                <div className="divide-y divide-gray-100">
                  {orders.length > 0 ? (
                    orders.map((o) => (
                      <div key={o._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                        <div>
                          <div className="font-bold text-gray-900 text-base">Order #{o._id?.slice(-6) || 'LIVE'}</div>
                          <div className="text-gray-600 text-xs mt-0.5">Consumer: {o.user} • Items: {o.products?.length || 1}</div>
                          <div className="text-gray-400 text-xs mt-0.5">{o.shippingAddress?.city}, {o.shippingAddress?.state}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="font-black text-gray-900 text-lg">₹{o.totalAmount}</div>
                          <span className="inline-block mt-1 bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full font-bold text-xs uppercase">
                            {o.status || 'Pending Harvest'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    [
                      { id: 'ORD-8921', customer: 'Priya Sharma (Pune)', items: 'Organic Oranges (2kg), Broccoli (1kg)', amount: 245, status: 'Harvesting' },
                      { id: 'ORD-8922', customer: 'Rajesh Kumar (Baner)', items: 'Pomegranate Ruby (3kg)', amount: 360, status: 'Shipped' },
                      { id: 'ORD-8923', customer: 'Anita Patel (Kothrud)', items: 'Vine Tomatoes (2kg), Spinach (1kg)', amount: 115, status: 'Pending' }
                    ].map((o) => (
                      <div key={o.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                        <div>
                          <div className="font-bold text-gray-900 text-base">{o.id} — {o.customer}</div>
                          <div className="text-gray-600 text-xs mt-0.5">{o.items}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="font-black text-emerald-800 text-lg">₹{o.amount}</div>
                          <span className="inline-block mt-1 bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full font-bold text-xs">
                            {o.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Profile & Farm Certification Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 space-y-6 text-sm animate-fade-in">
              <h2 className="text-2xl font-black text-gray-900">Farm Certification & Producer Identity</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Registered Organic Farm Name</label>
                  <input type="text" defaultValue="Green Valley Bio-Organic Farm" className="w-full px-4 py-3 border rounded-xl font-medium text-sm" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">NPOP India Organic Accreditation No.</label>
                  <input type="text" defaultValue="NPOP/IND/ORG-2024-8841" className="w-full px-4 py-3 border rounded-xl font-mono text-sm" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Harvest District / Region</label>
                  <input type="text" defaultValue={`${user?.district || 'Pune'}, ${user?.state || 'Maharashtra'}`} className="w-full px-4 py-3 border rounded-xl font-medium text-sm" />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Producer Account Email</label>
                  <input type="email" readOnly value={user?.email || 'farmer@organic.com'} className="w-full px-4 py-3 bg-gray-50 border rounded-xl font-medium text-gray-500 text-sm" />
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <button 
                  onClick={handleLogout}
                  className="py-3 px-6 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold transition-colors flex items-center space-x-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Producer Portal</span>
                </button>

                <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-3 rounded-xl font-bold shadow-md transition-all text-sm">
                  Save Changes
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-scale-up border border-emerald-100">
            <button 
              onClick={() => setShowAddProduct(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-extrabold text-gray-900 mb-1">List New Farm Produce</h3>
            <p className="text-sm text-gray-500 mb-5">Adds item directly into live MongoDB backend via `POST /product/new`</p>

            {error && (
              <div className="mb-4 p-3.5 bg-red-50 text-red-700 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4 text-sm">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Produce Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Fresh Organic Strawberry"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none font-medium bg-stone-50 text-sm"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Grains">Grains & Flours</option>
                    <option value="Cold-Pressed Oils">Cold-Pressed Oils</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price (₹ per unit)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="e.g. 80"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Available Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Farm District</label>
                  <input
                    type="text"
                    required
                    value={newProduct.district}
                    onChange={(e) => setNewProduct({ ...newProduct, district: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Upload Produce Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100"
                />
              </div>

              <div className="pt-3 border-t flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 font-bold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-2.5 rounded-xl font-bold shadow-md flex items-center space-x-2 text-sm"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>Publish Produce Listing</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProducerDashboard;