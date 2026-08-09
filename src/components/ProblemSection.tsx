import Reveal from "@/components/Reveal";
import StarAccent from "@/components/StarAccent";

const DRIVER_ISSUES = [
  {
    title: "Nước tăng lực, cà phê lon",
    desc: "Tỉnh nhanh nhưng hại tim nếu dùng nhiều lần mỗi ca.",
  },
  {
    title: "Hút thuốc liên tục để chống buồn ngủ",
    desc: "Rất nhiều tài xế đường dài đang làm vậy — độc hại cho tim, phổi, và thực chất không giải quyết được cơn mệt thật, chỉ đánh lạc hướng vài phút.",
  },
  {
    title: "Thuốc chống buồn ngủ",
    desc: "Gây lệ thuộc, ảnh hưởng phản xạ lúc cầm lái.",
  },
  {
    title: "Sâm tươi, trà sâm truyền thống",
    desc: "Tốt nhưng phải chưng, phải pha — không thể mang theo dùng giữa đường lúc 2 giờ sáng.",
  },
];

const OPERATOR_ISSUES = [
  "Một vụ tai nạn do mất tỉnh táo không chỉ là chi phí sửa xe hay viện phí — mà còn là bồi thường thiệt hại, phạt hành chính, tăng phí bảo hiểm cho cả đội xe những năm sau, và rủi ro ảnh hưởng đến giấy phép kinh doanh vận tải nếu vi phạm lặp lại.",
  "Camera giám sát hành trình, phạt nguội ngày càng chặt — một giây lơ là của tài xế giờ đây thành bằng chứng, thành hồ sơ, thành tiền.",
  "Đây là rủi ro xảy ra mỗi đêm, mỗi ca, mỗi chuyến đi — không phải chuyện chỉ cần lo một lần vào Tết.",
];

export default function ProblemSection() {
  return (
    <section id="van-de" className="bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-forest-900 p-6 text-cream-50 sm:p-10">
            <StarAccent />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
                Hai giờ sáng, đèo Bảo Lộc, mưa
              </p>
              <p className="mt-3 text-base leading-relaxed text-cream-100/90 sm:text-lg">
                Chuyến thứ ba trong tuần. Trước đây, đến giờ này bác tài đã
                phải tự tát vào mặt mình để tỉnh, hoặc châm điếu thuốc thứ
                mười trong ca — biết là hại, nhưng không còn cách nào khác.
              </p>
              <p className="mt-4 text-base leading-relaxed text-cream-100/90 sm:text-lg">
                Giờ thì khác. Túi Sâm Xé nằm sẵn trong túi áo, như mọi ngày.
                Xé một túi, nhấm ba lát. Mười phút sau, tỉnh lại — không giật
                mình như cà phê, không khô rát cổ họng như thuốc lá, mà êm
                như vừa chợp mắt một chút. Sau lưng là 40 hành khách. Đêm nay
                họ về nhà an toàn.
              </p>
              <p className="mt-4 text-base font-semibold text-gold-400 sm:text-lg">
                Đó là điều Sâm Xé làm mỗi ngày — không phải một lần mỗi năm.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Vấn đề mỗi ngày
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              Những gì tài xế và nhà xe đang phải đánh đổi
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-forest-900/10 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-forest-900">
                Với tài xế
              </h3>
              <ul className="mt-4 space-y-4">
                {DRIVER_ISSUES.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold text-forest-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-forest-700">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={150}>
            <div className="rounded-3xl border border-ruby-600/15 bg-ruby-700/5 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-forest-900">
                Với nhà xe — không chỉ là chuyện sức khỏe tài xế
              </h3>
              <ul className="mt-4 space-y-4">
                {OPERATOR_ISSUES.map((text) => (
                  <li key={text} className="flex gap-3">
                    <span className="mt-1 text-ruby-600">●</span>
                    <p className="text-sm text-forest-700">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
