"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { type Category } from "@/modules/category/types";

interface MegaMenuProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
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
