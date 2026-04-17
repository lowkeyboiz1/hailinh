"use client";

import { ProductCard } from "@/modules/product/components/ProductCard";
import { FEATURED_PRODUCTS } from "@/modules/product/data/products";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function FeaturedProducts() {
  return (
    <section className="py-20 md:py-28 bg-[#f8f9fa]">
      <div className={cn("mx-auto px-6", MAX_WIDTH.CONTAINER)}>
        <div className="text-center space-y-4 mb-14">
          <Badge className="bg-brand/10 text-brand border-none px-4 py-1 font-bold uppercase tracking-widest text-[10px]">
            Best Sellers
          </Badge>
          <h2 className="text-4xl font-black text-brand tracking-tight">Sản Phẩm <span className="text-brand-accent">Tiêu Biểu</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Những thiết bị vệ sinh, gạch ốp lát được khách hàng tin dùng và đánh giá cao nhất trong tháng này.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-white border p-1 h-auto rounded-full shadow-sm">
              <TabsTrigger value="all" className="rounded-full px-8 py-2.5 data-[state=active]:bg-brand data-[state=active]:text-white transition-all font-semibold">Tất cả</TabsTrigger>
              <TabsTrigger value="tiles" className="rounded-full px-8 py-2.5 data-[state=active]:bg-brand data-[state=active]:text-white transition-all font-semibold">Gạch Ốp Lát</TabsTrigger>
              <TabsTrigger value="bathroom" className="rounded-full px-8 py-2.5 data-[state=active]:bg-brand data-[state=active]:text-white transition-all font-semibold">Phòng Tắm</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tiles" className="mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.filter(p => p.categorySlug === "gach-op-lat").slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="bathroom" className="mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_PRODUCTS.filter(p => p.categorySlug === "thiet-bi-ve-sinh").slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

import { Badge } from "@/components/ui/badge";
