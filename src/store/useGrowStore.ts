import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { GrowStoreState, CartItem } from './types';
import { createAuthSlice } from './slices/authSlice';
import { createCartSlice } from './slices/cartSlice';
import { createProductSlice } from './slices/productSlice';
import { createOrderSlice } from './slices/orderSlice';

export type { CartItem, GrowStoreState };
export * from './types';

export const useGrowStore = create<GrowStoreState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createCartSlice(...a),
      ...createProductSlice(...a),
      ...createOrderSlice(...a),
    }),
    {
      name: 'grow-organic-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        cartItems: state.cartItems,
      }),
    }
  )
);
