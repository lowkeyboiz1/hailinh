export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  priceModifier: number;
  inStock: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  subcategorySlug: string;
  brand: string;
  origin: string;
  sku: string;
  price: number;
  originalPrice?: number;
  unit: string;
  description: string;
  shortDescription: string;
  images: ProductImage[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  tags: string[];
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOnSale: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
}

export type SortOption = "default" | "price_asc" | "price_desc" | "newest" | "popular";
export type ViewMode = "grid" | "list";

export interface ProductFilters {
  categorySlug?: string;
  subcategorySlug?: string;
  brand?: string[];
  priceMin?: number;
  priceMax?: number;
  origin?: string[];
  inStock?: boolean;
  sortBy: SortOption;
}
