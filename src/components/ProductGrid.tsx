import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Grid, List, Leaf } from 'lucide-react';

interface ProductGridProps {
  onProductClick?: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Grains'];

  const products = [
    {
      productId: '1',
      name: 'Carrots Group Scal',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 15,
      category: 'Vegetables',
      rating: 4.8,
      originalPrice: 46.00
    },
    {
      productId: '2',
      name: 'Red Hot Tomato',
      price: 25.00,
      photo: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 8,
      category: 'Vegetables',
      rating: 4.9,
      originalPrice: 38.00
    },
    {
      productId: '3',
      name: 'Broccoli Sliced Mix',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 12,
      category: 'Vegetables',
      rating: 4.7,
      originalPrice: 46.00
    },
    {
      productId: '4',
      name: 'Orange Sliced Mix',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 25,
      category: 'Fruits',
      rating: 4.8,
      originalPrice: 46.00
    },
    {
      productId: '5',
      name: 'Sliced Red Apple',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 18,
      category: 'Fruits',
      rating: 4.7,
      originalPrice: 46.00
    },
    {
      productId: '6',
      name: 'Fresh Green Olive',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 30,
      category: 'Fruits',
      rating: 4.9,
      originalPrice: 46.00
    },
    {
      productId: '7',
      name: 'Yellow Orange Mix',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 14,
      category: 'Fruits',
      rating: 4.5,
      originalPrice: 46.00
    },
    {
      productId: '8',
      name: 'Fresh Juice Pack',
      price: 32.00,
      photo: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 20,
      category: 'Beverages',
      rating: 4.6,
      originalPrice: 46.00
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <Leaf className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Our Products</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A highly efficient slip-ring scanner for today's diagnostic requirements.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-6 lg:space-y-0">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 shadow-sm hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-white rounded-full p-2 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center' 
            : 'grid-cols-1 lg:grid-cols-2'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.productId}
              productId={product.productId}
              name={product.name}
              price={product.price}
              photo={product.photo}
              stock={product.stock}
              addToCart={handleAddToCart}
              onProductClick={onProductClick}
              rating={product.rating}
              originalPrice={product.originalPrice}
              // viewMode={viewMode}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;