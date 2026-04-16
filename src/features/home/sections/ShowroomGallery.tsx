import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070",
    title: "Phòng Tắm Luxury",
    category: "Bathroom"
  },
  {
    url: "https://images.unsplash.com/photo-1556911227-8553d9e3650f?q=80&w=1974",
    title: "Bếp Hiện Đại",
    category: "Kitchen"
  },
  {
    url: "https://images.unsplash.com/photo-1616489953149-88096238354c?q=80&w=2074",
    title: "Không Gian Sống",
    category: "Living Room"
  },
  {
    url: "https://images.unsplash.com/photo-1600585154526-990dcea4db0d?q=80&w=1974",
    title: "Gạch Ốp Lát Ngoại Thất",
    category: "Outdoor"
  }
];

export function ShowroomGallery() {
  return (
    <section className="py-24 bg-white">
      <div className={cn("mx-auto px-6", MAX_WIDTH.CONTAINER)}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-black md:text-5xl tracking-tight">Cảm Hứng <span className="text-brand-accent italic">Không Gian</span></h2>
            <p className="text-muted-foreground text-lg max-w-xl">
              Khám phá thực tế các mẫu thiết kế tại hệ thống Showroom Hải Linh. Nơi kiến tạo những giá trị sống đích thực.
            </p>
          </div>
          <button className="group flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand hover:gap-5 transition-all">
            Xem toàn bộ dự án
            <MoveRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((item, i) => (
            <div 
              key={i} 
              className="group relative h-[500px] overflow-hidden rounded-[2.5rem] bg-muted cursor-pointer"
            >
              <Image 
                src={item.url} 
                alt={item.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
                <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">{item.category}</p>
                  <h3 className="text-2xl font-black text-white">{item.title}</h3>
                  <div className="h-0.5 w-0 group-hover:w-16 bg-brand-accent transition-all duration-500 delay-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
