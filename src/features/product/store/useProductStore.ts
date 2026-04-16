"use client";

import { create } from "zustand";
import type { ProductFilters, SortOption, ViewMode } from "@/features/product/types";
import { SORT_OPTIONS, PRODUCT_VIEW } from "@/shared/constants/ui";

interface ProductStore {
  filters: ProductFilters;
  viewMode: ViewMode;
  selectedProductId: string | null;
  setFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  setViewMode: (mode: ViewMode) => void;
  setSelectedProduct: (id: string | null) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: ProductFilters = {
  sortBy: SORT_OPTIONS.DEFAULT as SortOption,
};

export const useProductStore = create<ProductStore>((set) => ({
  filters: DEFAULT_FILTERS,
  viewMode: PRODUCT_VIEW.GRID as ViewMode,
  selectedProductId: null,

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  setViewMode: (mode) => set({ viewMode: mode }),

  setSelectedProduct: (id) => set({ selectedProductId: id }),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
}));
