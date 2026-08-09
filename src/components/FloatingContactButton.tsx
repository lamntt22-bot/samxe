"use client";

import { useLeadCapture } from "@/components/LeadCaptureContext";

export default function FloatingContactButton() {
  const { open } = useLeadCapture();

  return (
    <button
      type="button"
      onClick={() => open()}
      aria-label="Đăng ký nhận tư vấn Sâm Xé"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-gold-500 py-3 pl-4 pr-5 text-sm font-bold text-forest-950 shadow-xl shadow-gold-500/30 transition hover:bg-gold-400 hover:pr-6 sm:bottom-6 sm:right-6"
    >
      <span className="text-lg">💬</span>
      <span className="hidden sm:inline">Liên hệ ngay</span>
    </button>
  );
}
