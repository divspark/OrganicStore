import React from 'react';
import { Plus, Star, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  productId: string;
  price: number;
  name: string;
  photo: string;
  stock: number;
  addToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  rating?: number;
  originalPrice?: number;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  price,
  name,
  photo,
  stock,
  addToCart,
  onProductClick,
  rating = 4.5,
  originalPrice,
  viewMode = 'grid',
}) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (addToCart) {
      addToCart(productId);
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleProductClick}
        className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex cursor-pointer"
      >
        <div className="relative w-32 h-32 bg-gray-50 flex-shrink-0">
          <img 
            src={photo} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              -{discount}%
            </div>
          )}
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              {name}
            </h3>

            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({rating})</span>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-lg font-bold text-gray-900">${price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`w-full py-2 px-4 rounded font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
              stock > 0 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span>{stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleProductClick}
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 hover-lift animate-bounce-in w-full max-w-sm mx-auto cursor-pointer"
    >
      {/* Image Container - Fixed Height */}
      <div className="relative h-48 bg-gray-50 overflow-hidden">
        <img 
          src={photo} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge - Always in same position */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )}

        {/* Quick Actions - Always in same position */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-2">
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content - Fixed Layout */}
      <div className="p-4 text-center">
        {/* Rating - Always same height */}
        <div className="flex items-center justify-center space-x-1 mb-3 h-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
        </div>

        {/* Product Name - Fixed height with line clamp */}
        <h3 className="text-sm font-medium text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight h-10 flex items-center justify-center line-clamp-2">
          {name}
        </h3>

        {/* Price - Always same layout */}
        <div className="flex items-center justify-center space-x-2 mb-4 h-6">
          <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button - Always same size */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-sm h-10 ${
            stock > 0 
              ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;