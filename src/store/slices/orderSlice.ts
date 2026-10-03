import { StateCreator } from 'zustand';
import { api } from '../../services/api';
import { OrderSlice, GrowStoreState } from '../types';

export const createOrderSlice: StateCreator<
  GrowStoreState,
  [],
  [],
  OrderSlice
> = (set) => ({
  orders: [],
  loadingOrders: false,

  fetchOrders: async () => {
    set({ loadingOrders: true });
    try {
      const data = await api.orders.getAll();
      if (data) {
        set({ orders: data });
      }
    } catch (err) {
      console.warn('Failed to fetch orders:', err);
    } finally {
      set({ loadingOrders: false });
    }
  },

  placeOrder: async (orderData) => {
    const order = await api.orders.create(orderData);
    set((state) => ({
      orders: [order, ...state.orders],
      cartItems: [], // clear cart upon successful order
    }));
    return order;
  },
});
