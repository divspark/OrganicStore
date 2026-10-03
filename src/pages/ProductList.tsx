import React, { useState, useEffect } from 'react';
import { Search, Grid, List, SlidersHorizontal, Loader2, ChevronDown, X, Leaf } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useGrowStore } from '../store/useGrowStore';
import { useNavigate } from 'react-router-dom';
import { api, BackendProduct, getProductImageUrl } from '../services/api';

interface ProductListProps {
  onProductClick?: (productId: string) => void;
}

const fallbackProducts: BackendProduct[] = [
  {
    _id: '66444359a5f6c05454972a74',
    name: 'Fresh Organic Valencia Orange',
    price: 90,
    photo: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
    stock: 150,
    category: 'Fruits',
  },
  {
    _id: '664d7d8418c9ac2336ff6b8b',
    name: 'Pomegranate Ruby Pearls (1kg)',
    price: 120,
    photo: 'https://rukminim2.flixcart.com/image/850/1000/ju1jqfk0/plant-sapling/k/q/9/vamsha-grafted-pomegranate-plant-001-1-vamsha-nature-care-original-imaff8d4frn3fghf.jpeg?q=20&crop=false',
    stock: 80,
    category: 'Fruits',
  },
  {
    _id: '664443b4a5f6c05454972a76',
    name: 'Organic Broccoli Florets',
    price: 65,
    photo: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 45,
    category: 'Vegetables',
  },
  {
    _id: '664443c0a5f6c05454972a78',
    name: 'Red Bell Sweet Pepper',
    price: 45,
    photo: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 60,
    category: 'Vegetables',
  },
  {
    _id: '664443d1a5f6c05454972a7a',
    name: 'Vine Ripe Heirloom Tomatoes',
    price: 40,
    photo: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 100,
    category: 'Vegetables',
  },
  {
    _id: '664443e2a5f6c05454972a7c',
    name: 'Farm Fresh Crunchy Carrots',
    price: 50,
    photo: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 85,
    category: 'Vegetables',
  },
  {
    _id: '664443f3a5f6c05454972a7e',
    name: 'Organic Baby Spinach Leaves',
    price: 35,
    photo: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
    stock: 40,
    category: 'Vegetables',
  },
  {
    _id: '664443f3a5f6c05454972a80',
    name: 'Cold Pressed Wild Mustard Oil (500ml)',
    price: 195,
    photo: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400',
    stock: 25,
    category: 'Oils',
  }
];

function normalizeProduct(p: any): BackendProduct {
  const photo = getProductImageUrl(p.photo || p);

  let cat = p.category ? String(p.category).trim() : 'Vegetables';
  if (/vegitab|vegetab/i.test(cat)) cat = 'Vegetables';
  else if (/fruit/i.test(cat)) cat = 'Fruits';
  else if (/grain/i.test(cat)) cat = 'Grains';
  else if (/herb/i.test(cat)) cat = 'Herbs';
  else if (/oil/i.test(cat)) cat = 'Oils';
  else if (/dairy/i.test(cat)) cat = 'Dairy';
  else if (cat) cat = cat.charAt(0).toUpperCase() + cat.slice(1);
  else cat = 'Vegetables';

  return {
    ...p,
    photo,
    category: cat,
  };
}

