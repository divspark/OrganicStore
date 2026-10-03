import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Wishlist from '../pages/Wishlist';
import ProductList from '../pages/ProductList';
import Blog from '../pages/Blog';
import Contact from '../pages/Contact';
import ProductDetail from '../components/ProductDetail';
import AdminDashboard from '../pages/AdminDashboard';
import ProducerDashboard from '../pages/ProducerDashboard';
import SmartBite from '../pages/SmartBite';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <Layout />, // wrap all pages with header/footer
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/shop', element: <ProductList /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/smartbite', element: <SmartBite /> },
      { path: '/blog', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/dasboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/producer/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['producer']}>
        <ProducerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/producer/dasboard',
    element: (
      <ProtectedRoute allowedRoles={['producer']}>
        <ProducerDashboard />
      </ProtectedRoute>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

