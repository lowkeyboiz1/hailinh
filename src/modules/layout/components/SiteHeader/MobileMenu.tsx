"use client";

import { Button } from "@/components/ui/button";
import { SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/shared/constants/ui";
import { CONTACT } from "@/shared/constants/contact";
import { CartButton } from "@/modules/cart/components/CartButton";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: readonly NavItem[];
  pathname: string;
  onClose: () => void;
}

export function MobileMenu({ items, pathname, onClose }: MobileMenuProps) {
  return (
    <SheetContent
      side="right"
      className="w-full sm:max-w-xs p-0 border-l-0"
    >
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
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-lg px-4 py-3 text-sm font-bold",
                pathname === item.href
                  ? "bg-brand/5 text-brand"
                  : "text-gray-700 hover:bg-gray-50",
              )}
              onClick={onClose}
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
  );
}
