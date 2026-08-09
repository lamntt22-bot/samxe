"use client";

import Image from "next/image";
import NightSkyBackground from "@/components/NightSkyBackground";
import { useLeadCapture } from "@/components/LeadCaptureContext";

export default function Hero() {
  const { open } = useLeadCapture();

  return (
    <section id="top" className="relative overflow-hidden bg-forest-950">
      <NightSkyBackground />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 text-cream-50 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div>
          <span className="inline-flex items-center rounded-full bg-gold-500/15 px-4 py-1.5 text-xs font-semibold text-gold-400 ring-1 ring-gold-400/30 sm:text-sm">
            🎁 Gói Trải Nghiệm 10 Ngày — miễn phí cho nhà xe, miễn ship toàn quốc
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Sau Vô Lăng Là Sinh Mạng Và Tài Sản Của Cả Chuyến Xe
            <span className="block text-gold-400">
              — Sau Túi Áo Là Sâm Xé.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-cream-100/90 sm:text-lg">
            Một cách tỉnh táo tự nhiên, dùng được mỗi ngày — có mặt từ túi áo
            tài xế đến các trạm dừng nghỉ trên mọi tuyến đường dài.
          </p>

          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold-400/90">
            SÂM XÉ — Vạn Dặm Bình An
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => open({ audience: "nha-xe", product: "trai-nghiem" })}
              className="rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-forest-950 shadow-lg shadow-gold-500/30 transition hover:bg-gold-400 sm:text-base"
            >
              Nhà xe: Đăng ký Gói Trải Nghiệm miễn phí
            </button>
            <button
              type="button"
              onClick={() => open({ audience: "tram-dung-nghi" })}
              className="rounded-full border border-cream-50/40 bg-cream-50/5 px-6 py-3.5 text-sm font-bold text-cream-50 backdrop-blur transition hover:bg-cream-50/15 sm:text-base"
            >
              Trạm dừng nghỉ: Hợp tác phân phối
            </button>
            <button
              type="button"
              onClick={() => open({ audience: "tai-xe" })}
              className="rounded-full border border-cream-50/40 bg-cream-50/5 px-6 py-3.5 text-sm font-bold text-cream-50 backdrop-blur transition hover:bg-cream-50/15 sm:text-base"
            >
              Tài xế: Tìm điểm bán gần bạn
            </button>
          </div>
        </div>

        <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-2xl shadow-black/40 sm:h-96 lg:h-[28rem]">
          <Image
            src="/driver-with-sam-xe.png"
            alt="Bác tài cầm túi Sâm Xé trong ca bin lúc nửa đêm"
            fill
            priority
            className="object-cover object-[70%_center]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
