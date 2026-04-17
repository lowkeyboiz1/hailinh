"use client";

import { CATEGORIES } from "@/modules/category/data/categories";
import { PRODUCTS } from "@/modules/product/data/products";
import { ProductCard } from "@/modules/product";
import { useProductStore } from "@/modules/product";
import { type SortOption } from "@/modules/product/types";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import { FilterSidebar } from "../components/FilterSidebar";
import { 
  ChevronRight, 
  LayoutGrid, 
  List, 
  SlidersHorizontal 
} from "lucide-react";
import Link from "next/link";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface CategoryContentProps {
  slug: string[];
}

export function CategoryContent({ slug }: CategoryContentProps) {
  const mainSlug = slug[0];
  const subSlug = slug[1];

  const category = CATEGORIES.find(c => c.slug === mainSlug);
  const subcategory = category?.subcategories?.find(s => s.slug === subSlug);

  const { filters, setFilter, viewMode, setViewMode } = useProductStore();

  // Filter logic
  let filteredProducts = PRODUCTS.filter(p => p.categorySlug === mainSlug);
  if (subSlug) {
    filteredProducts = filteredProducts.filter(p => p.subcategorySlug === subSlug);
  }

  // Sort logic
  if (filters.sortBy === "price_asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === "price_desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (filters.sortBy === "popular") {
    filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
  }

  if (!category) return <div>Category not found</div>;

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* ── Breadcrumbs & Header ── */}
      <div className="bg-white border-b">
        <div className={cn("mx-auto px-6 py-8", MAX_WIDTH.CONTAINER)}>
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-brand">Trang chủ</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <Link href="/category" className="hover:text-brand">Danh mục</Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className={cn(subSlug ? "hover:text-brand cursor-pointer" : "text-foreground font-bold")}>
              {category.name}
            </span>
            {subcategory && (
              <>
                <ChevronRight className="h-3 w-3 shrink-0" />
                <span className="text-foreground font-bold">{subcategory.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-brand md:text-4xl tracking-tight">
                {subcategory ? subcategory.name : category.name}
              </h1>
              <p className="text-muted-foreground text-sm max-w-2xl">{category.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-muted p-1 rounded-lg border">
                <Button 
                  variant={viewMode === "grid" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="h-8 w-8 rounded-md"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "secondary" : "ghost"} 
                  size="icon" 
                  className="h-8 w-8 rounded-md"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              
              <Select value={filters.sortBy} onValueChange={(v) => setFilter("sortBy", v as SortOption)}>
                <SelectTrigger className="w-[180px] h-10 bg-white border-border/60">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Mặc định</SelectItem>
                  <SelectItem value="price_asc">Giá: Thấp đến Cao</SelectItem>
                  <SelectItem value="price_desc">Giá: Cao đến Thấp</SelectItem>
                  <SelectItem value="popular">Phổ biến nhất</SelectItem>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-0">
                  <div className="h-full overflow-y-auto p-6">
                    <FilterSidebar category={category} activeSubSlug={subSlug} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className={cn("mx-auto px-6 py-10", MAX_WIDTH.CONTAINER)}>
        <div className="flex gap-10">
          {/* Sidebar */}
          <aside className="hidden md:block w-72 shrink-0">
            <FilterSidebar category={category} activeSubSlug={subSlug} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground font-medium">Tìm thấy <span className="text-foreground font-bold">{filteredProducts.length}</span> sản phẩm</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "flex flex-col gap-6"
              )}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-dashed border-border/60 h-96 flex flex-col items-center justify-center text-center p-12">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <LayoutGrid className="h-10 w-10 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-xl font-bold mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-muted-foreground max-w-sm mb-8">Chúng tôi xin lỗi, hiện không có sản phẩm nào phù hợp với bộ lọc của bạn.</p>
                <Button variant="outline" className="rounded-full px-8" onClick={() => setFilter("sortBy", "default")}>Xoá bộ lọc</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
