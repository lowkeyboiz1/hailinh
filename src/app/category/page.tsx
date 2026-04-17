import { CATEGORIES } from "@/modules/category/data/categories";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Danh mục sản phẩm",
  description: "Khám phá tất cả các danh mục sản phẩm tại Hải Linh",
};

export default function CategoryListPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className={cn("mx-auto px-6 py-20 md:py-32", MAX_WIDTH.CONTAINER)}>
        <div className="space-y-20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-accent">Hệ Sinh Thái</p>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-brand">KHÔNG GIAN <span className="text-brand-accent italic">SỐNG</span></h1>
            <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              Giải pháp toàn diện từ Gạch ốp lát đến Thiết bị vệ sinh và Nhà bếp. <br className="hidden md:block" />
              Nơi hội tụ những thương hiệu hàng đầu thế giới.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {CATEGORIES.map((category) => (
              <div 
                key={category.id} 
                className="group relative overflow-hidden rounded-[3.5rem] bg-white border border-border/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 p-12 md:p-16 flex flex-col justify-between min-h-[550px]"
              >
                {/* Decorative background circle */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand/5 rounded-full group-hover:bg-brand/10 transition-all duration-700 group-hover:scale-125" />
                <div className="absolute inset-0 pattern-grid opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" />
                
                <div className="relative z-10 space-y-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-500 origin-left">{category.icon}</span>
                      <div className="h-px w-10 bg-brand-accent/40" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand/50">{category.productCount}+ Sản phẩm</p>
                    <h2 className="text-4xl font-black text-brand tracking-tight">{category.name}</h2>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed max-w-sm font-medium text-lg">
                    {category.description}
                  </p>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-5 pt-6 border-t border-border/40">
                    {category.subcategories?.slice(0, 6).map(sub => (
                      <Link 
                        key={sub.id} 
                        href={`${ROUTES.CATEGORY}/${category.slug}/${sub.slug}`}
                        className="text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-brand flex items-center gap-3 group/link transition-colors"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-brand-accent scale-0 group-hover/link:scale-100 transition-transform" />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-12">
                  <Link href={`${ROUTES.CATEGORY}/${category.slug}`}>
                    <Button className="h-14 rounded-2xl px-10 bg-brand hover:bg-[#1a2d4d] text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-brand/20 transition-all gap-4 group-hover:translate-x-2">
                      Xem Chi Tiết
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
