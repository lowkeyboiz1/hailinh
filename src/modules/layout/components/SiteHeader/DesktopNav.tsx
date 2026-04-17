"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { type Category } from "@/modules/category/types";

interface NavItem {
  label: string;
  href: string;
}

interface DesktopNavProps {
  items: readonly NavItem[];
  pathname: string;
  categoryMenuMap: Record<string, Category>;
  activeMegaMenu: string | null;
  setActiveMegaMenu: (slug: string | null) => void;
  routes: { CATEGORY: string; HOME: string };
}

export function DesktopNav({ 
  items, 
  pathname, 
  categoryMenuMap, 
  activeMegaMenu, 
  setActiveMegaMenu,
  routes
}: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex items-center gap-0 shrink-0">
      {items.map((item) => {
        const categorySlug = item.href.startsWith(routes.CATEGORY)
          ? item.href.split("/").pop()
          : null;
        const hasMenu = categorySlug && categoryMenuMap[categorySlug];
        const isActive =
          pathname === item.href ||
          (item.href !== routes.HOME &&
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
  );
}
