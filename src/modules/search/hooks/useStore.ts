"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// 1. Interfaces định nghĩa State & Actions
interface SearchState {
  query: string
  isOpen: boolean
  recentSearches: string[]
}

interface SearchActions {
  setQuery: (q: string) => void
  setOpen: (open: boolean) => void
  addRecentSearch: (term: string) => void
  clearRecentSearches: () => void
}

type SearchStore = SearchState & SearchActions

// 2. Khởi tạo Initial State
const initialState: SearchState = {
  query: "",
  isOpen: false,
  recentSearches: [],
}

const MAX_RECENT = 5

// 3. Tạo Store
export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      ...initialState,

      setQuery: (q) => set({ query: q }),

      setOpen: (open) => set({ isOpen: open }),

      addRecentSearch: (term) =>
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s !== term)
          return {
            recentSearches: [term, ...filtered].slice(0, MAX_RECENT),
          }
        }),

      clearRecentSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: "hl-store-search-storage",
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    },
  ),
)

// 4. Export các hàm truy cập nhanh từ bên ngoài
export const setQuery = (q: string) => useSearchStore.getState().setQuery(q)
export const setOpenSearch = (open: boolean) =>
  useSearchStore.getState().setOpen(open)
export const addRecentSearch = (term: string) =>
  useSearchStore.getState().addRecentSearch(term)
export const clearRecentSearches = () =>
  useSearchStore.getState().clearRecentSearches()
