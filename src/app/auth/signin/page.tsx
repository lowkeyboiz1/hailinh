import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE } from "@/shared/constants/ui";
import { ROUTES } from "@/shared/constants/routes";
import { ShieldCheck, ArrowRight, Globe } from "lucide-react";
import NextLink from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100-80px)] flex flex-col items-center justify-center p-6 bg-[#fcfcfc]">
      <div className="w-full max-w-md space-y-8 p-10 rounded-[3rem] bg-white border border-border/50 shadow-premium relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-12 translate-x-12 blur-2xl" />
        
        <div className="text-center space-y-2 relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white font-black text-xl mx-auto shadow-lg shadow-brand/20 mb-6">
            HL
          </div>
          <h1 className="text-3xl font-black tracking-tight">{SITE.NAME} Account</h1>
          <p className="text-muted-foreground font-medium">Đăng nhập để quản lý đơn hàng và nhận ưu đãi</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" className="h-12 rounded-xl focus:ring-brand/20" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <button className="text-xs font-bold text-brand hover:underline underline-offset-4">Quên mật khẩu?</button>
            </div>
            <Input id="password" type="password" className="h-12 rounded-xl focus:ring-brand/20" />
          </div>
          
          <Button className="w-full h-14 rounded-2xl bg-brand hover:bg-[#1a2d4d] text-white font-black text-base shadow-xl shadow-brand/10 transition-all group">
            ĐĂNG NHẬP
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest bg-white px-4 text-muted-foreground/60">Hoặc tiếp tục với</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 rounded-xl border-border/60 hover:bg-muted font-bold flex gap-2">
              <div className="h-4 w-4 rounded-full bg-blue-500" /> Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-border/60 hover:bg-muted font-bold flex gap-2">
              <Globe className="h-4 w-4" /> Github
            </Button>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-muted-foreground relative z-10">
          Chưa có tài khoản?{" "}
          <NextLink href="#" className="font-black text-brand hover:underline underline-offset-4">Đăng ký ngay</NextLink>
        </p>

        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest pt-4 border-t border-border/40">
          <ShieldCheck className="h-3 w-3" /> Bảo mật và mã hóa chuẩn SSL
        </div>
      </div>
    </div>
  );
}
