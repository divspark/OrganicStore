import { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus, Heart, Share2, Truck, Shield, Leaf, Award, ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// interface ProductDetailProps {
//   onBack: () => void;
// }

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const product = {
    id: '1',
    name: 'Fresh Organic Carrots',
    price: 32.00,
    originalPrice: 46.00,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    category: 'Vegetables',
    sku: 'ORG-CAR-001',
    images: [
      'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Premium organic carrots grown without pesticides or chemicals. These vibrant orange carrots are packed with beta-carotene, vitamins, and minerals. Perfect for cooking, juicing, or eating raw as a healthy snack.',
    features: [
      '100% Certified Organic',
      'No Pesticides or Chemicals',
      'Rich in Beta-Carotene',
      'Fresh from Local Farms',
      'Eco-Friendly Packaging'
    ],
    nutritionFacts: {
      calories: '41 per 100g',
      carbs: '9.6g',
      fiber: '2.8g',
      sugar: '4.7g',
      protein: '0.9g',
      vitaminA: '184% DV'
    }
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const relatedProducts = [
    {
      id: '2',
      name: 'Red Hot Tomato',
      price: 25.00,
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Fresh Broccoli',
      price: 28.00,
      image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Green Spinach',
      price: 22.00,
      image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-6 right-6 bg-green-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                  -{discount}%
                </div>
              )}
              <div className="absolute top-6 left-6 flex space-x-2">
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative bg-white rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-green-500 shadow-lg' : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">{product.category}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-900">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">1.2k views</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 gap-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-6 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                  <div className="flex items-center bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-white rounded-full transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-semibold text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-white rounded-full transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-2">Total Price</div>
                  <div className="text-2xl font-bold text-green-600">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                <div className="text-xs text-gray-600">On orders $50+</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Secure Payment</div>
                <div className="text-xs text-gray-600">100% Protected</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Certified Organic</div>
                <div className="text-xs text-gray-600">USDA Approved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 mb-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-8">
              {['description', 'nutrition', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-6 font-medium capitalize transition-colors relative ${
                    activeTab === tab 
                      ? 'text-green-600 border-b-2 border-green-600' 
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{product.description}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h4>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>SKU:</span>
                        <span className="font-medium">{product.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">1 lb</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Origin:</span>
                        <span className="font-medium">Local Farms</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Storage Instructions</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Store in refrigerator</li>
                      <li>• Keep in vegetable crisper</li>
                      <li>• Use within 2 weeks</li>
                      <li>• Wash before consumption</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Nutrition Facts</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Per 100g Serving</h4>
                    <div className="space-y-3">
                      {Object.entries(product.nutritionFacts).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Health Benefits</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Rich in beta-carotene for eye health</li>
                      <li>• High fiber content aids digestion</li>
                      <li>• Antioxidants boost immune system</li>
                      <li>• Low calorie, nutrient-dense</li>
                      <li>• Supports healthy skin</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <div className="text-gray-600">{product.reviews} reviews</div>
                  </div>
                  <div className="col-span-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-3 mb-2">
                        <span className="text-sm text-gray-600 w-8">{stars}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{stars === 5 ? 87 : stars === 4 ? 25 : stars === 3 ? 6 : stars === 2 ? 4 : 2}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { name: 'Sarah Johnson', rating: 5, date: '2 days ago', comment: 'Amazing quality! The carrots are so fresh and sweet. Perfect for my family.' },
                    { name: 'Mike Chen', rating: 5, date: '1 week ago', comment: 'Best organic carrots I\'ve ever bought. Will definitely order again.' },
                    { name: 'Emma Davis', rating: 4, date: '2 weeks ago', comment: 'Good quality, though a bit pricey. But worth it for organic produce.' }
                  ].map((review, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{review.name}</div>
                            <div className="text-sm text-gray-600">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(relatedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{relatedProduct.name}</h4>
                  <div className="text-lg font-bold text-green-600">${relatedProduct.price.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;