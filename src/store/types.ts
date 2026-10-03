import { BackendProduct, BackendUser, BackendOrder } from '../services/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  stock: number;
  category?: string;
  rating?: number;
}

export interface AuthSlice {
  user: BackendUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string; role?: string; district?: string }) => Promise<any>;
  signup: (userData: { email: string; password: string; role: string; district?: string; state?: string }) => Promise<any>;
  logout: () => void;
  setUser: (user: BackendUser | null) => void;
}

export interface CartSlice {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalCartAmount: () => number;
  getTotalItems: () => number;
}

export interface ProductSlice {
  products: BackendProduct[];
  latestProducts: BackendProduct[];
  categories: string[];
  selectedCategory: string;
  searchTerm: string;
  loadingProducts: boolean;
  productError: string | null;
  fetchProducts: () => Promise<void>;
  fetchLatestProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  createProduct: (formData: FormData) => Promise<BackendProduct>;
  deleteProduct: (id: string) => Promise<void>;
}

export interface OrderSlice {
  orders: BackendOrder[];
  loadingOrders: boolean;
  fetchOrders: () => Promise<void>;
  placeOrder: (orderData: any) => Promise<BackendOrder>;
}

export type GrowStoreState = AuthSlice & CartSlice & ProductSlice & OrderSlice;
