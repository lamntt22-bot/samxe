"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import StarAccent from "@/components/StarAccent";
import { useLeadCapture } from "@/components/LeadCaptureContext";

const POINTS = [
  {
    title: "Đúng nhu cầu thật tại điểm dừng chân",
    desc: 'Khách vào trạm để nghỉ và tiếp nhiên liệu cho xe — Sâm Xé là thứ họ "tiếp nhiên liệu" cho chính mình để tiếp tục hành trình an toàn.',
  },
  {
    title: "Không rủi ro tồn kho",
    desc: "Hợp tác theo hình thức ký gửi, không cần nhập trước, chỉ thanh toán phần đã bán.",
  },
  {
    title: "Thêm doanh thu mà không cần thêm diện tích",
    desc: "Quy cách nhỏ gọn, đặt cạnh quầy tính tiền hoặc khu trưng bày đặc sản địa phương hiện có.",
  },
];

export default function RestStopSection() {
  const { open } = useLeadCapture();

  return (
    <section
      id="tram-dung-nghi"
      className="border-y-4 border-gold-500 bg-gradient-to-br from-gold-400/15 via-cream-100 to-cream-100 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-forest-950 p-6 text-cream-50 sm:p-12">
          <StarAccent />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full bg-gold-500/20 px-4 py-1.5 text-xs font-semibold text-gold-400">
                Dành riêng cho Trạm Dừng Nghỉ
              </span>
              <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                Cơ hội hợp tác phân phối
              </h2>
              <p className="mt-3 text-sm text-cream-100/80 sm:text-base">
                Nếu bạn quản lý một trạm dừng nghỉ, đây là điểm dành cho bạn:
              </p>

              <ul className="mt-6 space-y-5">
                {POINTS.map((point) => (
                  <li key={point.title}>
                    <p className="font-bold text-gold-400">{point.title}</p>
                    <p className="mt-1 text-sm text-cream-100/85">
                      {point.desc}
                    </p>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => open({ audience: "tram-dung-nghi" })}
                className="mt-8 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 sm:text-base"
              >
                Đăng ký hợp tác phân phối
              </button>
            </div>

            <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80">
              <Image
                src="/sam-xe-tram-dung-nghi.png"
                alt="Mô hình quầy trưng bày Sâm Xé tại trạm dừng nghỉ trên cao tốc"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
