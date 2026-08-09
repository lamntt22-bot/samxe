"use client";

import Image from "next/image";
import { useLeadCapture } from "@/components/LeadCaptureContext";

const NAV_LINKS = [
  { href: "#van-de", label: "Vấn đề" },
  { href: "#giai-phap", label: "Giải pháp" },
  { href: "#goi-san-pham", label: "Gói sản phẩm" },
  { href: "#tram-dung-nghi", label: "Trạm dừng nghỉ" },
  { href: "#faq", label: "Hỏi đáp" },
];

export default function Header() {
  const { open } = useLeadCapture();

  return (
    <>
      <div className="bg-forest-950 px-4 py-2 text-center text-xs text-cream-100/80 sm:text-sm">
        Sâm Việt thật, có kiểm nghiệm nguồn gốc — hoàn tiền 100% nếu sai cam
        kết ·{" "}
        <a href="tel:0900000000" className="underline underline-offset-2">
          Hotline: 0900 000 000
        </a>
      </div>
      <header className="sticky top-0 z-40 border-b border-forest-900/10 bg-cream-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-black sm:h-10 sm:w-10">
              <Image
                src="/logo.png"
                alt="Sâm Xé"
                fill
                className="object-cover"
                sizes="40px"
              />
            </span>
            <span className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold tracking-tight text-forest-900 sm:text-2xl">
                SÂM XÉ
              </span>
              <span className="hidden text-xs font-medium text-gold-600 sm:inline">
                Vạn Dặm Bình An
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-forest-800 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-gold-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => open()}
            className="rounded-full bg-gold-500 px-4 py-2.5 text-sm font-bold text-forest-950 shadow-md shadow-gold-500/20 transition hover:bg-gold-400 sm:px-5"
          >
            Đăng ký ngay
          </button>
        </div>
      </header>
    </>
  );
}
