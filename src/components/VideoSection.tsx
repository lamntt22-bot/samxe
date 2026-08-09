import Reveal from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";

const VIDEOS = [
  {
    videoId: "V7gfV1GoEOI",
    title:
      "Sốc Nặng Với Giá Sâm Ngọc Linh Tại Vườn, Vì Sao Đắt Hơn Cả Vàng Ròng?",
    channel: "Tuấn Lão TV",
  },
  {
    videoId: "30MWEkx2rN4",
    title: "VTC14 | Củ sâm ngọc linh hơn 1kg giá 540 triệu đồng",
    channel: "VTC14",
  },
  {
    videoId: "XwW10DmUx40",
    title:
      'Cách trồng sâm Lai Châu: Loài cây "tiền tệ" dưới tán rừng Tây Bắc | VTC16',
    channel: "VTC16",
  },
  {
    videoId: "1O7J0qwvebg",
    title: "Công dụng chữa bệnh của sâm Ngọc Linh | VTC14",
    channel: "VTC14",
  },
  {
    videoId: "Sd8nOJtn0Pg",
    title: "Sâm Lai Châu - Tìm hiểu về công dụng và lợi ích sức khỏe",
    channel: "Triệu Tiền Nải",
  },
];

export default function VideoSection() {
  return (
    <section className="bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Tìm hiểu thêm
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-forest-900 sm:text-3xl">
              Vì sao Sâm Ngọc Linh &amp; Sâm Lai Châu quý đến vậy
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-forest-700">
              Video từ các kênh báo chí và người làm nội dung độc lập —
              không phải nội dung do Sâm Xé sản xuất — giúp bạn tự kiểm
              chứng giá trị và nguồn gốc thật của hai loại sâm quý này.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((video, i) => (
            <Reveal key={video.videoId} delayMs={(i % 3) * 100}>
              <VideoCard {...video} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
