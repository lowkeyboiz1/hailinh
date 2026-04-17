"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ProductFilters, SortOption, ViewMode } from "@/modules/product/types";
import { SORT_OPTIONS, PRODUCT_VIEW } from "@/shared/constants/ui";

// Phần 1: Định nghĩa Types & Interfaces
interface ProductState {
  filters: ProductFilters;
  viewMode: ViewMode;
  selectedProductId: string | null;
}

interface ProductActions {
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedProduct: (id: string | null) => void;
  resetFilters: () => void;
  reset: () => void;
}

type ProductStore = ProductState & ProductActions;

// Phần 2: Initial State
const DEFAULT_FILTERS: ProductFilters = {
  sortBy: SORT_OPTIONS.DEFAULT as SortOption,
};

const initialState: ProductState = {
  filters: DEFAULT_FILTERS,
  viewMode: PRODUCT_VIEW.GRID as ViewMode,
  selectedProductId: null,
};

// Phần 3: Khởi tạo Store (Store Factory)
export const useProductStore = create<ProductStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        }), false, "setFilter"),

      setViewMode: (mode) => set({ viewMode: mode }, false, "setViewMode"),

      setSelectedProduct: (id) => set({ selectedProductId: id }, false, "setSelectedProduct"),

      resetFilters: () => set({ filters: DEFAULT_FILTERS }, false, "resetFilters"),

      reset: () => set(initialState),
    }),
    { name: "ProductStore" }
  )
);

// Phần 4: Export Helpers (Non-hook Access)
export const getProductFilters = () => useProductStore.getState().filters;
export const getProductViewMode = () => useProductStore.getState().viewMode;
export const setProductFilter = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) =>
  useProductStore.getState().setFilter(key, value);

export const setProductViewMode = (mode: ViewMode) =>
  useProductStore.getState().setViewMode(mode);

export const setSelectedProduct = (id: string | null) =>
  useProductStore.getState().setSelectedProduct(id);

export const resetProductFilters = () =>
  useProductStore.getState().resetFilters();

export const resetProductStore = () => useProductStore.getState().reset();
