import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Star, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Fresh & Healthy',
      subtitle: 'Organic Food',
      description: 'Discover premium organic produce sourced directly from certified farms. Pure, fresh, and delivered to your doorstep with love and care.',
      buttonText: 'Shop Now',
      offer: 'Up to 30% Off'
    },
    {
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Farm Fresh',
      subtitle: 'Vegetables',
      description: 'Get the freshest vegetables straight from our partner farms. No chemicals, no pesticides, just pure natural goodness.',
      buttonText: 'Explore',
      offer: 'Free Delivery'
    },
    {
      image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Organic',
      subtitle: 'Fruits',
      description: 'Enjoy the sweetest, most nutritious fruits picked at perfect ripeness. Taste the difference of organic farming.',
      buttonText: 'Order Now',
      offer: 'Best Quality'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  {/* Offer Badge */}
                  <div className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-full mb-6 animate-pulse-glow">
                    <Leaf className="w-5 h-5" />
                    <span className="text-sm font-semibold">{slide.offer}</span>
                  </div>
                  
                  {/* Main Heading */}
                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-slide-in-left">
                    {slide.title}
                    <span className="text-green-400 block">
                      {slide.subtitle}
                    </span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg animate-slide-in-right">
                    {slide.description}
                  </p>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3">
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg">
                      Learn More
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-6 h-6 text-green-400" />
                      <span className="text-sm font-medium text-white">Certified Organic</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-white">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-green-400 w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Floating Stats */}
      <div className="absolute bottom-20 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl z-20 hidden lg:block">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">15K+</div>
          <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
          <div className="flex items-center justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;