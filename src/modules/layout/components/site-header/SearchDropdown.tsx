"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import Link from "next/link";
import { useSearchStore } from "@/modules/search";
import { PRODUCTS } from "@/modules/product/data/products";
import { ROUTES } from "@/shared/constants/routes";

export function SearchDropdown() {
  const { query, setQuery, setOpen } = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions =
    query.length >= 2
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 5)
      : [];

  const TRENDING = [
    "Gạch Prime",
    "Bồn cầu TOTO",
    "Sen tắm Grohe",
    "Gạch 60x60",
  ];

  return (
    <div className="relative flex-1 w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-brand/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
          <Input
            ref={inputRef}
            id="header-search-input"
            placeholder="Tìm kiếm gạch, thiết bị vệ sinh cao cấp..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(e.target.value.length > 0);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            className="h-12 pl-11 pr-4 rounded-2xl border-border/40 bg-muted/30 focus-visible:bg-white focus-visible:ring-brand/20 focus-visible:border-brand/40 transition-all font-medium text-sm"
          />
        </div>
      </div>

      {(query.length > 0 || suggestions.length > 0) && (
        <div className="absolute top-[calc(100%+12px)] left-0 w-full rounded-3xl border border-white/40 bg-white/90 backdrop-blur-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500 ease-out-expo">
          {query.length < 2 && (
            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-4 px-1">
                Tìm kiếm phổ biến
              </p>
              <div className="flex flex-wrap gap-2">
                {TRENDING.map((word) => (
                  <button
                    key={word}
                    onClick={() => setQuery(word)}
                    className="px-4 py-2 rounded-xl bg-muted/50 text-xs font-bold text-foreground/70 hover:bg-brand hover:text-white transition-all"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {suggestions.length > 0 && (
            <div className="py-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2 px-6">
                Sản phẩm gợi ý
              </p>
              {suggestions.map((product) => (
                <Link
                  key={product.id}
                  href={`${ROUTES.PRODUCT}/${product.slug}`}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-brand/5 transition-all group"
                  onClick={() => setOpen(false)}
                  id={`search-result-${product.id}`}
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-muted flex items-center justify-center border border-border/40 overflow-hidden">
                    <Search className="h-4 w-4 text-muted-foreground group-hover:text-brand group-hover:scale-110 transition-all" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate group-hover:text-brand transition-colors">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-black uppercase text-muted-foreground/60 px-1.5 py-0.5 bg-muted rounded">
                        {product.brand}
                      </span>
                      <span className="text-[10px] text-muted-foreground/80">
                        {product.categorySlug}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              <div className="mt-2 p-3 bg-muted/30 border-t border-border/40">
                <Link
                  href={`${ROUTES.SEARCH}?q=${query}`}
                  className="block text-center text-xs font-bold text-brand hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Xem tất cả kết quả cho &quot;{query}&quot;
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
