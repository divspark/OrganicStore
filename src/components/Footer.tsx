import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Leaf, Clock, CreditCard, Truck } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const categories = [
    { name: 'Fresh Fruits', href: '#' },
    { name: 'Vegetables', href: '#' },
    { name: 'Dairy Products', href: '#' },
    { name: 'Grains & Cereals', href: '#' },
    { name: 'Herbs & Spices', href: '#' },
    { name: 'Beverages', href: '#' }
  ];

  const customerService = [
    { name: 'Help Center', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Track Order', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Gift Cards', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Youtube, href: '#', color: 'hover:text-red-500' }
  ];

  const paymentMethods = [
    'Visa', 'Mastercard', 'PayPal', 'UPI', 'Razorpay'
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-emerald-300 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold">Organic</span>
                <div className="text-sm text-green-400 -mt-1">Fresh & Natural</div>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-lg max-w-md">
              Your trusted source for fresh, organic, and healthy food products. 
              We're committed to bringing you the finest quality produce from 
              certified organic farms across the country.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400">
                  123 Organic Street, Green Valley,<br />
                  Mumbai, Maharashtra 400001
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400">+91 98765 43210</div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="text-gray-400">info@organic.com</div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={`w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white">Categories</h3>
            <ul className="space-y-4">
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.href} 
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-white">Customer Service</h3>
            <ul className="space-y-4 mb-8">
              {customerService.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href} 
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Store Hours */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-green-400" />
                <div className="font-semibold text-white">Store Hours</div>
              </div>
              <div className="text-sm text-gray-400 space-y-1">
                <div>Mon - Sat: 8:00 AM - 10:00 PM</div>
                <div>Sunday: 9:00 AM - 8:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-16 pt-12 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Free Shipping</div>
                <div className="text-sm text-gray-400">On orders over ₹500</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Secure Payment</div>
                <div className="text-sm text-gray-400">100% protected</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">100% Organic</div>
                <div className="text-sm text-gray-400">Certified fresh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="text-gray-400 text-center lg:text-left">
              © 2024 Organic Store. All rights reserved. Made with ❤️ for healthy living.
            </div>
            
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Payment Methods */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">We Accept:</span>
                <div className="flex space-x-3">
                  {/* Visa */}
                  <div className="bg-white rounded-lg p-2 w-12 h-8 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 40 24" className="w-8 h-5">
                      <path fill="#1A1F71" d="M18.5 8.5l-2.8 7h-1.7l-1.4-5.4c-.1-.4-.2-.5-.5-.7-.5-.3-1.3-.6-2-.8l.1-.1h3.4c.4 0 .8.3.9.7l.8 4.2 2-4.9h1.7zm6.8 4.7c0-1.8-2.5-1.9-2.5-2.7 0-.2.2-.5.7-.6.2 0 1.1-.1 2 .4l.4-1.6c-.5-.2-1.1-.4-1.9-.4-2 0-3.4 1.1-3.4 2.6 0 1.1 1 1.8 1.8 2.1.8.4 1.1.6 1.1 1 0 .6-.7.8-1.4.8-.9 0-1.4-.2-2.2-.6l-.4 1.7c.5.2 1.4.4 2.4.4 2.1 0 3.5-1 3.5-2.6zm5.4 2.3h1.5l-1.3-7h-1.4c-.3 0-.6.2-.7.5l-2.5 6.5h2.1l.4-1.1h2.5l.2 1.1zm-2.2-2.4l1-2.9.6 2.9h-1.6zm-9.5-4.6l-1.3 7h-2l1.3-7h2z"/>
                      <path fill="#007DBC" d="M18.5 8.5l-2.8 7h-1.7l-1.4-5.4c-.1-.4-.2-.5-.5-.7-.5-.3-1.3-.6-2-.8l.1-.1h3.4c.4 0 .8.3.9.7l.8 4.2 2-4.9h1.7z"/>
                    </svg>
                  </div>
                  
                  {/* Mastercard */}
                  <div className="bg-white rounded-lg p-2 w-12 h-8 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 40 24" className="w-8 h-5">
                      <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                      <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
                      <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.2-3 3.3-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/>
                    </svg>
                  </div>
                  
                  {/* PayPal */}
                  <div className="bg-white rounded-lg p-2 w-12 h-8 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 40 24" className="w-8 h-5">
                      <path fill="#003087" d="M8 6h7c3 0 5 2 5 5s-2 5-5 5h-3l-1 4H8l3-14z"/>
                      <path fill="#009CDE" d="M13 10h7c3 0 5 2 5 5s-2 5-5 5h-3l-1 4h-3l3-14z"/>
                    </svg>
                  </div>
                  
                  {/* UPI */}
                  <div className="bg-white rounded-lg p-2 w-12 h-8 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 40 24" className="w-8 h-5">
                      <rect width="40" height="24" fill="#097939" rx="4"/>
                      <text x="20" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">UPI</text>
                    </svg>
                  </div>
                  
                  {/* Razorpay */}
                  <div className="bg-white rounded-lg p-2 w-12 h-8 flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 40 24" className="w-8 h-5">
                      <rect width="40" height="24" fill="#3395FF" rx="4"/>
                      <path fill="white" d="M8 8h4l-2 8h-2l2-8zm6 0h2l-1 4h2l1-4h2l-2 8h-2l1-4h-2l-1 4h-2l2-8zm8 0h4c1 0 2 1 2 2l-1 2c0 1-1 2-2 2h-2l-1 2h-2l2-8zm2 2l-1 2h2l1-2h-2z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Legal Links */}
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;