import Link from "next/link";
import { redirect } from "next/navigation";
import MemberNav from "@/components/MemberNav";
import { getCurrentMember } from "@/lib/session";
import { AUDIENCES, PRODUCTS } from "@/lib/leads";
import { TIER_LABELS } from "@/lib/members";

export default async function DashboardPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login");

  const audienceLabel =
    AUDIENCES.find((a) => a.id === member.audience)?.label ?? member.audience;
  const productLabel = member.interestedProduct
    ? PRODUCTS.find((p) => p.id === member.interestedProduct)?.label
    : null;

  const isPartner = member.tier === "doi-tac";

  return (
    <div className="min-h-screen bg-cream-100">
      <MemberNav />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-forest-900">
              Chào {member.name}
            </h1>
            <p className="mt-1 text-sm text-forest-700">
              {member.phone} · {member.email}
            </p>
          </div>
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-bold ${
              isPartner
                ? "bg-gold-500 text-forest-950"
                : "bg-forest-900/10 text-forest-800"
            }`}
          >
            Hạng: {TIER_LABELS[member.tier]}
          </span>
        </div>

        <section className="mt-8 rounded-2xl border border-forest-900/10 bg-white p-6">
          <h2 className="text-lg font-bold text-forest-900">
            Thông tin đăng ký
          </h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-forest-500">
                Bạn là
              </dt>
              <dd className="mt-1 text-forest-900">{audienceLabel}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-forest-500">
                Sản phẩm quan tâm
              </dt>
              <dd className="mt-1 text-forest-900">
                {productLabel ?? "Chưa chọn"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mt-6 rounded-2xl border border-forest-900/10 bg-white p-6">
          <h2 className="text-lg font-bold text-forest-900">
            Nội dung Free
          </h2>
          <p className="mt-2 text-sm text-forest-700">
            Xem đầy đủ 4 quy cách sản phẩm, hướng dẫn đặt hàng và thông tin
            liên hệ tại trang chủ.
          </p>
          <Link
            href="/#goi-san-pham"
            className="mt-4 inline-block rounded-xl bg-forest-900 px-5 py-2.5 text-sm font-bold text-cream-50 transition hover:bg-forest-800"
          >
            Xem gói sản phẩm
          </Link>
        </section>

        <section className="relative mt-6 overflow-hidden rounded-2xl border border-gold-500/40 bg-white p-6">
          <h2 className="text-lg font-bold text-forest-900">
            Ưu đãi Đối tác
          </h2>

          {isPartner ? (
            <div className="mt-3 space-y-2 text-sm text-forest-700">
              <p>✓ Đầu mối liên hệ ưu tiên riêng cho đối tác.</p>
              <p>✓ Lịch giao hộp dự trữ định kỳ theo thoả thuận.</p>
              <p>✓ Mã ưu đãi riêng cho lần đặt tiếp theo.</p>
              <p className="pt-2 text-xs text-forest-500">
                (Nội dung mẫu — cập nhật quyền lợi thật trước khi ra mắt.)
              </p>
            </div>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="mt-3 space-y-2 text-sm text-forest-400 blur-[3px] select-none"
              >
                <p>✓ Đầu mối liên hệ ưu tiên riêng cho đối tác.</p>
                <p>✓ Lịch giao hộp dự trữ định kỳ theo thoả thuận.</p>
                <p>✓ Mã ưu đãi riêng cho lần đặt tiếp theo.</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                <Link
                  href="/upgrade"
                  className="rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
                >
                  Nâng cấp ngay
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
