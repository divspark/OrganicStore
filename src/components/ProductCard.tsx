import React, { useState, useEffect } from 'react';
import { Plus, Star, Check } from 'lucide-react';

interface ProductCardProps {
  productId: string;
  price: number;
  name: string;
  photo?: string;
  image?: string;
  stock?: number;
  category?: string;
  addToCart?: (productId: string) => void;
  onProductClick?: (productId: string) => void;
  rating?: number;
  originalPrice?: number;
  viewMode?: 'grid' | 'list';
}

const DEFAULT_FALLBACK_IMAGE = 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400';

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  price,
  name,
  photo,
  image,
  stock = 20,
  category,
  addToCart,
  onProductClick,
  rating = 4.8,
  originalPrice,
  viewMode = 'grid',
}) => {
  const [added, setAdded] = useState(false);
  // Use photo prop directly - caller is responsible for passing resolved URL
  const [imgSrc, setImgSrc] = useState<string>(photo || image || DEFAULT_FALLBACK_IMAGE);

  useEffect(() => {
    setImgSrc(photo || image || DEFAULT_FALLBACK_IMAGE);
  }, [photo, image]);

  const handleImageError = () => {
    setImgSrc(DEFAULT_FALLBACK_IMAGE);
  };

  const discount = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (addToCart && stock > 0) {
      addToCart(productId);
      setAdded(true);
      setTimeout(() => setAdded(false), 1200);
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleProductClick}
        className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-emerald-400 flex flex-col sm:flex-row items-center gap-4 cursor-pointer"
      >
        <div className="relative w-full sm:w-36 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
          <img 
            src={imgSrc || DEFAULT_FALLBACK_IMAGE} 
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            {category && (
              <span className="text-[11px] font-semibold text-emerald-700 capitalize">
                {category}
              </span>
            )}
            <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              {name}
            </h3>
            <div className="flex items-center space-x-1 text-amber-500 text-xs font-semibold mt-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-black text-gray-900">₹{price}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 shadow-sm ${
                stock === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : added
                  ? 'bg-emerald-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Simple, clean grid card with distinct shadow
  return (
    <div 
      onClick={handleProductClick}
      className="group bg-white rounded-2xl p-3.5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/80 hover:border-emerald-400 flex flex-col justify-between cursor-pointer w-full hover:-translate-y-1"
    >
      {/* Product Image */}
      <div>
        <div className="relative h-44 rounded-xl overflow-hidden bg-gray-50 mb-3 shadow-inner">
          <img 
            src={imgSrc || DEFAULT_FALLBACK_IMAGE} 
            alt={name}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            {category ? (
              <span className="text-[11px] font-medium text-gray-400 capitalize">
                {category}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-emerald-600">Organic</span>
            )}

            <div className="flex items-center space-x-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="font-bold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {name}
          </h3>
        </div>
      </div>

      {/* Price & Add to Cart CTA */}
      <div className="pt-3 mt-2 flex items-center justify-between border-t border-gray-100">
        <div className="flex items-baseline space-x-1.5">
          <span className="text-base font-black text-gray-900">₹{price}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1 shadow-xs ${
            stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : added
              ? 'bg-emerald-800 text-white'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md'
          }`}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>{stock > 0 ? 'Add' : 'Out'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;