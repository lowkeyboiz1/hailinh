import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/modules/layout/components";
import { QuoteCTA } from "@/components/common/QuoteCTA";
import { SITE } from "@/shared/constants/ui";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hailinh.com.vn"),
  title: {
    default: `${SITE.NAME} - ${SITE.TAGLINE}`,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SITE.NAME,
  },
  robots: {
    index: true,
    follow: true,
  },
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
