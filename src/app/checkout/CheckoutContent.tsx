"use client";

import { useCartStore } from "@/modules/cart";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn, formatPrice } from "@/lib/utils";
import { ChevronRight, ShieldCheck, Truck, CreditCard, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ROUTES } from "@/shared/constants/routes";
import { useEffect, useState } from "react";

export function CheckoutContent() {
  const [mounted, setMounted] = useState(false);
  const { items, getTotalPrice } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
        <h1 className="text-3xl font-black">Giỏ hàng của bạn đang trống</h1>
        <p className="text-muted-foreground">Vui lòng thêm sản phẩm vào giỏ để tiếp tục thanh toán.</p>
        <Link href={ROUTES.HOME}>
          <Button className="rounded-2xl h-12 px-8 bg-brand font-black text-white">Quay về trang chủ</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto px-6 py-12 lg:py-20", MAX_WIDTH.CONTAINER)}>
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
          <Link href={ROUTES.CART} className="hover:text-brand flex items-center gap-2">Giỏ hàng</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Thanh toán</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-sm">1</span>
                Thông tin giao hàng
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <Input id="fullname" placeholder="Nguyễn Văn A" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="09xx xxx xxx" className="h-12 rounded-xl" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="email">Email (tùy chọn)</Label>
                  <Input id="email" type="email" placeholder="example@gmail.com" className="h-12 rounded-xl" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="address">Địa chỉ chi tiết</Label>
                  <Input id="address" placeholder="Số nhà, ngõ, tên đường..." className="h-12 rounded-xl" />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                  <Textarea id="note" placeholder="Yêu cầu đặc biệt về đơn hàng..." className="rounded-xl min-h-[100px]" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-sm">2</span>
                Phương thức thanh toán
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "cod", label: "Thanh toán khi nhận hàng (COD)", icon: Truck },
                  { id: "bank", label: "Chuyển khoản ngân hàng", icon: CreditCard },
                ].map((method) => (
                  <label 
                    key={method.id}
                    className="flex items-center gap-4 p-5 rounded-2xl border-2 border-border/50 hover:border-brand/40 cursor-pointer transition-all has-[:checked]:border-brand has-[:checked]:bg-brand/5 group"
                  >
                    <input type="radio" name="payment" value={method.id} className="h-5 w-5 accent-brand" defaultChecked={method.id === "cod"} />
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted group-hover:bg-brand/10 transition-colors">
                      <method.icon className="h-5 w-5 text-brand" />
                    </div>
                    <span className="font-bold">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full h-16 rounded-2xl bg-brand hover:bg-[#1a2d4d] text-white font-black text-lg shadow-xl shadow-brand/20">
              ĐẶT HÀNG NGAY
            </Button>
          </div>

          <div className="space-y-8">
            <div className="p-10 rounded-4xl bg-muted/30 border border-border/50 space-y-8">
              <h3 className="text-xl font-black border-b pb-6">Đơn hàng của bạn</h3>
              <div className="space-y-6 max-h-[400px] overflow-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 rounded-xl bg-white border border-border/50 overflow-hidden">
                      <Image src={item.images[0].url} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">Số lượng: {item.quantity}</p>
                      <p className="font-black text-brand text-sm mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t font-medium">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tạm tính</span>
                  <span className="text-foreground">{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Phí vận chuyển</span>
                  <span className="text-emerald-600 font-bold">Miễn phí</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t">
                  <span className="font-black text-lg">Tổng thanh toán</span>
                  <span className="text-2xl font-black text-brand">{formatPrice(getTotalPrice())}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border">
                <ShieldCheck className="h-6 w-6 text-emerald-500 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Bảo mật</p>
                <p className="text-xs font-bold leading-tight">An toàn 100%</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-white border">
                <Truck className="h-6 w-6 text-brand mb-3" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Giao hàng</p>
                <p className="text-xs font-bold leading-tight">Nhanh chóng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
