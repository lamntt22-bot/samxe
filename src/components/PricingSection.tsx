"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { useLeadCapture } from "@/components/LeadCaptureContext";
import type { AudienceId, ProductId } from "@/lib/leads";

interface Tier {
  emoji: string;
  name: string;
  price: string;
  subtitle: string;
  bullets: string[];
  cta: string;
  product: ProductId;
  audience: AudienceId;
  highlight?: boolean;
  image?: string;
  badge?: string;
}

const TIERS: Tier[] = [
  {
    emoji: "🎁",
    name: "Gói Trải Nghiệm 10 Ngày",
    price: "MIỄN PHÍ",
    subtitle: "Dành cho nhà xe muốn thử trước khi đặt định kỳ",
    bullets: [
      "Hộp gỗ bọc nhung, 10 túi (1 Ngọc Linh, 1 Lai Châu, 8 loại khác), đủ dùng thử 10 ngày",
      "Trị giá 1.100.000đ — miễn phí 100%, miễn ship toàn quốc",
    ],
    cta: "Đăng ký nhận Gói Trải Nghiệm miễn phí",
    product: "trai-nghiem",
    audience: "nha-xe",
    image: "/sam-xe-san-pham-mau.png",
    badge: "Miễn phí 100%",
  },
  {
    emoji: "📦",
    name: "Hộp Dự Trữ Hành Trình",
    price: "2.900.000đ",
    subtitle: "Sản phẩm chính — đặt định kỳ hàng tháng/quý cho đội xe",
    bullets: [
      "20 hộp nhỏ x 3 túi x 3 lát — đủ dùng cho 1 tài xế nhiều tuần, hoặc chia cho cả đội xe nhỏ",
      "2 hộp Ngọc Linh + 2 hộp Lai Châu + 16 hộp (8 loại sâm Việt khác)",
    ],
    cta: "Đăng ký đặt định kỳ cho đội xe",
    product: "hanh-trinh",
    audience: "nha-xe",
    highlight: true,
    image: "/sam-xe-3-mau.png",
    badge: "Phổ biến nhất",
  },
  {
    emoji: "🎲",
    name: "Hộp Dự Trữ Có Thưởng",
    price: "3.500.000đ",
    subtitle: "Cùng công dụng dùng hàng ngày — thêm động lực thi đua cho tài xế",
    bullets: [
      "Cấu trúc như Hộp Dự Trữ Hành Trình — thành phần bí ẩn",
      "Đảm bảo tối thiểu 2 hộp Ngọc Linh + 2 hộp Lai Châu",
      'Cơ hội "trúng lớn": cả 20 hộp đều Sâm Ngọc Linh — tỷ lệ công khai 1/200',
      "Phù hợp làm giải thưởng cho tài xế đạt KPI an toàn hàng quý",
    ],
    cta: "Dùng làm giải thưởng thi đua an toàn",
    product: "co-thuong",
    audience: "nha-xe",
    image: "/combo3.png",
    badge: "Hộp bí ẩn",
  },
  {
    emoji: "👑",
    name: "Kho Dự Trữ Vạn Dặm — VIP",
    price: "5.900.000đ",
    subtitle: "Dự trữ lớn cho cả đội xe, hoặc vinh danh tài xế/đối tác xuất sắc nhất",
    bullets: [
      "Vali kéo bọc nhung, mạ vàng — 10 hộp gỗ, mỗi hộp nguyên một loại sâm",
      "1 hộp toàn bộ Ngọc Linh, 1 hộp toàn bộ Lai Châu, 8 hộp còn lại là 8 loại sâm khác",
    ],
    cta: "Đặt Kho Dự Trữ VIP cho đội xe",
    product: "vip",
    audience: "nha-xe",
    image: "/combo4.png",
    badge: "Cao cấp nhất",
  },
];

export default function PricingSection() {
  const { open } = useLeadCapture();

  return (
    <section id="goi-san-pham" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Value Stack
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              Chọn đúng quy cách cho đúng nhu cầu
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delayMs={i * 100} className="h-full">
            <div
              className={`relative flex h-full flex-col overflow-hidden rounded-3xl border ${
                tier.highlight
                  ? "border-gold-500 bg-gold-400/10 shadow-lg shadow-gold-500/10"
                  : "border-forest-900/10 bg-cream-100"
              }`}
            >
              {tier.badge && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-forest-950 px-3 py-1 text-[11px] font-bold text-gold-400 shadow">
                  {tier.badge}
                </span>
              )}

              {tier.image ? (
                <div className="relative h-40 w-full">
                  <Image
                    src={tier.image}
                    alt={tier.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-forest-950/5 text-5xl">
                  {tier.emoji}
                </div>
              )}

              <div className="flex flex-1 flex-col p-6">
              <h3 className="text-base font-bold text-forest-900">
                {tier.name}
              </h3>
              <p className="mt-1 text-xl font-extrabold text-forest-900">
                {tier.price}
              </p>
              <p className="mt-2 text-xs text-forest-700">{tier.subtitle}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {tier.bullets.map((b) => (
                  <li key={b} className="text-xs leading-relaxed text-forest-700">
                    • {b}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  open({ audience: tier.audience, product: tier.product })
                }
                className={`mt-6 rounded-xl px-4 py-3 text-sm font-bold transition ${
                  tier.highlight
                    ? "bg-gold-500 text-forest-950 hover:bg-gold-400"
                    : "bg-forest-900 text-cream-50 hover:bg-forest-800"
                }`}
              >
                {tier.cta}
              </button>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-forest-700">
          Mua lẻ từng túi để dùng ngay? Sâm Xé đang mở rộng điểm bán tại các
          trạm dừng nghỉ trên tuyến —{" "}
          <a
            href="#tram-dung-nghi"
            className="font-semibold text-gold-600 underline underline-offset-2"
          >
            xem chi tiết bên dưới
          </a>
          .
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs text-forest-500">
          Dịp Tết/lễ: cả 4 quy cách trên đều dùng tốt làm quà tri ân tài xế
          cuối năm hoặc quà đối tác — nhưng đó là cách dùng thêm, không phải
          lý do chính để đặt. Sâm Xé được thiết kế để nằm trong túi áo tài xế
          mọi ngày trong năm.
        </p>
      </div>
    </section>
  );
}
