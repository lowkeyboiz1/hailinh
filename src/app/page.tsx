import { HeroSection } from "@/features/home/sections/HeroSection";
import { CategoryGrid } from "@/features/home/sections/CategoryGrid";
import { ShowroomGallery } from "@/features/home/sections/ShowroomGallery";
import { FeaturedProducts } from "@/features/home/sections/FeaturedProducts";
import { PromoSection } from "@/features/home/sections/PromoSection";
import { WhyChooseUs } from "@/features/home/sections/WhyChooseUs";
import { BrandMarquee } from "@/features/home/sections/BrandMarquee";
import { Newsletter } from "@/features/home/sections/Newsletter";
import { QuoteCTA } from "@/shared/components/common/QuoteCTA";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import { Reveal } from "@/shared/components/common/Reveal";
import { ShieldCheck, Truck, Headphones, BadgeCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      
      {/* ── Trust Section ── */}
      <section className="bg-white border-b">
        <div className={cn("mx-auto px-6 py-12", MAX_WIDTH.CONTAINER)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Chính Hãng 100%", desc: "Hoàn tiền 200% nếu phát hiện giả" },
              { icon: Truck, title: "Vận Chuyển Toàn Quốc", desc: "Miễn phí nội thành với đơn từ 5tr" },
              { icon: Headphones, title: "Hỗ Trợ 24/7", desc: "Tư vấn kỹ thuật tận tâm, chuyên nghiệp" },
              { icon: BadgeCheck, title: "Bảo Hành Dài Hạn", desc: "Theo đúng tiêu chuẩn của nhà sản xuất" },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 100}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/5 text-brand">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Reveal><CategoryGrid /></Reveal>
      <Reveal><ShowroomGallery /></Reveal>
      <Reveal><BrandMarquee /></Reveal>
      <Reveal><FeaturedProducts /></Reveal>
      <Reveal><PromoSection /></Reveal>
      <Reveal><WhyChooseUs /></Reveal>
      <Reveal><Newsletter /></Reveal>

      {/* ── CTA Banner ── */}
      <Reveal className="py-20 md:py-32">
        <div className={cn("mx-auto px-6", MAX_WIDTH.CONTAINER)}>
          <div className="relative overflow-hidden rounded-[40px] bg-brand p-16 text-white shadow-2xl shadow-brand/20">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--brand-accent)_0%,_transparent_70%)]" />
            </div>
            <div className="relative z-10 max-w-3xl space-y-8">
              <h2 className="text-4xl font-black md:text-6xl leading-tight tracking-tight">
                Bạn Đang Tìm Giải Pháp <br /> 
                <span className="text-brand-accent italic">Cho Công Trình</span> Của Mình?
              </h2>
              <p className="text-white/60 text-xl font-medium leading-relaxed">
                Hãy để chuyên gia của Hải Linh tư vấn mẫu mã, kỹ thuật và cung cấp báo giá cạnh tranh nhất cho dự án của bạn.
              </p>
              <div className="pt-4">
                <QuoteCTA variant="hero" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
