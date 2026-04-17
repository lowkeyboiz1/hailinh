import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { CONTACT } from "@/shared/constants/contact";

export function TopBar() {
  return (
    <div className="hidden md:block bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white/50 text-[10px] py-1.5 border-b border-white/5">
      <div className="mx-auto max-w-[1440px] px-6 flex items-center justify-between font-bold">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <MapPin className="h-3 w-3 text-brand-accent/50" />
            {CONTACT.ADDRESS_1}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-brand-accent/50" />
            {CONTACT.WORKING_HOURS}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href={CONTACT.ZALO}
            className="flex items-center gap-1.5 hover:text-brand-accent transition-colors"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-brand-accent animate-pulse" />
            Tư vấn trực tuyến
          </Link>
          <Link
            href={`tel:${CONTACT.PHONE_RAW}`}
            className="text-white font-black uppercase tracking-widest bg-white/10 px-3 py-0.5 rounded-full hover:bg-brand-accent hover:text-brand transition-all"
          >
            {CONTACT.PHONE_PRIMARY}
          </Link>
        </div>
      </div>
    </div>
  );
}
