import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand/5 -skew-y-3 origin-right scale-110" />
      
      <div className={cn("mx-auto px-6 relative z-10", MAX_WIDTH.CONTAINER)}>
        <div className="max-w-4xl mx-auto rounded-[3rem] bg-[#0f172a] p-8 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Nhận Ưu Đãi <span className="text-brand-accent">Đặc Quyền</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Đăng ký nhận bản tin để không bỏ lỡ xu hướng kiến trúc mới nhất và các chương trình khuyến mãi độc quyền từ Hải Linh.
            </p>
          </div>

          <form className="relative z-10 max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <Input 
              type="email" 
              placeholder="Email của bạn..." 
              className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-brand-accent/50 focus-visible:border-brand-accent/50"
            />
            <Button className="h-14 px-8 rounded-2xl bg-brand-accent hover:bg-white hover:text-brand text-brand font-black group transition-all shrink-0">
              ĐĂNG KÝ
              <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </form>

          <p className="relative z-10 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
            Chúng tôi cam kết bảo mật thông tin 100%
          </p>
        </div>
      </div>
    </section>
  );
}
