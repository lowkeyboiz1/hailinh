import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/features/layout/components/SiteHeader";
import { SiteFooter } from "@/features/layout/components/SiteFooter";
import { QuoteCTA } from "@/shared/components/common/QuoteCTA";
import { SITE } from "@/shared/constants/ui";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.NAME} - ${SITE.TAGLINE}`,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col grain`}>
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <QuoteCTA variant="sticky" />
      </body>
    </html>
  );
}
