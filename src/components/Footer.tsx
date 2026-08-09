import Image from "next/image";
import StarAccent from "@/components/StarAccent";

const NAV_LINKS = [
  { href: "#van-de", label: "Vấn đề" },
  { href: "#giai-phap", label: "Giải pháp" },
  { href: "#goi-san-pham", label: "Gói sản phẩm" },
  { href: "#tram-dung-nghi", label: "Trạm dừng nghỉ" },
  { href: "#faq", label: "Hỏi đáp" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 py-12 text-cream-100/80">
      <StarAccent />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black">
              <Image
                src="/logo.png"
                alt="Sâm Xé"
                fill
                className="object-cover"
                sizes="40px"
              />
            </span>
            <span className="text-xl font-extrabold text-cream-50">
              SÂM XÉ
            </span>
          </div>
          <p className="mt-3 text-sm">
            Sâm Việt sấy dẻo đóng túi xé tiện lợi — tỉnh táo an toàn mỗi ngày
            cho tài xế đường dài, nhà xe và trạm dừng nghỉ.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-cream-50">
            Điều hướng
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-gold-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-cream-50">
            Liên hệ
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Hotline/Zalo: 0900 000 000 (số tạm — cập nhật trước khi ra mắt)</li>
            <li>Email: hello@samxe.vn (email tạm — cập nhật trước khi ra mắt)</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl border-t border-cream-100/10 px-4 pt-6 text-xs sm:px-6">
        © {new Date().getFullYear()} Sâm Xé. Bảo lưu mọi quyền.
      </div>
    </footer>
  );
}
