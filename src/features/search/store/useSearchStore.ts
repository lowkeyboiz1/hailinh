"use client";

import { create } from "zustand";

interface SearchStore {
  query: string;
  isOpen: boolean;
  recentSearches: string[];
  setQuery: (q: string) => void;
  setOpen: (open: boolean) => void;
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const MAX_RECENT = 5;

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  isOpen: false,
  recentSearches: [],

  setQuery: (q) => set({ query: q }),

  setOpen: (open) => set({ isOpen: open }),

  addRecentSearch: (term) =>
    set((state) => {
      const filtered = state.recentSearches.filter((s) => s !== term);
      return {
        recentSearches: [term, ...filtered].slice(0, MAX_RECENT),
      };
    }),

  clearRecentSearches: () => set({ recentSearches: [] }),
}));
