"use client";

import Image from "next/image";
import Link from "next/link";
import { QuoteCTA } from "@/components/common/QuoteCTA";
import { RatingStars } from "@/components/common/RatingStars";
import { ProductCard } from "@/modules/product";
import { formatPrice, cn } from "@/lib/utils";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { ROUTES } from "@/shared/constants/routes";
import { 
  ChevronRight, 
  Share2, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle2,
  Info,
  ShoppingBag,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/modules/cart";
import { useState, useEffect } from "react";
import { type Product } from "@/modules/product/types";
import { type Category } from "@/modules/category/types";

interface ProductDetailContentProps {
  product: Product;
  category?: Category;
  relatedProducts: Product[];
}

export function ProductDetailContent({ product, category, relatedProducts }: ProductDetailContentProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]?.id);
  const [scrolled, setScrolled] = useState(false);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#fcfcfc] pb-20">
      {/* ── Sticky Action Bar ── */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-lg transition-all duration-500 py-3",
        scrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className={cn("mx-auto px-6 flex items-center justify-between gap-6", MAX_WIDTH.CONTAINER)}>
          <div className="flex items-center gap-4 min-w-0">
            <div className="h-12 w-12 rounded-xl border bg-muted shrink-0 overflow-hidden">
              <Image src={product.images[0].url} alt={product.name} width={48} height={48} className="object-contain p-2" />
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-black truncate">{product.name}</p>
              <p className="text-xs text-brand font-black">{formatPrice(product.price)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-xl">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-3 w-3" /></Button>
                <span className="w-8 text-center text-xs font-black">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}><Plus className="h-3 w-3" /></Button>
            </div>
            <Button 
               size="sm"
               className="bg-brand hover:bg-[#1a2d4d] text-white font-black text-[10px] px-6 rounded-xl uppercase h-10"
               onClick={() => addItem(product, quantity, selectedVariant)}
            >
              Thêm Giỏ Hàng
            </Button>
          </div>
        </div>
      </div>

      {/* ── Breadcrumbs ── */}
      <div className="bg-white border-b">
        <div className={cn("mx-auto px-6 py-4", MAX_WIDTH.CONTAINER)}>
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-brand transition-colors">Trang chủ</Link>
            <ChevronRight className="h-2.5 w-2.5 shrink-0" />
            <Link href={`${ROUTES.CATEGORY}/${product.categorySlug}`} className="hover:text-brand transition-colors text-brand/80">{category?.name}</Link>
            <ChevronRight className="h-2.5 w-2.5 shrink-0" />
            <span className="text-foreground font-black truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className={cn("mx-auto px-6 py-10", MAX_WIDTH.CONTAINER)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-[3rem] bg-white border border-border/40 shadow-sm group">
              <Image 
                src={product.images[0].url} 
                alt={product.images[0].alt} 
                fill 
                className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute top-8 right-8 flex flex-col gap-3">
                <Button variant="outline" size="icon" className="rounded-2xl h-11 w-11 bg-white hover:bg-brand hover:text-white border-border/40 shadow-xl shadow-black/5 transition-all">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-2xl h-11 w-11 bg-white hover:bg-brand hover:text-white border-border/40 shadow-xl shadow-black/5 transition-all">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
              {product.isNew && (
                 <div className="absolute top-8 left-8">
                   <Badge className="bg-brand text-white border-none font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-lg shadow-brand/20">Mới Nhất</Badge>
                 </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <div key={img.id} className={cn(
                  "relative aspect-square rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-500 hover:shadow-lg",
                  i === 0 ? "border-brand p-1" : "border-transparent opacity-50 hover:opacity-100"
                )}>
                  <div className="w-full h-full relative rounded-[calc(1.5rem-4px)] overflow-hidden bg-white">
                    <Image src={img.url} alt={img.alt} fill className="object-cover p-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border/40" />
                <Badge variant="outline" className="text-brand border-brand/20 bg-brand/5 px-3 py-1 font-black uppercase tracking-[0.2em] text-[10px] rounded-full">
                  {product.brand}
                </Badge>
                <div className="h-px flex-1 bg-border/40" />
              </div>

              <h1 className="text-4xl font-black text-brand md:text-5xl leading-[1.1] tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
                </div>
                <div className="h-4 w-px bg-border/60" />
                <div className="flex items-center gap-2 group cursor-pointer">
                   <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-green-600 transition-colors">
                    Đã bán <span className="text-foreground">{product.soldCount}+</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-brand p-10 text-white shadow-2xl shadow-brand/20">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShoppingBag className="h-32 w-32 -rotate-12" />
              </div>
              <div className="relative z-10 space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-2xl text-white/40 line-through decoration-brand-accent/50">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <p className="text-xs text-white/60 font-medium">Lắp đặt cơ bản: 200.000đ - Miễn phí khảo sát</p>
              </div>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-1">Tùy Chọn Kích Thước</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={cn(
                        "px-6 py-3 rounded-2xl border-2 text-sm font-black transition-all duration-300",
                        selectedVariant === v.id
                          ? "border-brand bg-brand text-white shadow-lg shadow-brand/20"
                          : "border-border/50 hover:border-brand/40 text-muted-foreground hover:bg-brand/5"
                      )}
                    >
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 px-6 py-4 bg-white border border-border/40 rounded-3xl shadow-sm group hover:border-green-500/30 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Trạng thái</span>
                    <span className="text-sm font-black text-green-600">Sẵn hàng tại HCM</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-white border border-border/40 rounded-3xl shadow-sm group hover:border-brand/30 transition-all">
                   <div className="h-10 w-10 rounded-2xl bg-brand/5 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Giao hàng</span>
                    <span className="text-sm font-black text-brand">Vận chuyển toàn quốc</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-2xl border border-border/40">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-xl hover:bg-white hover:shadow-md transition-all"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-black">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-xl hover:bg-white hover:shadow-md transition-all"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                   size="lg"
                  className="w-full sm:flex-1 h-14 rounded-2xl bg-brand hover:bg-[#1a2d4d] text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand/20 transition-all flex items-center justify-center gap-3 transform active:scale-95"
                  onClick={() => addItem(product, quantity, selectedVariant)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  MUA NGAY
                </Button>
                
                <QuoteCTA variant="inline" className="w-full sm:w-auto" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 py-6 px-10 border border-border/40 rounded-[2.5rem] bg-white">
              <div className="flex flex-col items-center gap-3 text-center group">
                <div className="p-3 rounded-full bg-brand/5 group-hover:bg-brand transition-all group-hover:text-white text-brand">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-tight">Bảo hành 12-36 tháng</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group">
                 <div className="p-3 rounded-full bg-brand/5 group-hover:bg-brand transition-all group-hover:text-white text-brand">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-tight">30 ngày đổi trả miễn phí</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group">
                 <div className="p-3 rounded-full bg-brand/5 group-hover:bg-brand transition-all group-hover:text-white text-brand">
                  <Info className="h-6 w-6" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground leading-tight">Hỗ trợ kỹ thuật 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Content */}
        <div className="mt-32">
          <Tabs defaultValue="details" className="w-full">
            <div className="flex justify-center border-b border-border/40 mb-10">
              <TabsList className="bg-transparent h-auto p-0 gap-12">
                <TabsTrigger 
                  value="details" 
                  className="rounded-none border-b-2 border-transparent px-2 py-6 font-black uppercase tracking-[0.2em] text-xs data-[state=active]:border-brand data-[state=active]:text-brand bg-transparent transition-all"
                >
                  Mô Tả Sản Phẩm
                </TabsTrigger>
                <TabsTrigger 
                  value="specs" 
                  className="rounded-none border-b-2 border-transparent px-2 py-6 font-black uppercase tracking-[0.2em] text-xs data-[state=active]:border-brand data-[state=active]:text-brand bg-transparent transition-all"
                >
                  Thông Số Kỹ Thuật
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent px-2 py-6 font-black uppercase tracking-[0.2em] text-xs data-[state=active]:border-brand data-[state=active]:text-brand bg-transparent transition-all"
                >
                  Đánh Giá ({product.reviewCount})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="details" className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-4xl mx-auto prose prose-slate">
                <div className="flex items-center gap-4 mb-10">
                   <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand/20" />
                   <h3 className="text-2xl font-black text-brand uppercase tracking-widest text-center px-6">Đặc Điểm Nổi Bật</h3>
                   <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand/20" />
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line text-center mb-16">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.tags.map(tag => (
                    <div key={tag} className="flex items-center gap-4 p-6 bg-white border border-border/40 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                      <div className="h-4 w-4 rounded-full bg-brand-accent shadow-lg shadow-brand-accent/30 shrink-0" />
                      <span className="text-sm font-black text-brand uppercase tracking-wider">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="max-w-3xl mx-auto overflow-hidden rounded-[2.5rem] border border-border/40 bg-white shadow-xl shadow-black/5">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr key={spec.label} className={cn(i % 2 === 0 ? "bg-white" : "bg-muted/30")}>
                        <td className="px-10 py-6 font-black text-brand uppercase tracking-[0.1em] text-[10px] w-1/3 border-r border-border/40">{spec.label}</td>
                        <td className="px-10 py-6 font-bold text-foreground/80">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-32 pt-24 border-t border-border/40">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.4em]">Bộ sưu tập</p>
              <h2 className="text-4xl font-black text-brand tracking-tight">Sản Phẩm <span className="text-brand-accent italic">Bổ Trợ</span></h2>
            </div>
            <Link href={`${ROUTES.CATEGORY}/${product.categorySlug}`} className="group hidden md:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-brand transition-all">
              Khám phá thêm
              <div className="h-10 w-10 rounded-full border border-brand/20 flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
                <ChevronRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
