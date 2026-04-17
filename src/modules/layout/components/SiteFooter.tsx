import { CONTACT, SOCIAL_LINKS } from "@/shared/constants/contact";
import { cn } from "@/lib/utils";
import { CATEGORY_SLUGS, ROUTES } from "@/shared/constants/routes";
import { SITE } from "@/shared/constants/ui";
import { Mail, MapPin, Phone, Globe, Video, Camera, Clock } from "lucide-react";
import Link from "next/link";

const FOOTER_CATEGORIES = [
  { name: "Gạch Ốp Lát", href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.TILES}` },
  {
    name: "Thiết Bị Vệ Sinh",
    href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.BATHROOM}`,
  },
  {
    name: "Thiết Bị Nhà Bếp",
    href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.KITCHEN}`,
  },
  {
    name: "Vật Liệu Xây Dựng",
    href: `${ROUTES.CATEGORY}/${CATEGORY_SLUGS.HOME_IMPROVEMENT}`,
  },
] as const;

const FOOTER_POLICIES = [
  { name: "Chính Sách Bảo Hành", href: "#bao-hanh" },
  { name: "Chính Sách Đổi Trả", href: "#doi-tra" },
  { name: "Chính Sách Vận Chuyển", href: "#van-chuyen" },
  { name: "Hướng Dẫn Mua Hàng", href: "#huong-dan" },
  { name: "Chính Sách Bảo Mật", href: "#bao-mat" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-[#050608] text-white border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-y-12 gap-x-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1 space-y-8">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand font-black text-xl shadow-lg ring-1 ring-white/10">
                HL
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-white">
                {SITE.NAME}
                <span className="text-brand-accent">.</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed pr-6 font-medium">
              {SITE.DESCRIPTION}
            </p>
          </div>

          {/* Nav Categories */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-brand-accent pl-3">
              Sản Phẩm
            </h4>
            <ul className="space-y-4">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm font-medium text-gray-400 hover:text-white hover:translate-x-1 transition-all block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-brand-accent pl-3">
              Thông Tin
            </h4>
            <ul className="space-y-4">
              {FOOTER_POLICIES.map((policy) => (
                <li key={policy.href}>
                  <Link
                    href={policy.href}
                    className="text-sm font-medium text-gray-400 hover:text-white hover:translate-x-1 transition-all block"
                  >
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 lg:col-span-2 space-y-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-8 border-l-2 border-brand-accent pl-3">
              Ghé Thăm Showroom
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-accent shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-gray-500 mb-1 leading-none tracking-wider">
                      Trụ sở chính
                    </p>
                    <p className="text-sm font-bold text-gray-200 leading-relaxed">
                      {CONTACT.ADDRESS_1}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-accent/70 shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-gray-500 mb-1 leading-none tracking-wider">
                      Cơ sở 02
                    </p>
                    <p className="text-sm font-bold text-gray-200 leading-relaxed">
                      {CONTACT.ADDRESS_2}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <Link
                  href={`tel:${CONTACT.PHONE_RAW}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-accent/10 border border-brand-accent/20 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand transition-all shadow-lg shadow-brand-accent/5">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-gray-500 mb-1 leading-none tracking-wider">
                      Hotline 24/7
                    </p>
                    <p className="text-xl font-black text-white group-hover:text-brand-accent transition-colors tabular-nums">
                      {CONTACT.PHONE_PRIMARY}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 shadow-sm">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black text-gray-500 mb-1 leading-none tracking-wider">
                      Giờ làm việc
                    </p>
                    <p className="text-sm font-bold text-gray-200">
                      {CONTACT.WORKING_HOURS}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {SITE.NAME} STORE <span className="mx-2 text-white/10">|</span> All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            <Link
              href="#"
              className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Sitemap
            </Link>
            <Link
              href="#"
              className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


