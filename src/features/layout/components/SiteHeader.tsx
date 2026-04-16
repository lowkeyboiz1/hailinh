"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartButton } from "@/features/cart/components/CartButton";
import { CATEGORIES } from "@/features/category/data/categories";
import type { Category } from "@/features/category/types";
import { PRODUCTS } from "@/features/product/data/products";
import { useSearchStore } from "@/features/search/store/useSearchStore";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/shared/constants/contact";
import { CATEGORY_SLUGS, ROUTES } from "@/shared/constants/routes";
import { SITE } from "@/shared/constants/ui";
import {
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Trang Chủ", href: ROUTES.HOME },
  { label: "Gạch Ốp Lát", href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.TILES}` },
  {
    label: "Thiết Bị Vệ Sinh",
    href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.BATHROOM}`,
  },
  {
    label: "Thiết Bị Nhà Bếp",
    href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.KITCHEN}`,
  },
  {
    label: "Vật Liệu XD",
    href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.HOME_IMPROVEMENT}`,
  },
] as const;

interface MegaMenuProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen || !category.subcategories?.length) return null;

  return (
    <div
      className="absolute top-[calc(100%+0px)] left-0 z-50 w-72 rounded-2xl border border-border/50 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5 animate-in fade-in zoom-in-95 duration-200 origin-top-left"
      onMouseLeave={onClose}
    >
      <div className="flex items-center justify-between mb-4 px-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
          Khám phá danh mục
        </p>
        <div className="h-px flex-1 bg-border/40 ml-4" />
      </div>
      <ul className="grid grid-cols-1 gap-1">
        {category.subcategories.map((sub) => (
          <li key={sub.id}>
            <Link
              href={`${ROUTES.CATEGORY}/${category.slug}/${sub.slug}`}
              className="flex items-center justify-between group rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground/80 hover:bg-brand/5 hover:text-brand transition-all"
              onClick={onClose}
            >
              <span>{sub.name}</span>
              <ChevronDown className="h-3.5 w-3.5 -rotate-90 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-border/40">
        <Link
          href={`${ROUTES.CATEGORY}/${category.slug}`}
          className="text-xs font-bold text-brand hover:underline px-1"
          onClick={onClose}
        >
          Xem tất cả {category.name} →
        </Link>
      </div>
    </div>
  );
}

function SearchDropdown() {
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

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categoryMenuMap: Record<string, Category> = Object.fromEntries(
    CATEGORIES.map((c) => [c.slug, c]),
  );

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="hidden md:block bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white/50 text-[10px] py-1.5 border-b border-white/5">
        <div className="mx-auto max-w-[1440px] px-6 flex items-center justify-between font-bold">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
              <MapPin className="h-3 w-3 text-brand-accent/50" />
              {CONTACT.ADDRESS_1}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-brand-accent/50" />
              {CONTACT.WORKING_HOURS}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={CONTACT.ZALO}
              className="flex items-center gap-1.5 hover:text-brand-accent transition-colors"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
              Tư vấn trực tuyến
            </Link>
            <Link
              href={`tel:${CONTACT.PHONE_RAW}`}
              className="text-white font-black uppercase tracking-widest bg-white/10 px-3 py-0.5 rounded-full hover:bg-brand-accent hover:text-brand transition-all"
            >
              {CONTACT.PHONE_PRIMARY}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-700 ease-in-out",
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] py-0 border-b-transparent"
            : "bg-white border-b border-gray-100 py-3",
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 md:px-6">
          <div className="flex h-16 items-center gap-4 xl:gap-12">
            {/* Logo */}
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-3 shrink-0 group transition-all"
              id="header-logo"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white font-black text-xl shadow-[0_8px_30px_rgb(15,23,42,0.15)] group-hover:bg-[#1a2d4d] transition-all duration-500">
                HL
              </div>
              <div className="hidden sm:flex flex-col">
                <p className="font-black text-brand text-lg leading-none tracking-tighter uppercase whitespace-nowrap">
                  {SITE.NAME} <span className="text-brand-accent">.</span>
                </p>
                <p className="text-[8px] text-gray-400 font-bold tracking-[0.25em] uppercase whitespace-nowrap mt-0.5">
                  Premium Store
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0 shrink-0">
              {NAV_ITEMS.map((item) => {
                const categorySlug = item.href.startsWith(ROUTES.CATEGORY)
                  ? item.href.split("/").pop()
                  : null;
                const hasMenu = categorySlug && categoryMenuMap[categorySlug];
                const isActive =
                  pathname === item.href ||
                  (item.href !== ROUTES.HOME &&
                    pathname.startsWith(item.href + "/"));

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() =>
                      categorySlug && setActiveMegaMenu(categorySlug)
                    }
                    onMouseLeave={() => setActiveMegaMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center gap-1 rounded-xl px-2 xl:px-4 py-2 text-[10px] xl:text-[11px] font-black uppercase tracking-[0.1em] xl:tracking-[0.15em] transition-all whitespace-nowrap",
                        isActive
                          ? "text-brand bg-brand/5"
                          : "text-gray-500 hover:text-brand hover:bg-gray-50",
                      )}
                    >
                      {item.label}
                      {hasMenu && (
                        <ChevronDown
                          className={cn(
                            "h-3 w-3 opacity-30 transition-transform duration-300",
                            activeMegaMenu === categorySlug && "rotate-180",
                          )}
                        />
                      )}
                    </Link>
                    {hasMenu && categorySlug && (
                      <MegaMenu
                        category={categoryMenuMap[categorySlug]}
                        isOpen={activeMegaMenu === categorySlug}
                        onClose={() => setActiveMegaMenu(null)}
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Search */}
            <div className="hidden md:flex flex-1 min-w-[200px] max-w-sm xl:max-w-md mx-auto">
              <SearchDropdown />
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1 border-r border-gray-100 pr-4 mr-0">
                <CartButton />
                <Link href={ROUTES.SIGNIN}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl h-10 w-10 text-gray-500 hover:bg-brand/5 hover:text-brand"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <Link href={CONTACT.ZALO}>
                <Button className="h-11 rounded-2xl px-5 bg-brand hover:bg-[#1a2d4d] text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand/10 transition-all hover:-translate-y-0.5">
                  Báo Giá
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 lg:hidden ml-auto">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-lg h-9 w-9 bg-gray-50"
                    id="mobile-menu-btn"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <div className="flex items-center gap-1 ml-2">
                  <CartButton />
                </div>
                <SheetContent
                  side="right"
                  className="w-full sm:max-w-xs p-0 border-l-0"
                >
                  {/* ... mobile menu content stays similar but cleaned up ... */}
                  <div className="flex flex-col h-full bg-white">
                    <div className="flex items-center justify-between p-5 border-b">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white font-black text-sm">
                          HL
                        </div>
                        <span className="font-black text-brand text-sm tracking-tighter uppercase">
                          {SITE.NAME}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 space-y-1">
                      {NAV_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "block rounded-lg px-4 py-3 text-sm font-bold",
                            pathname === item.href
                              ? "bg-brand/5 text-brand"
                              : "text-gray-700 hover:bg-gray-50",
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="p-6 border-t space-y-4">
                      <a href={`tel:${CONTACT.PHONE_RAW}`} className="block">
                        <Button
                          variant="outline"
                          className="w-full font-bold border-brand text-brand"
                        >
                          Gọi {CONTACT.PHONE_PRIMARY}
                        </Button>
                      </a>
                      <a href={CONTACT.ZALO} className="block">
                        <Button className="w-full bg-brand font-bold">
                          Zalo Báo Giá
                        </Button>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
