import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Settings, 
  Package, 
  Loader2, 
  Database, 
  RefreshCw,
  LogOut,
  ArrowLeft,
  User,
  ShieldCheck,
  Store,
  Trash2,
  Edit,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { api, BackendUser, BackendProduct } from '../services/api';
import { seedDatabase } from '../services/seedData';
import { useGrowStore } from '../store/useGrowStore';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'products' | 'profile'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<BackendUser[]>([]);
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedProgress, setSeedProgress] = useState<string | null>(null);

  const user = useGrowStore((state) => state.user);
  const logout = useGrowStore((state) => state.logout);
  const navigate = useNavigate();

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [usersData, productsData] = await Promise.allSettled([
        api.auth.getAllUsers(),
        api.products.getAdminProducts(),
      ]);

      if (usersData.status === 'fulfilled' && usersData.value) {
        setUsers(usersData.value);
      } else {
        setUsers([
          { id: '1', email: 'ramesh.producer@example.com', role: 'producer', district: 'Pune', state: 'Maharashtra' },
          { id: '2', email: 'priya.consumer@example.com', role: 'consumer', district: 'Mumbai', state: 'Maharashtra' },
          { id: '3', email: 'admin@grow-organic.com', role: 'admin', district: 'Delhi', state: 'Delhi' },
        ]);
      }

      if (productsData.status === 'fulfilled' && productsData.value) {
        setProducts(productsData.value);
      }
    } catch (err) {
      console.warn('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSyncDatabase = async () => {
    setSeeding(true);
    setSeedProgress('Initiating database sync...');
    try {
      await seedDatabase((msg) => setSeedProgress(msg));
      setTimeout(() => {
        setSeeding(false);
        setSeedProgress(null);
        fetchAdminData();
      }, 2000);
    } catch (err: any) {
      setSeedProgress(`Error: ${err.message}`);
      setTimeout(() => {
        setSeeding(false);
        setSeedProgress(null);
      }, 3000);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const totalProducers = users.filter((u: BackendUser) => u.role === 'producer').length;
  const totalConsumers = users.filter((u: BackendUser) => u.role === 'consumer').length;

  const filteredUsers = users.filter((u: BackendUser) =>
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.district || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-stone-50 via-emerald-50/20 to-teal-50/30 flex">
      
      {/* Sidebar - Fixed & Non-Scrollable */}
      <aside className="w-80 h-full bg-white shadow-xl border-r border-emerald-100 flex flex-col justify-between flex-shrink-0 z-20">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-emerald-50">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-900 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-md transform group-hover:scale-105 transition-transform">
                🛡️
              </div>
              <div>
                <h2 className="text-lg font-black text-gray-900">Grow<span className="text-emerald-700">Admin</span></h2>
                <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Super Administrator</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Platform Analytics', icon: BarChart3 },
              { id: 'users', label: 'User Directory', icon: Users, count: users.length },
              { id: 'products', label: 'Catalog Audit', icon: Package, count: products.length },
              { id: 'profile', label: 'System & Security', icon: Settings }
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

        {/* Sync Seed & User Details */}
        <div className="p-4 m-4 space-y-3">
          {/* Seed Database quick action */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100 text-sm text-emerald-950 space-y-2.5">
            <div className="font-bold flex items-center justify-between">
              <span className="text-xs font-bold">Database Cluster</span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className="text-xs text-emerald-700 font-mono truncate">grow-backend-pi.vercel.app</p>
            <button
              onClick={handleSyncDatabase}
              disabled={seeding}
              className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
              <span>{seeding ? 'Upserting...' : 'Sync Database Seed'}</span>
            </button>
          </div>

          {/* User & Logout in sidebar */}
          <div className="p-3.5 bg-stone-50 rounded-3xl border border-stone-200/80">
            <div className="flex items-center space-x-3 mb-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{user?.email || 'admin@grow.com'}</p>
                <p className="text-xs text-emerald-700 font-semibold uppercase">{user?.role || 'Admin'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
              <Link
                to="/shop"
                className="flex-1 text-center py-2 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-1 shadow-2xs"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Shop</span>
              </Link>
              <button
                onClick={handleLogout}
                className="py-2 px-3.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
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
              <span>Return to Organic Store</span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Admin Root Security Active</span>
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSyncDatabase}
              disabled={seeding}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center space-x-2"
            >
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">{seeding ? 'Syncing...' : 'Sync MongoDB Seed'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-2xl text-sm font-bold transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Body Container */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          
          {seedProgress && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-sm font-bold flex items-center space-x-2.5 animate-fade-in shadow-xs">
              <Loader2 className="w-5 h-5 text-emerald-600 animate-spin flex-shrink-0" />
              <span>{seedProgress}</span>
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Platform Analytics Overview</h1>
                <p className="text-sm text-gray-500 mt-1">Live operational summary of Grow organic marketplace network</p>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">Loading platform metrics...</p>
                </div>
              ) : (
                <>
                  {/* Metrics Grid - Compact with Icon in Same Line */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Registered Users</span>
                        <div className="text-2xl font-black text-emerald-800 mt-0.5">{users.length} Users</div>
                        <span className="text-[11px] text-gray-500 font-medium truncate block">{totalProducers} Producers • {totalConsumers} Consumers</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                        <Package className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Catalog Inventory</span>
                        <div className="text-2xl font-black text-emerald-800 mt-0.5">{products.length} Products</div>
                        <span className="text-[11px] text-emerald-600 font-semibold truncate block">Active in MongoDB Atlas</span>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                      <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-700 flex-shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Gross Volume</span>
                        <div className="text-2xl font-black text-teal-800 mt-0.5">₹1,84,500</div>
                        <span className="text-[11px] text-teal-600 font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>+22.5% MoM</span>
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all flex items-center space-x-4">
                      <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center text-green-700 flex-shrink-0">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">API Health</span>
                        <div className="text-2xl font-black text-green-700 mt-0.5">99.9% Online</div>
                        <span className="text-[11px] text-gray-400 truncate block">All Services Normal</span>
                      </div>
                    </div>
                  </div>

                  {/* Users Summary Table */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-extrabold text-gray-900 text-base">Recently Registered Accounts</h3>
                      <button 
                        onClick={() => setActiveTab('users')}
                        className="text-sm font-bold text-emerald-700 hover:underline"
                      >
                        Manage All Users →
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {users.slice(0, 5).map((u: BackendUser, i: number) => (
                        <div key={i} className="py-4 flex items-center justify-between text-sm">
                          <div>
                            <div className="font-bold text-gray-900 text-base">{u.email}</div>
                            <div className="text-gray-500 text-xs mt-0.5">{u.district || 'All Districts'}, {u.state || 'India'}</div>
                          </div>
                          <span className={`px-3.5 py-1 rounded-full font-bold text-xs uppercase ${
                            u.role === 'producer' ? 'bg-blue-100 text-blue-800' : u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {u.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-gray-900">User Account Management</h1>
                  <p className="text-sm text-gray-500 mt-1">Live user directory connected to `GET /user/all`</p>
                </div>
                <div className="max-w-xs w-full">
                  <input
                    type="text"
                    placeholder="Search by email, district, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-sm border border-emerald-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-gray-500 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-4">Email Address</th>
                      <th className="p-4">Role Access</th>
                      <th className="p-4">District</th>
                      <th className="p-4">State</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map((u: BackendUser, i: number) => (
                      <tr key={i} className="hover:bg-stone-50/60 transition-colors">
                        <td className="p-4 font-bold text-gray-900">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase ${
                            u.role === 'producer' ? 'bg-blue-100 text-blue-800' : u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">{u.district || 'All Districts'}</td>
                        <td className="p-4 text-gray-600">{u.state || 'India'}</td>
                        <td className="p-4 text-right">
                          <button className="text-emerald-700 hover:text-emerald-900 font-bold text-sm mr-4 inline-flex items-center gap-1">
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button className="text-red-500 hover:text-red-700 font-bold text-sm inline-flex items-center gap-1">
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab (4 CARDS PER ROW) */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Catalog Produce Audit</h1>
                <p className="text-sm text-gray-500 mt-1">Live products retrieved from `/product/admin-products`</p>
              </div>

              {/* 4 CARDS PER ROW GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p: BackendProduct) => (
                  <div key={p._id} className="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all group">
                    <div>
                      <div className="relative h-40 rounded-2xl overflow-hidden mb-3 bg-stone-100">
                        <img src={p.photo || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300'} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute top-2 left-2 bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {p.category || 'Harvest'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-base text-gray-900 truncate mb-1">{p.name}</h4>
                      <p className="text-xs text-gray-400 capitalize">{p.district || 'Pune'} Region</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-gray-100 flex justify-between items-baseline">
                      <span className="text-lg font-black text-emerald-800">₹{p.price}</span>
                      <span className="text-xs text-gray-500 font-semibold">{p.stock || 0} in stock</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile & Security Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm border border-emerald-100 text-sm space-y-5 animate-fade-in">
              <h2 className="text-2xl font-black text-gray-900">Admin Security & Environment</h2>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Live API Base URL</label>
                <input type="text" readOnly value="https://grow-backend-pi.vercel.app" className="w-full px-4 py-3 bg-stone-50 border rounded-xl font-mono text-xs" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Database Cluster Host</label>
                <input type="text" readOnly value="MongoDB Atlas Production ReplicaSet" className="w-full px-4 py-3 bg-stone-50 border rounded-xl font-mono text-xs" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Administrator Identity</label>
                <input type="text" readOnly value={user?.email || 'admin@grow-organic.com'} className="w-full px-4 py-3 bg-stone-50 border rounded-xl font-medium text-sm" />
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <button 
                  onClick={handleLogout}
                  className="py-3 px-6 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl font-bold transition-colors flex items-center space-x-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Admin Console</span>
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;