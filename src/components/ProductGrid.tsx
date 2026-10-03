import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Grid, List, Leaf, Loader2, Sparkles } from 'lucide-react';
import { useGrowStore } from '../store/useGrowStore';
import { useNavigate } from 'react-router-dom';
import { BackendProduct } from '../services/api';

interface ProductGridProps {
  onProductClick?: (productId: string) => void;
}

const fallbackProducts: BackendProduct[] = [
  {
    _id: '66444359a5f6c05454972a74',
    name: 'Fresh Organic Orange',
    price: 90,
    photo: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
    stock: 150,
    category: 'fruits',
  },
  {
    _id: '664d7d8418c9ac2336ff6b8b',
    name: 'Pomegranate Ruby',
    price: 120,
    photo: 'https://rukminim2.flixcart.com/image/850/1000/ju1jqfk0/plant-sapling/k/q/9/vamsha-grafted-pomegranate-plant-001-1-vamsha-nature-care-original-imaff8d4frn3fghf.jpeg?q=20&crop=false',
    stock: 80,
    category: 'fruits',
  },
  {
    _id: '664443b4a5f6c05454972a76',
    name: 'Organic Broccoli Florets',
    price: 65,
    photo: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 45,
    category: 'Vegitable',
  },
  {
    _id: '664443c0a5f6c05454972a78',
    name: 'Red Bell Pepper',
    price: 45,
    photo: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 60,
    category: 'Vegitable',
  },
  {
    _id: '664443d1a5f6c05454972a7a',
    name: 'Vine Ripe Tomatoes',
    price: 40,
    photo: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 100,
    category: 'Vegitable',
  },
  {
    _id: '664443e2a5f6c05454972a7c',
    name: 'Farm Fresh Carrots',
    price: 50,
    photo: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 85,
    category: 'Vegitable',
  }
];

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Zustand Store
  const latestProducts = useGrowStore((state) => state.latestProducts);
  const products = useGrowStore((state) => state.products);
  const categories = useGrowStore((state) => state.categories);
  const selectedCategory = useGrowStore((state) => state.selectedCategory);
  const setSelectedCategory = useGrowStore((state) => state.setSelectedCategory);
  const loading = useGrowStore((state) => state.loadingProducts);
  const fetchLatestProducts = useGrowStore((state) => state.fetchLatestProducts);
  const fetchCategories = useGrowStore((state) => state.fetchCategories);
  const addToCart = useGrowStore((state) => state.addToCart);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestProducts();
    fetchCategories();
  }, [fetchLatestProducts, fetchCategories]);

  const displayProducts = (latestProducts.length > 0 ? latestProducts : (products.length > 0 ? products : fallbackProducts));

  const filteredProducts = selectedCategory === 'All'
    ? displayProducts
    : displayProducts.filter(product => (product.category || '').toLowerCase() === selectedCategory.toLowerCase());

  const handleProductClick = (productId: string) => {
    if (onProductClick) {
      onProductClick(productId);
    } else {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-green-700 mb-3">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold uppercase tracking-wider">Fresh From Our Verified Farms</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
              <Sparkles className="w-3 h-3 mr-1" /> Live Zustand Store
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Featured Organic Produce
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            100% naturally grown produce without chemical pesticides or synthetic fertilizers. Harvested daily for unmatched freshness.
          </p>
        </div>

        {/* Category Filter & View Mode Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-800 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:text-green-600'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Grid / Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-3" />
            <p className="text-sm font-medium">Fetching fresh produce from Grow API...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Leaf className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">No products found</h3>
            <p className="text-sm text-gray-500">Try selecting another category or check back soon.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" 
            : "space-y-4 max-w-4xl mx-auto"
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                photo={product.photo}
                stock={product.stock !== undefined ? product.stock : 25}
                rating={4.8}
                originalPrice={Math.round(product.price * 1.25)}
                viewMode={viewMode}
                onProductClick={() => handleProductClick(product._id)}
                addToCart={() => addToCart(product, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;