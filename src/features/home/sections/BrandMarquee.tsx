"use client";

import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";

const BRANDS = [
  "TOTO", "INAX", "VIGLACERA", "PRIME", "TAICERA", "KOHLER", "GROHE", "CAESAR", "COTTO"
];

export function BrandMarquee() {
  return (
    <section className="py-12 bg-white border-y border-border/40 overflow-hidden">
      <div className={cn("mx-auto px-6 mb-8", MAX_WIDTH.CONTAINER)}>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-muted-foreground/60">
          Đối Tác Chiến Lược Của Các Thương Hiệu Hàng Đầu
        </p>
      </div>

      <div className="flex overflow-hidden group">
        <div className="flex animate-scroll whitespace-nowrap gap-12 sm:gap-24 items-center py-4">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span 
              key={i} 
              className="text-2xl sm:text-4xl font-black text-muted-foreground/20 hover:text-brand transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
