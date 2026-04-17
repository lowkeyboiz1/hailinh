"use client";

import Link from "next/link";
import { Category } from "@/modules/category/types";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  category: Category;
  activeSubSlug?: string;
}

const BRANDS = ["TOTO", "INAX", "Bosch", "Hafele", "Marazzi", "Porcelanosa", "Viglacera", "American Standard"];
const PRICE_RANGES = [
  { label: "Dưới 1 triệu", value: "0-1" },
  { label: "1 - 5 triệu", value: "1-5" },
  { label: "5 - 10 triệu", value: "5-10" },
  { label: "Trên 10 triệu", value: "10-plus" },
];

export function FilterSidebar({ category, activeSubSlug }: FilterSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Categories */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-brand">Danh mục con</h3>
        <ul className="space-y-1">
          <li>
            <Link 
              href={`${ROUTES.CATEGORY}/${category.slug}`}
              className={cn(
                "flex items-center justify-between group rounded-lg px-3 py-2 text-sm transition-all",
                !activeSubSlug ? "bg-brand/5 text-brand font-bold" : "text-foreground/70 hover:bg-accent hover:text-brand"
              )}
            >
              Tất cả {category.name}
              <span className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                !activeSubSlug ? "bg-brand text-white" : "bg-muted text-muted-foreground"
              )}>{category.productCount}</span>
            </Link>
          </li>
          {category.subcategories?.map((sub) => (
            <li key={sub.id}>
              <Link 
                href={`${ROUTES.CATEGORY}/${category.slug}/${sub.slug}`}
                className={cn(
                  "flex items-center group rounded-lg px-3 py-2 text-sm transition-all",
                  activeSubSlug === sub.slug ? "bg-brand/5 text-brand font-bold" : "text-foreground/70 hover:bg-accent hover:text-brand"
                )}
              >
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Separator className="bg-border/40" />

      {/* Brand Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-brand">Thương hiệu</h3>
        <div className="flex flex-wrap gap-2">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-border/80 bg-white hover:border-brand hover:text-brand transition-all cursor-pointer"
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <Separator className="bg-border/40" />

      {/* Price Filter */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-brand">Khoảng giá</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
              <div className="h-4 w-4 rounded border border-border/60 group-hover:border-brand flex items-center justify-center transition-all">
                <div className="h-2 w-2 rounded-sm bg-brand opacity-0 group-hover:opacity-20 transition-all" />
              </div>
              <span className="text-sm text-foreground/70 group-hover:text-brand transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured Badge/Promo */}
      <div className="rounded-2xl bg-brand p-6 text-white space-y-4 shadow-xl shadow-brand/20">
        <Badge className="bg-brand-accent text-brand border-none font-black uppercase text-[9px] tracking-tighter">Ưu Đãi Đặc Biệt</Badge>
        <p className="font-bold leading-tight">Mọi đơn hàng từ {category.name} trên 50Tr đều được miễn phí vận chuyển!</p>
        <Link href={`tel:0901234567`}>
          <button className="w-full text-xs font-black uppercase tracking-widest py-3 rounded-xl bg-white text-brand hover:bg-brand-accent transition-colors">Gọi tư vấn ngay</button>
        </Link>
      </div>
    </div>
  );
}
