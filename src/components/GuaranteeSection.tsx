import Reveal from "@/components/Reveal";
import StarAccent from "@/components/StarAccent";

const GUARANTEES = [
  {
    title: "Cam kết nguồn gốc 100%",
    desc: "Nếu Sâm Ngọc Linh hoặc Sâm Lai Châu trong bất kỳ hộp nào không đúng nguồn gốc như công bố, hoàn tiền toàn bộ — không cần giải thích.",
  },
  {
    title: "Cam kết giao định kỳ đúng hạn",
    desc: "Trễ lịch giao hộp dự trữ theo đăng ký — hộp kế tiếp miễn phí.",
  },
];

export default function GuaranteeSection() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-16 text-cream-50 sm:py-20">
      <StarAccent />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Guarantee
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Cam kết chuyển rủi ro về phía chúng tôi
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {GUARANTEES.map((g, i) => (
            <Reveal key={g.title} delayMs={i * 100}>
              <div className="rounded-2xl border border-gold-500/30 bg-cream-50/5 p-6">
                <h3 className="font-bold text-gold-400">{g.title}</h3>
                <p className="mt-2 text-sm text-cream-100/85">{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
