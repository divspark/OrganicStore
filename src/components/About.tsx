import React from 'react';
import { Users, Award, Leaf, Heart, Truck, Shield } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Users, number: '15,000+', label: 'Happy Customers', color: 'text-blue-600' },
    { icon: Award, number: '50+', label: 'Awards Won', color: 'text-yellow-600' },
    { icon: Leaf, number: '500+', label: 'Organic Products', color: 'text-green-600' },
    { icon: Heart, number: '100%', label: 'Customer Satisfaction', color: 'text-red-600' }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Organic & Natural',
      description: 'All our products are certified organic, free from harmful chemicals and pesticides.'
    },
    {
      icon: Truck,
      title: 'Farm to Table',
      description: 'Direct sourcing from local farms ensures maximum freshness and quality.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Rigorous quality testing and certification for every product we offer.'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-green-600">
                <Leaf className="w-6 h-6" />
                <span className="text-sm font-semibold uppercase tracking-wider">About Our Story</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                We Provide Healthy Food For Your Family
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Our journey began with a simple mission: to make organic, healthy food accessible 
                to everyone. We work directly with local farmers who share our commitment to 
                sustainable, chemical-free farming practices.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Every product in our store is carefully selected and tested to ensure it meets 
                our high standards for quality, freshness, and nutritional value. We believe 
                that good food is the foundation of a healthy life.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Learn More About Us
            </button>
          </div>

          {/* Right Content - Images & Stats */}
          <div className="relative">
            {/* Main Image Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img 
                  src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Fresh Vegetables"
                  className="w-full h-56 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                />
                <img 
                  src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Organic Farming"
                  className="w-full h-72 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-6 pt-12">
                <img 
                  src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Fresh Fruits"
                  className="w-full h-72 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                />
                <img 
                  src="https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Organic Produce"
                  className="w-full h-56 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border-4 border-green-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">20+</div>
                <div className="text-sm text-gray-600 font-medium">Years Experience</div>
              </div>
            </div>

            {/* Floating Organic Badge */}
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl shadow-2xl">
              <div className="flex items-center space-x-3">
                <Leaf className="w-8 h-8" />
                <div>
                  <div className="font-bold text-lg">100% Organic</div>
                  <div className="text-sm opacity-90">Certified Fresh</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 ${stat.color} bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;