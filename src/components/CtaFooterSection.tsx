"use client";

import Reveal from "@/components/Reveal";
import StarAccent from "@/components/StarAccent";
import { useLeadCapture } from "@/components/LeadCaptureContext";

export default function CtaFooterSection() {
  const { open } = useLeadCapture();

  return (
    <section className="relative overflow-hidden bg-forest-900 py-16 text-cream-50 sm:py-20">
      <StarAccent />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Ba lối đi rõ ràng
          </h2>
          <p className="mt-4 text-base text-cream-100/85 sm:text-lg">
            Tài xế của bạn không cần một món quà đẹp một lần mỗi năm. Họ cần
            một thứ tỉnh táo, an toàn, nằm sẵn trong túi áo mỗi ngày — và
            luôn có sẵn khi họ ghé trạm dừng nghỉ.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() =>
                open({ audience: "nha-xe", product: "trai-nghiem" })
              }
              className="rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 sm:text-base"
            >
              Nhà xe: Đăng ký Gói Trải Nghiệm miễn phí
            </button>
            <button
              type="button"
              onClick={() => open({ audience: "tram-dung-nghi" })}
              className="rounded-full border border-cream-50/30 px-6 py-3.5 text-sm font-bold text-cream-50 transition hover:bg-cream-50/10 sm:text-base"
            >
              Trạm dừng nghỉ: Đăng ký hợp tác phân phối
            </button>
            <button
              type="button"
              onClick={() => open({ audience: "tai-xe" })}
              className="rounded-full border border-cream-50/30 px-6 py-3.5 text-sm font-bold text-cream-50 transition hover:bg-cream-50/10 sm:text-base"
            >
              Tài xế: Tìm điểm bán gần bạn
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
