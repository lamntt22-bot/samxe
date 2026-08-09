import Reveal from "@/components/Reveal";

const GROUPS = [
  {
    title: "Với nhà xe",
    items: [
      "Không cần tự tính mỗi tài xế cần bao nhiêu túi/tháng — chúng tôi tư vấn quy cách theo số đầu xe và tần suất chạy tuyến.",
      "Không cần tự nhắc đặt hàng — đăng ký định kỳ một lần, hộp dự trữ tự động giao đến theo lịch.",
      "Muốn dùng làm chương trình khen thưởng tài xế an toàn? Hỗ trợ đóng gói riêng, in tên nhà xe.",
    ],
  },
  {
    title: "Với trạm dừng nghỉ",
    items: [
      "Không cần nhập hàng trước — hỗ trợ hình thức ký gửi, chỉ thanh toán phần đã bán.",
      "Không cần diện tích kệ lớn — quy cách nhỏ gọn, đặt cạnh quầy tính tiền hoặc khu đặc sản.",
    ],
  },
];

export default function DoneForYouSection() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Done for you
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              Xóa hết nỗi lo khi triển khai
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {GROUPS.map((group, i) => (
            <Reveal key={group.title} delayMs={i * 100}>
              <div className="h-full rounded-3xl border border-forest-900/10 bg-white p-6 sm:p-8">
                <h3 className="text-lg font-bold text-forest-900">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm text-forest-700"
                    >
                      <span className="mt-0.5 text-gold-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
