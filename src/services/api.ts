// API Service Layer for Organic Store & FoodMiles Platform
// Interacts seamlessly with both deployed Vercel backend and Organic-Store-Backend (D:\Coding_Playground\Organic-Store-Backend)

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://grow-backend-pi.vercel.app';

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface BackendProduct {
  _id: string;
  name: string;
  photo?: string;
  price: number;
  stock?: number;
  category?: string;
  district?: string;
  producer?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BackendTestimonial {
  _id?: string;
  name: string;
  message: string;
  photo?: string;
  date?: string;
}

export interface BackendOrderItem {
  product: string;
  quantity: number;
  price: number;
  name?: string;
  photo?: string;
}

export interface BackendOrder {
  _id?: string;
  user: string;
  products: BackendOrderItem[];
  totalAmount: number;
  status?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentId?: string;
  createdAt?: string;
}

export interface BackendUser {
  id?: string;
  _id?: string;
  email: string;
  role: 'consumer' | 'producer' | 'admin' | string;
  district?: string;
  state?: string;
}

export interface RecipeItem {
  name: string;
  url: string;
  ingredients: string[];
  image: string;
  calories: number;
}

export interface SpeechVoiceResponse {
  name: string;
  stock: string;
  photo: string;
  price: string;
}

// Universal product image URL resolver — handles absolute URLs, relative paths, and dirty API strings
export function getProductImageUrl(p: any): string {
  const fallback = 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400';
  if (!p) return fallback;

  // The primary backend key for product image is 'photo'
  let raw: any = typeof p === 'string' ? p : (p.photo || p.image || p.imageUrl || p.photoUrl || p.img || p.picture || p.thumbnail);

  if (Array.isArray(raw) && raw.length > 0) {
    raw = typeof raw[0] === 'string' ? raw[0] : (raw[0]?.url || raw[0]?.path);
  } else if (typeof raw === 'object' && raw !== null) {
    raw = raw.url || raw.secure_url || raw.path || raw.src || '';
  }

  if (typeof raw !== 'string' || !raw.trim()) {
    return fallback;
  }

  raw = raw.trim();

  // Strip unescaped quotes or HTML alt fragments like: ...jpg" alt="Title"
  raw = raw.replace(/\\"/g, '"');
  if (raw.startsWith('"') && raw.endsWith('"')) {
    raw = raw.slice(1, -1);
  }
  if (raw.includes('"')) {
    raw = raw.split('"')[0];
  }
  if (raw.includes(' alt=')) {
    raw = raw.split(' alt=')[0];
  }

  // Normalize Windows backslashes
  raw = raw.replace(/\\/g, '/').trim();

  // Normalize Windows backslashes and trim whitespace
  raw = (raw as string).replace(/\\/g, '/').trim();

  // Upgrade insecure http to https if external domain
  if (raw.startsWith('http://') && !raw.includes('localhost') && !raw.includes('127.0.0.1')) {
    raw = 'https://' + raw.slice(7);
  }

  // If already absolute URL or base64 data
  if (/^(http|https|data:|blob:)/i.test(raw)) {
    return raw;
  }

  // If relative path with leading slash
  if (raw.startsWith('/')) {
    return `${API_BASE_URL}${raw}`;
  }

  if (raw.startsWith('uploads/') || raw.startsWith('public/')) {
    return `${API_BASE_URL}/${raw.replace(/^public\//, '')}`;
  }

  // Filename or relative upload path
  return `${API_BASE_URL}/uploads/${raw}`;
}

// Resilient fetch wrapper handling both direct payload and { success, data } envelopes
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = localStorage.getItem('grow_token');
  
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    });

    if (!res.ok) {
      const errText = await res.text();
      let parsedError;
      try {
        parsedError = JSON.parse(errText);
      } catch {
        parsedError = { message: errText || `HTTP Error ${res.status}` };
      }
      throw new Error(parsedError.message || parsedError.error || `HTTP ${res.status}`);
    }

    const json = await res.json();
    // Normalize data envelope from new Organic-Store-Backend standard response
    if (json && typeof json === 'object' && 'data' in json && json.data !== undefined) {
      return json.data as T;
    }
    return json as T;
  } catch (error: any) {
    console.warn(`[Organic Store API] ${endpoint}:`, error.message);
    throw error;
  }
}

