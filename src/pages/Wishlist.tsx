import React, { useState } from 'react';
import { Heart, ShoppingCart, X, Star, ArrowLeft, Filter, Grid, List } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  stock: number;
  category: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Carrots Group Scal',
      price: 32.00,
      originalPrice: 46.00,
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      stock: 15,
      category: 'Vegetables'
    },
    {
      id: '2',
      name: 'Red Hot Tomato',
      price: 25.00,
      originalPrice: 38.00,
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      stock: 8,
      category: 'Vegetables'
    },
    {
      id: '3',
      name: 'Fresh Green Olive',
      price: 32.00,
      originalPrice: 46.00,
      image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      stock: 30,
      category: 'Fruits'
    },
    {
      id: '4',
      name: 'Organic Spinach',
      price: 22.00,
      originalPrice: 32.00,
      image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      stock: 35,
      category: 'Vegetables'
    }
  ]);

  const [viewMode, setViewMode] = useState('grid');

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (id: string) => {
    console.log(`Added item ${id} to cart`);
    // You can add cart logic here
  };

  const addAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item.id));
    console.log('Added all wishlist items to cart');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-3 text-green-600 hover:text-green-700 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Continue Shopping</span>
            </button>
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-red-500 fill-current" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-sm text-gray-600">{wishlistItems.length} items saved</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-16 h-16 text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Save your favorite organic products for later!</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
                </h2>
                <button
                  onClick={addAllToCart}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add All to Cart</span>
                </button>
                <button
                  onClick={clearWishlist}
                  className="text-red-600 hover:text-red-700 px-6 py-3 rounded-xl font-medium transition-colors border border-red-200 hover:border-red-300"
                >
                  Clear All
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2 bg-white rounded-xl p-2 border border-gray-200 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {wishlistItems.map((item) => (
                <div 
                  key={item.id}
                  className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative bg-gray-50 ${
                    viewMode === 'list' ? 'w-48 h-48' : 'h-48'
                  }`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    {item.originalPrice && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 left-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors group/btn"
                    >
                      <X className="w-5 h-5 text-gray-600 group-hover/btn:text-red-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      {/* Category */}
                      <div className="text-sm text-green-600 font-medium mb-2">{item.category}</div>
                      
                      {/* Name */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                        {item.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({item.rating})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="flex items-center space-x-2 mb-6">
                        <div className={`w-3 h-3 rounded-full ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-sm font-medium ${item.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() => addToCart(item.id)}
                        disabled={item.stock === 0}
                        className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                          item.stock > 0 
                            ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>{item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                      </button>
                      
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="w-full py-3 px-4 border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Heart className="w-5 h-5" />
                        <span>Remove from Wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="mt-16 bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: 'Fresh Bananas',
                    price: 18.00,
                    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=300',
                    rating: 4.4
                  },
                  {
                    name: 'Organic Milk',
                    price: 45.00,
                    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300',
                    rating: 4.8
                  },
                  {
                    name: 'Whole Wheat Bread',
                    price: 28.00,
                    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=300',
                    rating: 4.5
                  },
                  {
                    name: 'Fresh Herbs Mix',
                    price: 15.00,
                    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300',
                    rating: 4.7
                  }
                ].map((product, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="bg-gray-50 rounded-2xl overflow-hidden mb-4 group-hover:shadow-lg transition-shadow">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                      <div className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;