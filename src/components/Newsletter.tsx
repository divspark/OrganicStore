import React, { useState } from 'react';
import { Mail, Send, Gift, Bell, Leaf } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const benefits = [
    {
      icon: Gift,
      title: 'Exclusive Deals',
      description: 'Get access to member-only discounts and special offers'
    },
    {
      icon: Bell,
      title: 'Early Access',
      description: 'Be the first to know about new products and seasonal items'
    },
    {
      icon: Leaf,
      title: 'Health Tips',
      description: 'Receive weekly tips on healthy living and organic nutrition'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
              <Mail className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stay Updated with Fresh Deals
            </h2>
            
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Subscribe to our newsletter and be the first to know about new products, 
              special offers, and healthy living tips delivered straight to your inbox.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="mb-16">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 rounded-full backdrop-blur-sm">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-8 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 bg-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <span>Subscribe Now</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-white/20 rounded-2xl p-8 backdrop-blur-sm max-w-lg mx-auto">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-green-100">You've successfully subscribed to our newsletter.</p>
              </div>
            )}

            <p className="text-sm text-green-100 mt-6">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-colors duration-300 backdrop-blur-sm">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-green-100 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-green-100 text-sm">Newsletter Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Weekly</div>
              <div className="text-green-100 text-sm">Fresh Updates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">30%</div>
              <div className="text-green-100 text-sm">Exclusive Discounts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-green-100 text-sm">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;