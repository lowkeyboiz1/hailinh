"use client";

import Link from "next/link";
import { Phone, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/shared/constants/contact";

interface QuoteCTAProps {
  variant?: "hero" | "card" | "sticky" | "inline";
  productName?: string;
  className?: string;
}

export function QuoteCTA({ variant = "inline", productName, className }: QuoteCTAProps) {
  const phoneHref = `tel:${CONTACT.PHONE_RAW}`;
  const zaloHref = CONTACT.ZALO;

  if (variant === "sticky") {
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex gap-2 p-3 md:hidden",
          "bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl",
          className
        )}
      >
        <Link href={phoneHref} className="flex-1">
          <Button
            variant="outline"
            className="w-full gap-2 border-brand font-semibold text-brand hover:bg-brand/5"
            id="sticky-call-btn"
          >
            <Phone className="h-4 w-4" />
            Gọi Ngay
          </Button>
        </Link>
        <Link href={zaloHref} className="flex-1" target="_blank" rel="noopener noreferrer">
          <Button
            className="w-full gap-2 bg-brand hover:bg-brand/90 font-semibold"
            id="sticky-quote-btn"
          >
            <MessageCircle className="h-4 w-4" />
            Báo Giá Zalo
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-wrap gap-4", className)}>
        <Link href={zaloHref} target="_blank" rel="noopener noreferrer">
          <Button
            size="lg"
            className="group relative gap-3 bg-brand-accent hover:bg-white text-brand px-10 py-8 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-accent/20 transition-all hover:scale-105 active:scale-95 rounded-2xl overflow-hidden"
            id="hero-quote-btn"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <MessageCircle className="h-5 w-5 relative z-10" />
            <span className="relative z-10">Báo Giá Zalo</span>
            <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href={phoneHref}>
          <Button
            size="lg"
            variant="outline"
            className="gap-3 border-2 border-white/20 bg-white/5 px-10 py-8 text-sm font-black uppercase tracking-[0.2em] text-white backdrop-blur-md hover:bg-white hover:text-brand hover:border-transparent transition-all hover:scale-105 active:scale-95 rounded-2xl"
            id="hero-call-btn"
          >
            <Phone className="h-5 w-5" />
            {CONTACT.PHONE_PRIMARY}
          </Button>
        </Link>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={cn("flex gap-2", className)}>
        <Link href={phoneHref} className="flex-1">
          <Button
            variant="outline"
            className="w-full gap-1.5 text-sm border-brand/30 text-brand hover:bg-brand/5"
            id={`card-call-${productName?.slice(0, 10) ?? "btn"}`}
          >
            <Phone className="h-3.5 w-3.5" />
            Gọi
          </Button>
        </Link>
        <Link href={zaloHref} className="flex-1" target="_blank" rel="noopener noreferrer">
          <Button
            className="w-full gap-1.5 text-sm bg-brand hover:bg-brand/90"
            id={`card-quote-${productName?.slice(0, 10) ?? "btn"}`}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Báo Giá
          </Button>
        </Link>
      </div>
    );
  }

  // inline
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <Link href={phoneHref}>
        <Button
          size="lg"
          variant="outline"
          className="gap-2 border-brand text-brand hover:bg-brand/5 font-semibold"
          id="inline-call-btn"
        >
          <Phone className="h-5 w-5" />
          {CONTACT.PHONE_PRIMARY}
        </Button>
      </Link>
      <Link href={zaloHref} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className="gap-2 bg-brand hover:bg-brand/90 font-semibold shadow-lg shadow-brand/25"
          id="inline-quote-btn"
        >
          <MessageCircle className="h-5 w-5" />
          Nhận Báo Giá Zalo
        </Button>
      </Link>
    </div>
  );
}
