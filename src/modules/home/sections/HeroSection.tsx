"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { QuoteCTA } from "@/components/common/QuoteCTA";
import { MAX_WIDTH } from "@/shared/constants/ui";

export function HeroSection() {
  return (
    <section className="relative h-[650px] md:h-[800px] w-full overflow-hidden bg-brand">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070"
          alt="Premium Showroom"
          fill
          className="object-cover opacity-30 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/90 to-transparent" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
      </div>

      <div className={cn("relative z-10 mx-auto flex h-full items-center px-6", MAX_WIDTH.CONTAINER)}>
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="max-w-2xl space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-accent/20 px-4 py-2 text-xs font-bold tracking-[0.2em] text-brand-accent uppercase border border-brand-accent/20 backdrop-blur-sm animate-slide-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                Showroom Cao Cấp Hải Linh
              </div>
              <h1 className="text-5xl font-black text-white md:text-7xl leading-[1.05] animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                Kiến Tạo <br />
                <span className="text-brand-accent italic">Đẳng Cấp</span> <br />
                Mọi Công Trình
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed font-medium animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                Sản phẩm nhập khẩu chính hãng từ Châu Âu. Giải pháp toàn diện cho phòng tắm, bếp và không gian nội thất sang trọng.
              </p>
            </div>

            <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
              <QuoteCTA variant="hero" />
            </div>

            <div className="flex items-center gap-10 pt-6 border-t border-white/10 animate-slide-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <div className="space-y-1 group cursor-default">
                <p className="text-3xl font-black text-white group-hover:text-brand-accent transition-colors">15+</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Năm Uy Tín</p>
              </div>
              <div className="space-y-1 group cursor-default">
                <p className="text-3xl font-black text-white group-hover:text-brand-accent transition-colors">100%</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Chính Hãng</p>
              </div>
              <div className="space-y-1 group cursor-default">
                <p className="text-3xl font-black text-white group-hover:text-brand-accent transition-colors">50k+</p>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Tin Dùng</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="hidden lg:block relative h-[500px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px] animate-pulse" />
            <div className="relative z-10 w-full h-full glass border-white/20 rounded-[40px] overflow-hidden shadow-2xl animate-float">
               <Image
                src="https://images.unsplash.com/photo-1556912177-c54030639a4c?q=80&w=2070"
                alt="Luxury Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-dark rounded-2xl border-white/10">
                <p className="text-white font-bold text-lg">BST Gạch ốp lát 2024</p>
                <p className="text-white/60 text-sm">Phong cách hiện đại từ Ý & Tây Ban Nha</p>
              </div>
            </div>
            
            {/* Small Floating Card */}
            <div className="absolute -bottom-6 -right-6 z-20 glass p-5 rounded-2xl shadow-premium border-white/50 w-48 animate-float" style={{ animationDelay: '-2s' }}>
                <div className="flex -space-x-2 mb-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" width={32} height={32} />
                    </div>
                  ))}
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-brand text-[10px] flex items-center justify-center text-white font-bold">+1k</div>
                </div>
                <p className="text-[10px] font-bold text-brand/60 uppercase tracking-widest">Khách hàng mới</p>
                <p className="text-sm font-black text-brand">Hôm nay</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