const ProductList: React.FC<ProductListProps> = ({ onProductClick }) => {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs', 'Oils']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState<boolean>(true);
  const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

  const addToCart = useGrowStore((state) => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [prodsRes, catsRes] = await Promise.allSettled([
        api.products.getAdminProducts(),
        api.products.getAllCategories()
      ]);

      if (prodsRes.status === 'fulfilled' && Array.isArray(prodsRes.value) && prodsRes.value.length > 0) {
        const normalizedProds = prodsRes.value.map(normalizeProduct);
        setProducts(normalizedProds);

        // Gather unique categories from live products
        const liveCats = Array.from(new Set(normalizedProds.map(p => p.category).filter(Boolean) as string[]));
        if (liveCats.length > 0) {
          setCategories(['All', ...liveCats]);
        }
      } else {
        setProducts(fallbackProducts.map(normalizeProduct));
      }

      if (catsRes.status === 'fulfilled' && catsRes.value?.categories && catsRes.value.categories.length > 0) {
        const cleaned = catsRes.value.categories
          .filter(Boolean)
          .map((c: string) => {
            if (/vegitab|vegetab/i.test(c)) return 'Vegetables';
            if (/fruit/i.test(c)) return 'Fruits';
            if (/grain/i.test(c)) return 'Grains';
            if (/herb/i.test(c)) return 'Herbs';
            if (/oil/i.test(c)) return 'Oils';
            if (/dairy/i.test(c)) return 'Dairy';
            return c.charAt(0).toUpperCase() + c.slice(1);
          });
        setCategories((prev) => Array.from(new Set([...prev, ...cleaned])));
      }
    } catch (err: any) {
      console.warn('Error fetching admin products from backend:', err?.message || err);
      setProducts(fallbackProducts.map(normalizeProduct));
    } finally {
      setLoading(false);
    }
  };

  const sortOptions = [
    { value: 'name', label: 'Name: A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const displayProducts = products.length > 0 ? products : fallbackProducts;

  // Filter and sort products
  const filteredProducts = displayProducts
    .filter((product) => {
      const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' ||
        (product.category || '').toLowerCase() === selectedCategory.toLowerCase();
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

  const handleProductClick = (id: string) => {
    if (onProductClick) {
      onProductClick(id);
    } else {
      navigate(`/product/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        
        {/* Top Header without heavy shadows */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-gray-200">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Certified Organic Harvest</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Farm Fresh Produce
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Explore handpicked organic vegetables, heirloom fruits, and cold-pressed staples.
              </p>
            </div>

            {/* Clean, unshadowed Search Bar */}
            <div className="w-full md:w-80 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search organic produce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Layout: Left Sidebar + Right Products Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filter (Clean border, subtle shadow) */}
          <div className="lg:w-60 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sticky top-24 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 text-sm tracking-wide">Filter Produce</h3>
                <button
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className={`space-y-6 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2.5 text-xs uppercase tracking-wider">
                    Categories
                  </h4>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${
                          selectedCategory.toLowerCase() === category.toLowerCase()
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-600 hover:bg-emerald-50/60 hover:text-emerald-800'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2.5 text-xs uppercase tracking-wider">
                    Price Range (₹)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <span className="text-gray-400 text-xs">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="text-[11px] text-gray-400">
                      ₹{priceRange[0]} to ₹{priceRange[1]}
                    </div>
                  </div>
                </div>

                {/* Reset Filters */}
                {(selectedCategory !== 'All' || searchTerm || priceRange[0] !== 0 || priceRange[1] !== 1000) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchTerm('');
                      setPriceRange([0, 1000]);
                    }}
                    className="w-full py-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 border border-emerald-200 hover:bg-emerald-50 rounded-xl transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Area: Products Grid (4 cards in one line on desktop) */}
          <div className="flex-1 min-w-0">
            {/* Clean Controls Bar */}
            <div className="flex items-center justify-between mb-6 pb-2">
              <div className="text-xs text-gray-500 font-medium">
                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span> fresh harvest items
              </div>

              <div className="flex items-center space-x-3">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-0.5 bg-white border border-gray-200 rounded-xl p-0.5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="Grid view"
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-800'
                    }`}
                    title="List view"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid: 4 cards in one line on desktop */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-200">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                <p className="text-xs font-medium text-gray-500">Loading produce...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    name={product.name}
                    price={product.price}
                    photo={product.photo}
                    stock={product.stock !== undefined ? product.stock : 25}
                    category={product.category}
                    addToCart={() => addToCart(product, 1)}
                    onProductClick={() => handleProductClick(product._id)}
                    rating={4.8}
                    originalPrice={Math.round(product.price * 1.2)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-600">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">No products found</h3>
                <p className="text-xs text-gray-500 mb-4">
                  No matching produce found for "{searchTerm || selectedCategory}".
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setPriceRange([0, 1000]);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductList;