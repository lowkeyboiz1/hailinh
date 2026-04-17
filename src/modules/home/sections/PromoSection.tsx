"use client";

import { useEffect, useState } from "react";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import { Timer, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PromoSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12">
      <div className={cn("mx-auto px-6", MAX_WIDTH.CONTAINER)}>
        <div className="relative rounded-[3rem] bg-brand p-8 md:p-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 group shadow-2xl shadow-brand/20">
          {/* Animated background blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-[100px] animate-pulse -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] animate-bounce" />

          <div className="relative z-10 flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 border border-white/20 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Flash Sale • Giới Hạn Thời Gian</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1]">
              Ưu Đãi Đặc Biệt <br /> <span className="text-brand-accent">Giảm Đến 45%</span>
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto lg:mx-0">
              Áp dụng cho các dòng gạch nhập khẩu cao cấp và thiết bị vệ sinh thông minh. Đừng bỏ lỡ cơ hội tân trang ngôi nhà với mức giá tốt nhất năm.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Button size="lg" className="h-14 px-8 rounded-2xl bg-white text-brand hover:bg-brand-accent hover:text-brand font-black group transition-all">
                MUA NGAY BÂY GIỜ
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ghost" className="h-14 px-8 rounded-2xl text-white font-black border border-white/20 hover:bg-white/10">
                XEM CHI TIẾT
              </Button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 p-10 rounded-[2.5rem] bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 text-white/60 mb-2">
              <Timer className="h-6 w-6 text-brand-accent" />
              <span className="text-sm font-black uppercase tracking-widest">Thời gian còn lại</span>
            </div>
            <div className="flex gap-4 md:gap-8">
              {[
                { label: "Ngày", value: timeLeft.days },
                { label: "Giờ", value: timeLeft.hours },
                { label: "Phút", value: timeLeft.minutes },
                { label: "Giây", value: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                    <span className="text-2xl md:text-4xl font-black text-brand tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-white/50">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
