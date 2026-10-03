import { StateCreator } from 'zustand';
import { api, getProductImageUrl } from '../../services/api';
import { ProductSlice, GrowStoreState } from '../types';

function normalizeProduct(p: any) {
  const photo = getProductImageUrl(p.photo || p);

  let cat = p.category ? String(p.category).trim() : 'Vegetables';
  if (/vegitab|vegetab/i.test(cat)) cat = 'Vegetables';
  else if (/fruit/i.test(cat)) cat = 'Fruits';
  else if (/grain/i.test(cat)) cat = 'Grains';
  else if (/herb/i.test(cat)) cat = 'Herbs';
  else if (/oil/i.test(cat)) cat = 'Oils';
  else if (/dairy/i.test(cat)) cat = 'Dairy';
  else if (cat) cat = cat.charAt(0).toUpperCase() + cat.slice(1);
  else cat = 'Vegetables';

  return {
    ...p,
    photo,
    category: cat,
  };
}

export const createProductSlice: StateCreator<
  GrowStoreState,
  [],
  [],
  ProductSlice
> = (set) => ({
  products: [],
  latestProducts: [],
  categories: ['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs'],
  selectedCategory: 'All',
  searchTerm: '',
  loadingProducts: false,
  productError: null,

  fetchProducts: async () => {
    set({ loadingProducts: true, productError: null });
    try {
      const data = await api.products.getAdminProducts();
      if (data && data.length > 0) {
        const normalized = data.map(normalizeProduct);
        set({ products: normalized });
      }
    } catch (err: any) {
      console.warn('Failed to fetch products:', err.message);
      set({ productError: err.message });
    } finally {
      set({ loadingProducts: false });
    }
  },

  fetchLatestProducts: async () => {
    set({ loadingProducts: true, productError: null });
    try {
      const data = await api.products.getLatest();
      if (data && data.length > 0) {
        const normalized = data.map(normalizeProduct);
        set({ latestProducts: normalized });
      }
    } catch (err: any) {
      console.warn('Failed to fetch latest products:', err.message);
    } finally {
      set({ loadingProducts: false });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await api.products.getAllCategories();
      if (res && res.categories) {
        const cleaned = res.categories
          .filter(Boolean)
          .map((c: string) => {
            if (/vegitab|vegetab/i.test(c)) return 'Vegetables';
            if (/fruit/i.test(c)) return 'Fruits';
            if (/grain/i.test(c)) return 'Grains';
            if (/herb/i.test(c)) return 'Herbs';
            return c.charAt(0).toUpperCase() + c.slice(1);
          });
        const uniqueCats = Array.from(new Set(['All', 'Vegetables', 'Fruits', 'Grains', 'Herbs', ...cleaned]));
        set({ categories: uniqueCats });
      }
    } catch (err) {
      console.warn('Failed to fetch categories:', err);
    }
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchTerm: (term) => set({ searchTerm: term }),

  createProduct: async (formData) => {
    const newProd = await api.products.create(formData);
    set((state) => ({
      products: [newProd, ...state.products],
    }));
    return newProd;
  },

  deleteProduct: async (id) => {
    await api.products.delete(id);
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
  },
});
