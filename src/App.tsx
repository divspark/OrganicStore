// import React from 'react';
// import { useState } from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import Features from './components/Features';
// import ProductGrid from './components/ProductGrid';
// import About from './components/About';
// import Testimonials from './components/Testimonials';
// import Newsletter from './components/Newsletter';
// import Footer from './components/Footer';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import ProductDetail from './components/ProductDetail';
// import ProductList from './components/ProductList';
// import Wishlist from './pages/Wishlist';
// import Blog from './pages/Blog';
// import Contact from './pages/Contact';
// import ProducerDashboard from './pages/ProducerDashboard';
// import AdminDashboard from './pages/AdminDashboard';

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

//   const handleProductClick = (productId: string) => {
//     setSelectedProductId(productId);
//     setCurrentPage('product-detail');
//   };

//   const handleBackToHome = () => {
//     setCurrentPage('home');
//     setSelectedProductId(null);
//   };

//   // Listen for hash changes to handle navigation
//   React.useEffect(() => {
//     const handleHashChange = () => {
//       const hash = window.location.hash.substring(1);
//       if (hash) {
//         setCurrentPage(hash);
//       }
//     };

//     window.addEventListener('hashchange', handleHashChange);
//     return () => window.removeEventListener('hashchange', handleHashChange);
//   }, []);

//   // For demo purposes, you can uncomment one of these to see the pages:
//   // return <Cart />;
//   // return <Login />;
//   // return <Signup />;
//   // return <ProducerDashboard />;
//   return <AdminDashboard />;
  
//   if (currentPage === 'product-detail') {
//     return <ProductDetail onBack={handleBackToHome} />;
//   }
  
//   if (currentPage === 'cart') {
//     return <Cart />;
//   }
  
//   if (currentPage === 'shop') {
//     return (
//       <div className="min-h-screen">
//         <Header />
//         <ProductList onProductClick={handleProductClick} />
//         <Footer />
//       </div>
//     );
//   }
  
//   if (currentPage === 'wishlist') {
//     return (
//       <div className="min-h-screen">
//         <Header />
//         <Wishlist />
//         <Footer />
//       </div>
//     );
//   }
  
//   if (currentPage === 'blog') {
//     return (
//       <div className="min-h-screen">
//         <Header />
//         <Blog />
//         <Footer />
//       </div>
//     );
//   }
  
//   if (currentPage === 'contact') {
//     return (
//       <div className="min-h-screen">
//         <Header />
//         <Contact />
//         <Footer />
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen">
//       <Header />
//       <Hero />
//       <Features />
//       <ProductGrid onProductClick={handleProductClick} />
//       <About />
//       <Testimonials />
//       <Newsletter />
//       <Footer />
//     </div>
//   );
// }

// export default App;

import AppRouter from './routes/AppRouter';

function App() {
  return (
      <AppRouter />
  );
}

export default App;