"use client";

import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Product } from "@/modules/product/types";

// Phần 1: Định nghĩa Types & Interfaces
export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: string;
}

interface CartState {
  items: CartItem[];
}

interface CartActions {
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  reset: () => void;
}

type CartStore = CartState & CartActions;

// Phần 2: Initial State
const initialState: CartState = {
  items: [],
};

// Phần 3: Khởi tạo Store (Store Factory)
export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addItem: (product, quantity = 1, variantId) => {
          const { items } = get();
          const existingItem = items.find(
            (item) => item.id === product.id && item.selectedVariantId === variantId
          );

          if (existingItem) {
            set(
              {
                items: items.map((item) =>
                  item.id === product.id && item.selectedVariantId === variantId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              },
              false,
              "addItem"
            );
          } else {
            set(
              { items: [...items, { ...product, quantity, selectedVariantId: variantId }] },
              false,
              "addItem"
            );
          }
        },

        removeItem: (productId) => {
          set(
            { items: get().items.filter((item) => item.id !== productId) },
            false,
            "removeItem"
          );
        },

        updateQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }
          set(
            {
              items: get().items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
              ),
            },
            false,
            "updateQuantity"
          );
        },

        clearCart: () => set({ items: [] }, false, "clearCart"),

        getTotalItems: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice: () => {
          return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
        },

        reset: () => set(initialState),
      }),
      {
        name: "hl-store-cart-storage",
        partialize: (state) => ({ items: state.items }),
      }
    ),
    { name: "CartStore" }
  )
);

// Phần 4: Export Helpers (Non-hook Access)
export const getCartItems = () => useCartStore.getState().items;
export const addItemToCart = (product: Product, quantity?: number, variantId?: string) =>
  useCartStore.getState().addItem(product, quantity, variantId);

export const removeItemFromCart = (productId: string) =>
  useCartStore.getState().removeItem(productId);

export const updateCartQuantity = (productId: string, quantity: number) =>
  useCartStore.getState().updateQuantity(productId, quantity);

export const clearCart = () => useCartStore.getState().clearCart();
export const resetCartStore = () => useCartStore.getState().reset();
