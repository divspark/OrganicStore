import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Plus, Minus, Heart, Share2, Truck, Shield, Leaf, Award, ShoppingCart, Eye, Check, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { api, BackendProduct } from '../services/api';
import { useGrowStore } from '../store/useGrowStore';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToast, setAddedToast] = useState(false);
  
  const navigate = useNavigate();
  const addToCart = useGrowStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await api.products.getById(id);
          setProduct(data);
        }
      } catch (err) {
        console.warn('Could not fetch single product by id, using fallback info:', err);
        // Fallback default
        setProduct({
          _id: id || '66444359a5f6c05454972a74',
          name: 'Fresh Organic Produce',
          price: 90,
          photo: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
          stock: 50,
          category: 'Vegetables',
          district: 'Farm District',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Loading organic product details...</p>
        </div>
      </div>
    );
  }

  const currentProduct = product || {
    _id: '1',
    name: 'Fresh Organic Produce',
    price: 90,
    photo: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
    stock: 20,
    category: 'Vegetables',
  };

  const images = [
    currentProduct.photo || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
  ];

  const originalPrice = Math.round(currentProduct.price * 1.25);
  const discount = Math.round(((originalPrice - currentProduct.price) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header Bar */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors group font-semibold text-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </button>
          
          {addedToast && (
            <div className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold animate-bounce">
              <Check className="w-3.5 h-3.5" />
              <span>Added to your cart!</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <img 
                src={images[selectedImage]} 
                alt={currentProduct.name}
                className="w-full h-96 object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-green-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
                  -{discount}% OFF
                </div>
              )}
              <div className="absolute top-6 left-6 flex space-x-2">
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white text-gray-700 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white text-gray-700 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative bg-white rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-green-600 shadow-md' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-green-700 mb-2">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-xs font-bold uppercase tracking-wider bg-green-100 px-2.5 py-0.5 rounded-full">
                  {currentProduct.category || 'Organic Harvest'}
                </span>
                {currentProduct.district && (
                  <span className="text-xs text-gray-500 font-medium">From {currentProduct.district}</span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">{currentProduct.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">4.9</span>
                <span className="text-xs text-gray-500">(140 verified farm reviews)</span>
                <div className="flex items-center space-x-1 text-emerald-600 text-xs font-medium">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Harvested this week</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-extrabold text-green-700">₹{currentProduct.price}</span>
                <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                  Save ₹{originalPrice - currentProduct.price}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div className={`w-2.5 h-2.5 rounded-full ${(currentProduct.stock || 20) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium text-green-700">
                  {(currentProduct.stock || 20) > 0 ? `In Stock (${currentProduct.stock || 20} available)` : 'Currently Out of Stock'}
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Purity & Assurance</h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>100% Organically Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>No Artificial Pesticides</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Direct Farm Fair-Trade</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Biodegradable Packaging</span>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center space-x-6 mb-6">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-2 block uppercase">Quantity (kg/units)</label>
                  <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-white rounded-full transition-all"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900 text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-green-700 hover:bg-white rounded-full transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">Total Subtotal</div>
                  <div className="text-2xl font-black text-green-700">
                    ₹{(currentProduct.price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white py-3.5 rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <Truck className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-gray-900">Same-Day Harvest</div>
                <div className="text-[10px] text-gray-500">Fast delivery</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <Shield className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-gray-900">Quality Verified</div>
                <div className="text-[10px] text-gray-500">100% Organic</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                <Award className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-xs font-bold text-gray-900">Direct Farm Price</div>
                <div className="text-[10px] text-gray-500">Zero middlemen</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-16 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {['description', 'nutrition', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-5 font-bold text-sm capitalize transition-colors relative ${
                    activeTab === tab 
                      ? 'text-green-700 border-b-2 border-green-600' 
                      : 'text-gray-500 hover:text-green-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 text-sm text-gray-700">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Naturally cultivated {currentProduct.name} harvested from pesticide-free organic farms. 
                  Packed with natural vitamins, minerals, and rich organic taste.
                </p>
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Specifications</h4>
                    <p className="text-xs text-gray-600 mb-1"><strong>Category:</strong> {currentProduct.category || 'Fresh Goods'}</p>
                    <p className="text-xs text-gray-600 mb-1"><strong>Origin District:</strong> {currentProduct.district || 'Organic Co-op'}</p>
                    <p className="text-xs text-gray-600"><strong>Storage:</strong> Keep in a cool, dry place or refrigerated</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Growing Standards</h4>
                    <p className="text-xs text-gray-600">Grown strictly using composted soil, biological pest management, and pure groundwater irrigation.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                  <h4 className="font-bold text-green-900 mb-3">Estimated Nutritional Highlights (Per 100g)</h4>
                  <ul className="space-y-2 text-xs text-green-800">
                    <li className="flex justify-between"><span>Dietary Fiber</span><span className="font-bold">2.8 g</span></li>
                    <li className="flex justify-between"><span>Vitamins & Antioxidants</span><span className="font-bold">High</span></li>
                    <li className="flex justify-between"><span>Total Sugars</span><span className="font-bold">Natural Fruit Sugars</span></li>
                    <li className="flex justify-between"><span>Artificial Additives</span><span className="font-bold">0.0 g</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Health Benefits</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Organic vegetables and fruits contain significantly higher levels of antioxidants and zero harmful pesticide residues compared to conventionally farmed produce.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <h4 className="font-bold text-gray-900">Verified Consumer Feedback</h4>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">100% Genuine Buyers</span>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-gray-900">Arun Mehta</span>
                      <span className="text-[10px] text-gray-400">3 days ago</span>
                    </div>
                    <div className="flex text-yellow-400 text-xs mb-1">★★★★★</div>
                    <p className="text-xs text-gray-600">The quality and freshness are remarkable! Tastes authentic and sweet just like from the village farm.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;