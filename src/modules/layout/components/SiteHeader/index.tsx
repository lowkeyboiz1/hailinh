"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SITE } from "@/shared/constants/ui";
import { CATEGORIES } from "@/modules/category/data/categories";
import { CATEGORY_SLUGS, ROUTES } from "@/shared/constants/routes";
import { CONTACT } from "@/shared/constants/contact";
import { CartButton } from "@/modules/cart/components/CartButton";
import { type Category } from "@/modules/category/types";

// Sub-components
import { TopBar } from "./TopBar";
import { SearchDropdown } from "./SearchDropdown";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

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
      <TopBar />

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
            <DesktopNav 
              items={NAV_ITEMS}
              pathname={pathname}
              categoryMenuMap={categoryMenuMap}
              activeMegaMenu={activeMegaMenu}
              setActiveMegaMenu={setActiveMegaMenu}
              routes={{ CATEGORY: ROUTES.CATEGORY, HOME: ROUTES.HOME }}
            />

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
                <MobileMenu 
                  items={NAV_ITEMS}
                  pathname={pathname}
                  onClose={() => setMobileMenuOpen(false)}
                />
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
