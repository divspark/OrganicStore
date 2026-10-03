import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: { _id?: string; productId?: string; id?: string; name: string; price: number; photo?: string; image?: string; stock?: number; category?: string; rating?: number; originalPrice?: number }, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'grow_cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    // Default initial mock items for immediate rich UI if empty
    return [
      {
        id: '66444359a5f6c05454972a74',
        name: 'Fresh Organic Orange',
        price: 90,
        originalPrice: 110,
        image: 'https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg',
        quantity: 2,
        stock: 150,
        rating: 4.8
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cartItems]);

  const addToCart = (product: any, quantity = 1) => {
    const pId = product._id || product.productId || product.id || String(Date.now());
    const pImage = product.photo || product.image || 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400';
    const pPrice = Number(product.price) || 0;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === pId);
      if (existing) {
        return prev.map(item =>
          item.id === pId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: pId,
          name: product.name,
          price: pPrice,
          originalPrice: product.originalPrice || Math.round(pPrice * 1.2),
          image: pImage,
          quantity,
          stock: product.stock !== undefined ? product.stock : 20,
          category: product.category || 'General',
          rating: product.rating || 4.8,
        }
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
