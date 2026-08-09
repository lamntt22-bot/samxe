import Reveal from "@/components/Reveal";

const FAQS = [
  {
    q: "Làm sao biết Sâm Ngọc Linh, Sâm Lai Châu trong hộp là thật?",
    a: "Nguyên liệu được mua từ đầu mối có giấy tờ nguồn gốc rõ ràng và kiểm nghiệm trước khi đóng gói, xử lý riêng biệt, không trộn với 8 loại sâm Việt khác trong cùng hộp. Nếu không đúng nguồn gốc như công bố, Sâm Xé hoàn tiền toàn bộ.",
  },
  {
    q: "Trạm dừng nghỉ muốn hợp tác có cần nhập hàng trước không?",
    a: "Không. Sâm Xé hỗ trợ hình thức ký gửi — trạm dừng nghỉ không cần nhập hàng trước, chỉ thanh toán phần đã bán, và không cần diện tích kệ lớn.",
  },
  {
    q: "Nhà xe đặt Hộp Dự Trữ Hành Trình thì giao hàng theo lịch nào?",
    a: "Đăng ký một lần, hộp dự trữ được giao đều theo tháng hoặc quý cho đội xe theo lịch đã thống nhất — nhà xe không phải nhớ đặt lại mỗi tuần.",
  },
  {
    q: "Tài xế cá nhân mua lẻ từng túi ở đâu?",
    a: "Sâm Xé đang mở rộng điểm bán tại các trạm dừng nghỉ hợp tác trên tuyến đường dài — để khi hộp dự trữ gần hết, tài xế không phải chờ đến điểm đến mới mua lại được.",
  },
  {
    q: "Gói Trải Nghiệm 10 Ngày miễn phí có ràng buộc gì không?",
    a: "Không. Gói dành cho nhà xe muốn thử trước khi đặt định kỳ — miễn phí 100%, miễn ship toàn quốc, không bắt buộc phải đặt tiếp sau đó.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              FAQ
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              Câu hỏi thường gặp
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delayMs={i * 60}>
              <details className="group rounded-2xl border border-forest-900/10 bg-white p-5 open:shadow-md">
                <summary className="cursor-pointer list-none font-semibold text-forest-900 marker:content-none">
                  <span className="flex items-center justify-between gap-4">
                    {item.q}
                    <span className="shrink-0 text-gold-600 transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-forest-700">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
