import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Tag, Heart, Share2, Eye } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Health Tips', 'Recipes', 'Farming', 'Nutrition', 'Lifestyle'];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: '10 Amazing Health Benefits of Organic Vegetables',
      excerpt: 'Discover why organic vegetables are not just better for the environment, but also provide superior nutrition and health benefits for your family.',
      content: 'Full article content here...',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      readTime: '5 min read',
      category: 'Health Tips',
      tags: ['organic', 'health', 'vegetables', 'nutrition'],
      views: 1250,
      likes: 89
    },
    {
      id: '2',
      title: 'Farm-to-Table: The Journey of Your Organic Produce',
      excerpt: 'Follow the incredible journey of organic produce from our certified farms to your dinner table, ensuring maximum freshness and quality.',
      content: 'Full article content here...',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Mike Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      category: 'Farming',
      tags: ['farm-to-table', 'organic', 'farming', 'quality'],
      views: 980,
      likes: 67
    },
    {
      id: '3',
      title: 'Delicious Organic Smoothie Recipes for Every Season',
      excerpt: 'Boost your energy and nutrition with these amazing organic smoothie recipes using fresh, seasonal ingredients.',
      content: 'Full article content here...',
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Emma Davis',
      date: '2024-01-10',
      readTime: '4 min read',
      category: 'Recipes',
      tags: ['smoothies', 'recipes', 'healthy', 'seasonal'],
      views: 1450,
      likes: 112
    },
    {
      id: '4',
      title: 'Understanding Organic Certification: What It Really Means',
      excerpt: 'Learn about the rigorous standards and processes behind organic certification and why it matters for your health and the environment.',
      content: 'Full article content here...',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Dr. Robert Wilson',
      date: '2024-01-08',
      readTime: '6 min read',
      category: 'Health Tips',
      tags: ['certification', 'organic', 'standards', 'environment'],
      views: 890,
      likes: 54
    },
    {
      id: '5',
      title: 'Seasonal Eating: Why Local and Organic Matters',
      excerpt: 'Discover the benefits of eating seasonally with local organic produce and how it can improve your health and support local farmers.',
      content: 'Full article content here...',
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Lisa Thompson',
      date: '2024-01-05',
      readTime: '5 min read',
      category: 'Lifestyle',
      tags: ['seasonal', 'local', 'organic', 'farmers'],
      views: 1120,
      likes: 78
    },
    {
      id: '6',
      title: 'The Complete Guide to Organic Meal Planning',
      excerpt: 'Master the art of organic meal planning with our comprehensive guide, including tips, recipes, and shopping strategies.',
      content: 'Full article content here...',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800',
      author: 'Chef Maria Rodriguez',
      date: '2024-01-03',
      readTime: '8 min read',
      category: 'Recipes',
      tags: ['meal-planning', 'organic', 'recipes', 'nutrition'],
      views: 1680,
      likes: 134
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Organic Living Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the latest insights on organic living, healthy recipes, farming practices, 
              and tips for a more sustainable lifestyle.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Article */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <User className="w-4 h-4 mr-2" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 shadow-sm hover:shadow-md border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.slice(1).map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-green-600">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 group/btn">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-medium hover:bg-green-100 hover:text-green-600 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Our Blog</h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles on organic living, healthy recipes, and sustainable farming 
            delivered straight to your inbox.
          </p>
          <div className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;