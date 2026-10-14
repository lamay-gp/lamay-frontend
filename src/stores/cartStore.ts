import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Action, CartItem } from '@/types/Products';

type CartState = {
  cartItems: CartItem[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (action: Action, id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],

      addToCart: (id) => {
        set((state) => {
          const alreadyInCart = state.cartItems.some(
            (item) => item.productId === id,
          );

          if (alreadyInCart) {
            return state;
          }

          return {
            cartItems: [...state.cartItems, { productId: id, quantity: 1 }],
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.productId !== id),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      updateQuantity: (action, id) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item.productId !== id) {
              return item;
            }

            return {
              ...item,
              quantity:
                action === 'increment' ?
                  item.quantity + 1
                : Math.max(1, item.quantity - 1),
            };
          }),
        }));
      },
    }),
    { name: 'lamay-cart' },
  ),
);
