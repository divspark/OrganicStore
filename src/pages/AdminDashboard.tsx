import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Search, 
  Edit,
  Eye,
  Settings,
  UserCheck,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Package,
  ShoppingCart,
  X
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducer, setSelectedProducer] = useState<any>(null);
  const [showProducerModal, setShowProducerModal] = useState(false);

  // Mock data for admin
  const adminStats = {
    totalProducers: 156,
    activeProducers: 142,
    totalRevenue: 245680.50,
    platformProfit: 24568.05,
    totalProducts: 1248,
    totalOrders: 3456,
    monthlyGrowth: 12.5
  };

  const producers = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      farmName: 'Green Valley Organic Farm',
      email: 'ramesh.kumar@example.com',
      phone: '+91 98765 43210',
      state: 'Maharashtra',
      district: 'Pune',
      joinDate: '2023-06-15',
      totalProducts: 24,
      totalEarnings: 15420.50,
      rating: 4.7,
      status: 'active',
      address: 'Plot No. 123, Green Valley, Organic Farming Area, Pune, Maharashtra - 411001'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      farmName: 'Sunshine Organic Produce',
      email: 'priya.sharma@example.com',
      phone: '+91 87654 32109',
      state: 'Karnataka',
      district: 'Bangalore',
      joinDate: '2023-08-22',
      totalProducts: 18,
      totalEarnings: 12340.75,
      rating: 4.9,
      status: 'active',
      address: 'Farm House 456, Organic Lane, Bangalore, Karnataka - 560001'
    },
    {
      id: '3',
      name: 'Suresh Patel',
      farmName: 'Fresh Fields Farm',
      email: 'suresh.patel@example.com',
      phone: '+91 76543 21098',
      state: 'Gujarat',
      district: 'Ahmedabad',
      joinDate: '2023-04-10',
      totalProducts: 32,
      totalEarnings: 18750.25,
      rating: 4.5,
      status: 'inactive',
      address: 'Village Organic, Ahmedabad, Gujarat - 380001'
    }
  ];

  const filteredProducers = producers.filter(producer =>
    producer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producer.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProducer = (producer: any) => {
    setSelectedProducer(producer);
    setShowProducerModal(true);
  };

  const handleSaveProducer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving producer:', selectedProducer);
    setShowProducerModal(false);
    setSelectedProducer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-600">Platform Management</p>
            </div>
          </div>
        </div>

        <nav className="p-6 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'producers', label: 'Producers', icon: Users },
            { id: 'profile', label: 'Profile Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Platform overview and key metrics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm text-blue-600 font-medium">{adminStats.activeProducers} active</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{adminStats.totalProducers}</div>
                <div className="text-sm text-gray-600">Total Producers</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+{adminStats.monthlyGrowth}%</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">₹{adminStats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm text-purple-600 font-medium">10% commission</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">₹{adminStats.platformProfit.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Platform Profit</div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-sm text-orange-600 font-medium">{adminStats.totalOrders} orders</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{adminStats.totalProducts}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[18000, 22000, 25000, 28000, 32000, 35000, 38000, 42000, 45000, 48000, 52000, 55000].map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-blue-600 hover:to-blue-500"
                        style={{ height: `${(value / 55000) * 100}%` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Producer Growth */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Producer Growth</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#3b82f6"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(adminStats.activeProducers / adminStats.totalProducers) * 251.2} 251.2`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{Math.round((adminStats.activeProducers / adminStats.totalProducers) * 100)}%</div>
                        <div className="text-sm text-gray-600">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Vegetables', count: 456, color: 'bg-green-500' },
                    { name: 'Fruits', count: 324, color: 'bg-blue-500' },
                    { name: 'Herbs', count: 168, color: 'bg-purple-500' }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top States</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Maharashtra', count: 45 },
                    { name: 'Karnataka', count: 38 },
                    { name: 'Gujarat', count: 32 }
                  ].map((state, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-700">{state.name}</span>
                      <span className="font-medium text-gray-900">{state.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'New producer joined', time: '2 hours ago' },
                    { action: 'Product approved', time: '4 hours ago' },
                    { action: 'Order completed', time: '6 hours ago' }
                  ].map((activity, index) => (
                    <div key={index} className="text-sm">
                      <div className="text-gray-900">{activity.action}</div>
                      <div className="text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Producers Tab */}
        {activeTab === 'producers' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Producers Management</h1>
              <p className="text-gray-600">Manage all registered producers on the platform</p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search producers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Producers Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Producer</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Farm Name</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Products</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Earnings</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Rating</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducers.map((producer) => (
                      <tr key={producer.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {producer.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{producer.name}</div>
                              <div className="text-sm text-gray-600">{producer.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">{producer.farmName}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">{producer.district}, {producer.state}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">{producer.totalProducts}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-medium text-gray-900">₹{producer.totalEarnings.toLocaleString()}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-900">{producer.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            producer.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {producer.status.charAt(0).toUpperCase() + producer.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditProducer(producer)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Producer Edit Modal */}
            {showProducerModal && selectedProducer && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Producer Details</h2>
                    <button
                      onClick={() => setShowProducerModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProducer} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={selectedProducer.name}
                          onChange={(e) => setSelectedProducer({...selectedProducer, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name</label>
                        <input
                          type="text"
                          value={selectedProducer.farmName}
                          onChange={(e) => setSelectedProducer({...selectedProducer, farmName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={selectedProducer.email}
                          onChange={(e) => setSelectedProducer({...selectedProducer, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={selectedProducer.phone}
                          onChange={(e) => setSelectedProducer({...selectedProducer, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <select
                          value={selectedProducer.state}
                          onChange={(e) => setSelectedProducer({...selectedProducer, state: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <input
                          type="text"
                          value={selectedProducer.district}
                          onChange={(e) => setSelectedProducer({...selectedProducer, district: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <textarea
                        rows={3}
                        value={selectedProducer.address}
                        onChange={(e) => setSelectedProducer({...selectedProducer, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedProducer.status}
                        onChange={(e) => setSelectedProducer({...selectedProducer, status: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowProducerModal(false)}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-medium transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Profile Settings</h1>
              <p className="text-gray-600">Manage your admin account information</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Admin User"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="admin@organic.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 99999 99999"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <input
                      type="text"
                      defaultValue="Super Admin"
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    defaultValue="Platform Management"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;