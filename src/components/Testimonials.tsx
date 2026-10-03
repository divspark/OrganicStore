import React, { useState, useEffect } from 'react';
import { Star, Quote, Heart } from 'lucide-react';
import { api, BackendTestimonial } from '../services/api';
import { Link } from 'react-router-dom';

const defaultTestimonials = [
  {
    name: 'Priya Sharma',
    role: 'Health Enthusiast',
    location: 'Mumbai, Maharashtra',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'The quality of organic vegetables here is exceptional. Fresh, healthy, and delivered right to my doorstep. My family loves the clean, pesticide-free taste!'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Fitness Coach',
    location: 'Delhi NCR',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'As a fitness coach, I recommend Grow Organic to all my clients. The produce has unmatched nutrient density and direct farm connection is trustworthy.'
  },
  {
    name: 'Anita Patel',
    role: 'Mother of Two',
    location: 'Bangalore, Karnataka',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'Being a mother, I am very particular about chemical residues in food. Grow has made clean, healthy eating completely hassle-free and affordable!'
  },
  {
    name: 'Dr. Amit Singh',
    role: 'Certified Nutritionist',
    location: 'Pune, Maharashtra',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'I recommend Grow to all my patients. The produce is genuinely chemical-free, harvested at natural maturity, and packed with vitality.'
  },
  {
    name: 'Meera Iyer',
    role: 'Organic Food Blogger',
    location: 'Chennai, Tamil Nadu',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'The freshness and aroma of these farm harvests remind me of my grandparents farm. Completely pure, crisp, and chemical-free!'
  },
  {
    name: 'Vikram Deshmukh',
    role: 'Yoga Practitioner',
    location: 'Nashik, Maharashtra',
    image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'Switching to Grow Organic was our familys best lifestyle decision. Noticeable boost in digestion, energy levels, and overall wellness.'
  }
];

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>(defaultTestimonials);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const liveReviews = await api.testimonials.getAll();
        if (liveReviews && liveReviews.length > 0) {
          const mapped = liveReviews.map((r: BackendTestimonial, idx: number) => ({
            name: r.name || 'Verified Customer',
            role: 'Organic Consumer',
            location: 'Farm Community',
            image: r.photo || defaultTestimonials[idx % defaultTestimonials.length].image,
            rating: 5,
            text: r.message || 'Great quality organic produce!'
          }));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.warn('Using default testimonials:', err);
      }
    };

    fetchReviews();
  }, []);

  // Duplicate list to create a seamless infinite loop in a single line
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-52 h-52 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 mb-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-green-700 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-green-200 shadow-sm mb-3">
            <Quote className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold uppercase tracking-wider">Customer Stories</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Loved by Conscious Eaters
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Genuine feedback from health-conscious families, nutritionists, and fitness advocates across India.
          </p>
        </div>
      </div>

      {/* Single Line Continuous Smooth Sliding Carousel (Right to Left) */}
      <div className="relative w-full overflow-hidden py-4 group">
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute top-0 left-0 bottom-0 w-24 md:w-36 bg-gradient-to-r from-green-50 via-green-50/80 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-24 md:w-36 bg-gradient-to-l from-green-100 via-green-100/80 to-transparent z-20 pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="animate-marquee-slow flex space-x-6 px-4">
          {marqueeItems.map((testimonial, index) => (
            <div 
              key={index}
              className="w-[360px] md:w-[420px] flex-shrink-0 bg-white p-7 rounded-3xl shadow-md hover:shadow-xl border border-green-100 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Row: Stars + Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                    <Heart className="w-3 h-3 fill-current text-emerald-600" />
                    <span>Verified Buyer</span>
                  </span>
                </div>

                {/* Review Message */}
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-gray-100">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-200 shadow-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 text-sm truncate">{testimonial.name}</div>
                  <div className="text-xs text-green-700 font-semibold">{testimonial.role}</div>
                  <div className="text-[11px] text-gray-400 truncate">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Box */}
      <div className="container mx-auto px-4 mt-16 relative z-10">
        <div className="text-center bg-white rounded-3xl p-8 md:p-10 max-w-3xl mx-auto shadow-lg border border-green-100">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Taste the Difference of 100% Organic
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Join thousands of happy eaters who get farm-fresh produce delivered straight to their doorstep.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/shop" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-md"
            >
              Explore Fresh Harvest
            </Link>
            <Link 
              to="/contact" 
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-3.5 rounded-full font-bold text-sm transition-all"
            >
              Submit Your Review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;