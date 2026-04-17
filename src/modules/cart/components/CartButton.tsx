"use client";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useCartStore } from "../hooks/useStore";

const emptySubscribe = () => () => {};
function useHasMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client value
    () => false, // Server value
  );
}

export function CartButton() {
  const mounted = useHasMounted();
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (!mounted) {
    return (
      <div className="relative p-2 text-gray-600">
        <ShoppingBag className="h-5 w-5 opacity-20" />
      </div>
    );
  }

  return (
    <Link
      href={ROUTES.CART}
      className="group relative p-2 text-gray-600 hover:text-brand transition-all"
      id="header-cart-btn"
    >
      <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
      {totalItems > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-black text-white shadow-sm ring-2 ring-white",
            "animate-in zoom-in duration-300",
          )}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
