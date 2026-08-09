import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { LeadCaptureProvider } from "@/components/LeadCaptureContext";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sâm Xé — Vạn Dặm Bình An",
  description:
    "Sâm Xé — sâm Việt sấy dẻo đóng túi xé tiện lợi cho tài xế đường dài, nhà xe và trạm dừng nghỉ. Tỉnh táo an toàn mỗi ngày, không cần chưng, không cần pha.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream-100 text-forest-950">
        <LeadCaptureProvider>{children}</LeadCaptureProvider>
      </body>
    </html>
  );
}
