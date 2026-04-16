"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QuoteCTA } from "@/shared/components/common/QuoteCTA";
import { RatingStars } from "@/shared/components/common/RatingStars";
import { formatPrice, cn } from "@/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import { type Product } from "@/features/product/types";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className={cn("group overflow-hidden border-border/40 bg-white transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 rounded-3xl", className)}>
      <Link href={`${ROUTES.PRODUCT}/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[#F8F9FA]">
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2 z-10 transition-transform duration-500 group-hover:translate-x-1">
          {product.isNew && (
            <Badge className="bg-brand text-white border-none font-black uppercase tracking-[0.2em] text-[8px] px-2.5 py-1 rounded-full shadow-lg shadow-brand/20">
              NEW
            </Badge>
          )}
          {product.isOnSale && (
            <Badge className="bg-[#E11D48] text-white border-none font-black uppercase tracking-[0.2em] text-[8px] px-2.5 py-1 rounded-full shadow-lg shadow-red-500/20">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-brand/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
           <div className="bg-white text-brand p-3 rounded-2xl shadow-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 hover:bg-brand hover:text-white cursor-pointer hover:scale-110 active:scale-95">
              <ShoppingBag className="h-5 w-5" />
           </div>
           <div className="bg-white text-brand p-3 rounded-2xl shadow-xl translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75 hover:bg-brand hover:text-white cursor-pointer hover:scale-110 active:scale-95">
              <Eye className="h-5 w-5" />
           </div>
        </div>
      </Link>

      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand/60">{product.brand}</p>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        
        <Link href={`${ROUTES.PRODUCT}/${product.slug}`} className="block h-12 overflow-hidden group/title">
          <h3 className="text-sm font-bold leading-snug text-foreground group-hover/title:text-brand transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-3 pt-1">
          <span className="text-lg font-black text-brand tracking-tight">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-muted-foreground/60 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <QuoteCTA variant="card" productName={product.name} className="w-full" />
      </CardFooter>
    </Card>
  );
}

