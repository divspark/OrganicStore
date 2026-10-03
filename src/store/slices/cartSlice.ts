import { StateCreator } from 'zustand';
import { CartSlice, CartItem, GrowStoreState } from '../types';

export const createCartSlice: StateCreator<
  GrowStoreState,
  [],
  [],
  CartSlice
> = (set, get) => ({
  cartItems: [
    {
      id: '66444359a5f6c05454972a74',
      name: 'Fresh Organic Orange',
      price: 90,
      originalPrice: 110,
      image: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
      quantity: 2,
      stock: 150,
      rating: 4.8,
    }
  ],

  addToCart: (product, quantity = 1) => {
    const pId = product._id || product.productId || product.id || String(Date.now());
    const pImage = product.photo || product.image || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400';
    const pPrice = Number(product.price) || 0;

    set((state) => {
      const existing = state.cartItems.find((item) => item.id === pId);
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === pId ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return {
        cartItems: [
          ...state.cartItems,
          {
            id: pId,
            name: product.name,
            price: pPrice,
            originalPrice: product.originalPrice || Math.round(pPrice * 1.2),
            image: pImage,
            quantity,
            stock: product.stock !== undefined ? product.stock : 25,
            category: product.category || 'Produce',
            rating: product.rating || 4.8,
          },
        ],
      };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  getTotalCartAmount: () => {
    return get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
});
