import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { Product } from "@/modules/product/types";

export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variantId?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
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
      }),
      {
        name: "hailinh-cart-storage",
      }
    ),
    { name: "CartStore" }
  )
);