// Centralized API surface
export const api = {
  // Products API
  products: {
    getLatest: async (): Promise<BackendProduct[]> => {
      const res = await apiFetch<any>('/product/latest');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.products)) return res.products;
      if (res && Array.isArray(res.data)) return res.data;
      return [];
    },
    getAllCategories: async (): Promise<{ categories: string[] }> => {
      const res = await apiFetch<any>('/product/categories');
      if (Array.isArray(res)) return { categories: res };
      if (res && res.categories) return res;
      if (res && Array.isArray(res.data)) return { categories: res.data };
      return { categories: [] };
    },
    getAdminProducts: async (): Promise<BackendProduct[]> => {
      const res = await apiFetch<any>('/product/admin-products');
      if (Array.isArray(res)) return res;
      if (res && Array.isArray(res.products)) return res.products;
      if (res && Array.isArray(res.data)) return res.data;
      return [];
    },
    getById: async (id: string): Promise<BackendProduct> => {
      return apiFetch<BackendProduct>(`/product/${id}`);
    },
    getByName: async (name: string): Promise<BackendProduct> => {
      return apiFetch<BackendProduct>(`/product/name/${encodeURIComponent(name)}`);
    },
    getByDistrict: async (district: string): Promise<BackendProduct[]> => {
      return apiFetch<BackendProduct[]>(`/product/district/${encodeURIComponent(district)}`);
    },
    getByProducer: async (producerId?: string): Promise<BackendProduct[]> => {
      return producerId 
        ? apiFetch<BackendProduct[]>(`/product/producer/${encodeURIComponent(producerId)}`)
        : apiFetch<BackendProduct[]>('/product/producer');
    },
    create: async (formData: FormData): Promise<BackendProduct> => {
      return apiFetch<BackendProduct>('/product/new', {
        method: 'POST',
        body: formData,
      });
    },
    update: async (id: string, formData: FormData): Promise<BackendProduct> => {
      return apiFetch<BackendProduct>(`/product/${id}`, {
        method: 'PUT',
        body: formData,
      });
    },
    delete: async (id: string): Promise<{ message: string }> => {
      return apiFetch<{ message: string }>(`/product/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Testimonials API
  testimonials: {
    getAll: async (): Promise<BackendTestimonial[]> => {
      return apiFetch<BackendTestimonial[]>('/testimonials/all');
    },
    create: async (formData: FormData): Promise<BackendTestimonial> => {
      return apiFetch<BackendTestimonial>('/testimonials/new', {
        method: 'POST',
        body: formData,
      });
    },
  },

  // Authentication & Users API
  auth: {
    login: async (credentials: { email: string; password: string; role?: string; district?: string }) => {
      const res = await apiFetch<{ message?: string; user?: BackendUser; token?: string; accessToken?: string }>('/user/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      const user = res.user || (res as any);
      const token = res.accessToken || res.token;

      if (user && user.email) {
        localStorage.setItem('grow_user', JSON.stringify(user));
      }
      if (token) {
        localStorage.setItem('grow_token', token);
      }
      return { user, token };
    },
    signup: async (userData: { email: string; password: string; role: string; district?: string; state?: string }) => {
      const res = await apiFetch<{ message?: string; user?: BackendUser; token?: string; accessToken?: string }>('/user/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const user = res.user || (res as any);
      const token = res.accessToken || res.token;

      if (user && user.email) {
        localStorage.setItem('grow_user', JSON.stringify(user));
      }
      if (token) {
        localStorage.setItem('grow_token', token);
      }
      return { user, token };
    },
    refreshToken: async () => {
      return apiFetch<{ accessToken?: string; token?: string; user?: BackendUser }>('/user/token/refresh', {
        method: 'POST',
      });
    },
    getAllUsers: async (): Promise<BackendUser[]> => {
      return apiFetch<BackendUser[]>('/user/all');
    },
    getUserById: async (id: string): Promise<BackendUser> => {
      return apiFetch<BackendUser>(`/user/${id}`);
    },
    updateUser: async (id: string, updates: Partial<BackendUser>): Promise<BackendUser> => {
      return apiFetch<BackendUser>(`/user/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    deleteUser: async (email: string): Promise<{ message: string }> => {
      return apiFetch<{ message: string }>(`/user/email/${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });
    },
    logout: () => {
      localStorage.removeItem('grow_user');
      localStorage.removeItem('grow_token');
    },
    getCurrentUser: (): BackendUser | null => {
      try {
        const u = localStorage.getItem('grow_user');
        return u ? JSON.parse(u) : null;
      } catch {
        return null;
      }
    }
  },

  // Orders API
  orders: {
    create: async (orderData: {
      user: string;
      products: Array<{ product?: string; productId?: string; quantity: number; price: number; name?: string }>;
      totalAmount: number;
      shippingAddress: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
      };
      status?: string;
    }): Promise<BackendOrder> => {
      return apiFetch<BackendOrder>('/order/new', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },
    getAll: async (): Promise<BackendOrder[]> => {
      return apiFetch<BackendOrder[]>('/order/all');
    },
    getByUser: async (userId: string): Promise<BackendOrder[]> => {
      return apiFetch<BackendOrder[]>(`/order/user/${encodeURIComponent(userId)}`);
    },
    getByProducer: async (producerId?: string): Promise<BackendOrder[]> => {
      return producerId
        ? apiFetch<BackendOrder[]>(`/order/producer/${encodeURIComponent(producerId)}`)
        : apiFetch<BackendOrder[]>('/order/producer');
    },
    update: async (orderId: string, updates: Partial<BackendOrder>): Promise<BackendOrder> => {
      return apiFetch<BackendOrder>(`/order/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
  },

  // Payments API
  payment: {
    createIntent: async (data: { amount: number; orderId: string; currency?: string }) => {
      return apiFetch<{
        success: boolean;
        clientSecret?: string;
        message?: string;
        url?: string;
        sessionUrl?: string;
        redirectUrl?: string;
        sessionId?: string;
      }>('/payment/pay', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    callback: async (data: { paymentId: string; orderId: string }) => {
      return apiFetch<{ success: boolean; message: string; order?: BackendOrder }>('/payment/callback', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  },

  // Recipes (SmartBite) API
  recipes: {
    search: async (params: { q?: string; diet?: string; calories?: string; health?: string; cuisine?: string }): Promise<RecipeItem[]> => {
      const queryParams = new URLSearchParams();
      if (params.q) queryParams.set('q', params.q);
      if (params.diet) queryParams.set('diet', params.diet);
      if (params.calories) queryParams.set('calories', params.calories);
      if (params.health) queryParams.set('health', params.health);
      if (params.cuisine) queryParams.set('cuisine', params.cuisine);

      return apiFetch<RecipeItem[]>(`/recipe/recipes?${queryParams.toString()}`);
    }
  },

  // Speech Recognition & NLP Voice Assist API
  speech: {
    parseVoiceInput: async (input: string): Promise<SpeechVoiceResponse> => {
      return apiFetch<SpeechVoiceResponse>(`/speech/query?input=${encodeURIComponent(input)}`);
    }
  }
};
