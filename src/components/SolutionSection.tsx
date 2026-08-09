import Reveal from "@/components/Reveal";
import StarAccent from "@/components/StarAccent";

const MECHANISM_POINTS = [
  "Sâm Xé không bán một túi lẻ để dùng thử một lần. Chúng tôi thiết kế theo hộp dự trữ — mỗi hộp là lượng dùng đủ cho một khoảng thời gian rõ ràng, để tài xế không bao giờ hết hàng giữa đường, và nhà xe không phải đặt lại mỗi tuần.",
  "Mỗi lát sâm sấy dẻo, tẩm mật ong, đóng túi xé — xé là dùng ngay, không cần chưng, không cần pha, không cần rửa tay giữa đường.",
  "Và vì hành trình dài không chỉ nằm trong túi áo — Sâm Xé cũng có mặt tại các trạm dừng nghỉ trên tuyến, để khi hộp dự trữ gần hết, tài xế không phải chờ đến điểm đến mới mua lại được.",
];

const RARITY_LEGEND = [
  { color: "bg-ruby-600", label: "Đỏ — Sâm Ngọc Linh" },
  { color: "bg-gold-500", label: "Vàng — Sâm Lai Châu" },
  { color: "bg-cream-200 border border-forest-900/20", label: "Trắng — 8 loại sâm Việt khác (Bố Chính, Rành Rành, Sâm ta...)" },
];

const PROOF_LAYERS = [
  {
    label: "Lớp 1",
    title: "Vấn đề có thật, không phải cảm tính",
    desc: "Tai nạn do tài xế mất tỉnh táo là nguyên nhân được nhắc đến thường xuyên trong thống kê an toàn giao thông — đây là lý do các nhà xe lớn đều có quy định giờ nghỉ bắt buộc, và ngày càng nhiều đơn vị lắp camera giám sát hành trình để kiểm soát rủi ro này.",
  },
  {
    label: "Lớp 2",
    title: "Nguyên liệu thật, không pha trộn",
    desc: "Sâm Ngọc Linh và Sâm Lai Châu (cùng chi Panax, giá thị trường 40-120 triệu đồng/kg) được xử lý riêng, không trộn với 8 loại sâm khác trong hộp — mua từ đầu mối có giấy tờ nguồn gốc, kiểm nghiệm trước khi đóng gói.",
  },
  {
    label: "Lớp 3",
    title: "Có mặt đúng nơi tài xế cần",
    desc: "Không chỉ giao đến bến xe — Sâm Xé có mặt tại các trạm dừng nghỉ trên các tuyến cao tốc chính, đúng những nơi tài xế đã ghé vào để nghỉ và tiếp nhiên liệu.",
  },
  {
    label: "Lớp 4",
    title: "Đặt định kỳ, không phải lo nhớ đặt lại",
    desc: "Nhà xe đăng ký một lần, hộp dự trữ được giao đều theo tháng/quý cho đội xe — một phần trong lịch vận hành, không phải việc phải nhớ mua thêm.",
  },
];

export default function SolutionSection() {
  return (
    <section id="giai-phap" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Giải pháp
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              &ldquo;Hệ Thống Dự Trữ Vạn Dặm&rdquo;
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {MECHANISM_POINTS.map((text, i) => (
            <Reveal key={text} delayMs={i * 100}>
              <p className="h-full rounded-2xl bg-cream-100 p-6 text-sm leading-relaxed text-forest-800 sm:text-base">
                {text}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative mt-6 flex flex-wrap items-center gap-4 overflow-hidden rounded-2xl border border-forest-900/10 bg-forest-950 p-6 text-cream-50 sm:justify-center sm:gap-8">
            <StarAccent />
            <span className="relative text-sm font-semibold text-gold-400">
              10 loại sâm Việt — xếp theo đúng thang độ hiếm thật ngoài thị trường:
            </span>
            {RARITY_LEGEND.map((item) => (
              <span
                key={item.label}
                className="relative flex items-center gap-2 text-sm"
              >
                <span className={`h-3.5 w-3.5 rounded-full ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Vì sao tin được
            </span>
            <h3 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              Proof Stacking
            </h3>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PROOF_LAYERS.map((layer, i) => (
            <Reveal key={layer.label} delayMs={i * 100}>
              <div className="h-full rounded-2xl border border-forest-900/10 bg-cream-100 p-6">
                <span className="text-xs font-bold uppercase tracking-wide text-gold-600">
                  {layer.label}
                </span>
                <h4 className="mt-1 font-bold text-forest-900">
                  {layer.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-forest-700">
                  {layer.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
