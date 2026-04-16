"use client";

import { useCartStore } from "@/features/cart/store/useCartStore";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn, formatPrice } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("mx-auto px-6 py-12 md:py-20", MAX_WIDTH.CONTAINER)}>
      <div className="flex flex-col gap-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight">Giỏ Hàng Của Bạn</h1>
          <p className="text-muted-foreground font-medium">Bạn có {getTotalItems()} sản phẩm trong giỏ hàng</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedVariantId}`}
                  className="flex gap-6 p-6 rounded-3xl bg-white border border-border/50 hover:shadow-xl hover:shadow-black/5 transition-all group"
                >
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 rounded-2xl bg-muted overflow-hidden border">
                    <Image
                      src={item.images[0].url}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-[10px] font-black uppercase text-brand tracking-widest mb-1">{item.brand}</p>
                          <Link 
                            href={`${ROUTES.PRODUCT}/${item.slug}`}
                            className="text-lg font-bold hover:text-brand transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                      <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-2xl border border-border/50">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl hover:bg-white"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-black">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-xl hover:bg-white"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xl font-black text-brand">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-4xl bg-[#0f172a] text-white shadow-2xl">
                <h2 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Tóm tắt đơn hàng</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Tạm tính</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Vận chuyển</span>
                    <span className="text-emerald-400 font-bold">Miễn phí</span>
                  </div>
                  <div className="h-px bg-white/10 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="font-bold">Tổng cộng</span>
                    <span className="text-3xl font-black text-brand-accent">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                
                <Link href={ROUTES.CHECKOUT} className="mt-10 block">
                  <Button className="w-full h-14 rounded-2xl bg-brand-accent hover:bg-white hover:text-brand text-brand font-black text-base transition-all group shadow-xl shadow-brand-accent/20">
                    THANH TOÁN NGAY
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <p className="text-center text-[10px] text-white/40 mt-6 uppercase tracking-widest font-bold">
                  Bảo mật • An toàn • Nhanh chóng
                </p>
              </div>

              <div className="p-8 rounded-4xl bg-brand/5 border border-brand/10 space-y-4">
                <p className="text-xs font-bold text-brand uppercase tracking-wider">Hỗ trợ trả góp</p>
                <p className="text-sm font-medium text-muted-foreground">
                  Hải Linh hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng cho đơn hàng từ 10.000.000đ.
                </p>
                <Link href={CONTACT.ZALO} className="text-xs font-black text-brand underline decoration-brand/30 underline-offset-4">Tìm hiểu thêm</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-24 text-center space-y-8 max-w-md mx-auto">
            <div className="h-32 w-32 bg-muted rounded-full flex items-center justify-center mx-auto animate-float">
              <ShoppingBag className="h-14 w-14 text-muted-foreground/40" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black">Giỏ hàng đang trống</h3>
              <p className="text-muted-foreground font-medium">
                Có vẻ như bạn chưa chọn được sản phẩm nào ưng ý. Hãy tiếp tục khám phá các bộ sưu tập của Hải Linh nhé!
              </p>
            </div>
            <Link href={ROUTES.HOME}>
              <Button className="h-14 px-10 rounded-2xl bg-brand font-black">TIẾP TỤC MUA SẮM</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import { CONTACT } from "@/shared/constants/contact";
