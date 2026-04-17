import { CheckCircle2, Award, Zap, HeartHandshake } from "lucide-react";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Award,
    title: "Chất Lượng Quốc Tế",
    description: "Sản phẩm nhập khẩu từ Italy, Tây Ban Nha, Nhật Bản... đáp ứng tiêu chuẩn khắt khe nhất.",
  },
  {
    icon: Zap,
    title: "Giải Pháp Toàn Diện",
    description: "Tư vấn thiết kế và cung cấp trọn gói giải pháp cho phòng tắm, nhà bếp và không gian sống.",
  },
  {
    icon: CheckCircle2,
    title: "Bảo Hành Uy Tín",
    description: "Chính sách bảo hành dài hạn, hỗ trợ kỹ thuật 24/7 từ đội ngũ chuyên gia giàu kinh nghiệm.",
  },
  {
    icon: HeartHandshake,
    title: "Giá Cả Cạnh Tranh",
    description: "Cam kết mức giá tốt nhất thị trường cùng nhiều chương trình ưu đãi độc quyền hấp dẫn.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_var(--brand)_0%,_transparent_50%)]" />
      </div>
      
      <div className={cn("mx-auto px-6 relative z-10", MAX_WIDTH.CONTAINER)}>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">Tại Sao Nên Chọn Hải Linh?</h2>
          <p className="text-muted-foreground text-lg">
            Hơn 15 năm kiến tạo không gian sống hiện đại, chúng tôi tự hào là đối tác tin cậy của hàng ngàn công trình trên khắp cả nước.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-3xl bg-white border border-border/50 hover:border-brand/20 hover:shadow-premium transition-all duration-500"
            >
              <div className="h-14 w-14 rounded-2xl bg-brand/5 text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-500">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
