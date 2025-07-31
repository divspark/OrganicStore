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
// import ErrorPage from '../pages/ErrorPage'; // fallback error
import ProductDetail from '../components/ProductDetail';
import AdminDashboard from '../pages/AdminDashboard';
import ProducerDashboard from '../pages/ProducerDashboard';

const router = createBrowserRouter([
  {
    element: <Layout />, // wrap all pages with header/footer
    children: [
      { path: '/', element: <Home /> },
      { path: '/cart', element: <Cart /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/shop', element: <ProductList /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/blog', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
    ],
    // errorElement: <ErrorPage />,
  },
  { path: '/admin/dasboard', element: <AdminDashboard /> },
  { path: '/producer/dasboard', element: <ProducerDashboard /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
