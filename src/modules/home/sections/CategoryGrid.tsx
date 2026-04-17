"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/modules/category/data/categories";
import { ROUTES } from "@/shared/constants/routes";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";

export function CategoryGrid() {
  const featuredCategories = CATEGORIES.filter(c => c.featured);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className={cn("mx-auto px-6", MAX_WIDTH.CONTAINER)}>
        <div className="flex items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-brand md:text-4xl tracking-tight">
              Danh Mục <span className="text-brand-accent">Nổi Bật</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Lựa chọn hoàn hảo cho mọi nhu cầu hoàn thiện ngôi nhà của bạn với đa dạng mẫu mã và phân khúc.
            </p>
          </div>
          <Link href={ROUTES.CATEGORY} className="hidden md:block">
            <Button variant="outline" className="gap-2 border-brand/20 hover:bg-brand hover:text-white group">
              Xem tất cả danh mục
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[280px]">
          {featuredCategories.map((cat, idx) => (
            <Link 
              key={cat.id} 
              href={`${ROUTES.CATEGORY}/${cat.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-muted transition-all duration-500 hover:shadow-2xl hover:-translate-y-1",
                idx === 0 ? "lg:col-span-8 lg:row-span-2" : "lg:col-span-4 lg:row-span-1"
              )}
            >
              <Image
                src={cat.image || `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800`}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/20 to-transparent p-10 flex flex-col justify-end">
                 <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                  <div className="h-12 w-12 rounded-full glass flex items-center justify-center text-white">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-3 transition-transform duration-500">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl filter drop-shadow-lg transform group-hover:scale-125 transition-transform duration-500 origin-left">{cat.icon}</span>
                    <div className="h-px w-8 bg-brand-accent/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      {cat.productCount}+ Sản phẩm
                    </p>
                    <h3 className={cn(
                      "font-black text-white tracking-tight leading-none",
                      idx === 0 ? "text-3xl md:text-4xl" : "text-2xl"
                    )}>{cat.name}</h3>
                  </div>

                  <p className={cn(
                    "text-white/60 line-clamp-2 max-w-sm transition-all duration-500",
                    idx === 0 ? "text-base opacity-100 mt-4" : "text-sm opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden"
                  )}>
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
