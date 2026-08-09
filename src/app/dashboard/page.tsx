import Link from "next/link";
import { redirect } from "next/navigation";
import MemberNav from "@/components/MemberNav";
import ReferralLinkBox from "@/components/ReferralLinkBox";
import { getCurrentMember } from "@/lib/session";
import { getMemberStats } from "@/lib/member-store";
import { AUDIENCES, PRODUCTS } from "@/lib/leads";
import {
  AFFILIATE_MAX_PERCENT,
  AFFILIATE_PERCENT_PER_REFERRAL,
  AFFILIATE_REFERRALS_FOR_MAX,
  DEALER_LEVELS,
  MIN_DEALER_LEVEL_FOR_AFFILIATE_CREDIT,
  getNextDealerLevel,
} from "@/lib/members";
import { formatVnd } from "@/lib/format";

export default async function DashboardPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login");

  const stats = await getMemberStats(member.id);
  const nextLevel = getNextDealerLevel(stats.dealerLevel);
  const currentLevelConfig = DEALER_LEVELS[stats.dealerLevel];

  const audienceLabel =
    AUDIENCES.find((a) => a.id === member.audience)?.label ?? member.audience;
  const productLabel = member.interestedProduct
    ? PRODUCTS.find((p) => p.id === member.interestedProduct)?.label
    : null;

  const progressToNext = nextLevel
    ? Math.min(100, Math.round((stats.revenue / nextLevel.minRevenue) * 100))
    : 100;

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
          <span className="rounded-full bg-gold-500 px-4 py-1.5 text-sm font-bold text-forest-950">
            {currentLevelConfig.label}
          </span>
        </div>

        {/* Tổng chiết khấu */}
        <section className="mt-8 rounded-2xl border border-gold-500/40 bg-white p-6 text-center">
          <p className="text-xs uppercase tracking-wide text-forest-500">
            Tổng chiết khấu hiện tại
          </p>
          <p className="mt-1 text-4xl font-extrabold text-forest-900">
            {stats.totalDiscountPercent}%
          </p>
          <p className="mt-2 text-xs text-forest-500">
            (Đại lý {stats.dealerDiscountPercent}%
            {stats.affiliateBonusPercent > 0 &&
              ` + Giới thiệu ${stats.affiliateBonusPercent}%`}
            )
          </p>
        </section>

        {/* Doanh thu tích luỹ & tiến độ */}
        <section className="mt-6 rounded-2xl border border-forest-900/10 bg-white p-6">
          <h2 className="text-lg font-bold text-forest-900">
            Doanh thu tích luỹ
          </h2>
          <p className="mt-1 text-2xl font-extrabold text-forest-900">
            {formatVnd(stats.revenue)}
          </p>

          {nextLevel ? (
            <>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-forest-900/10">
                <div
                  className="h-full rounded-full bg-gold-500 transition-all"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-forest-700">
                Còn{" "}
                <strong>
                  {formatVnd(Math.max(0, nextLevel.minRevenue - stats.revenue))}
                </strong>{" "}
                nữa để lên <strong>{nextLevel.label}</strong> (chiết khấu{" "}
                {nextLevel.discountPercent}%).
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm font-semibold text-gold-600">
              🎉 Bạn đã đạt cấp cao nhất!
            </p>
          )}

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-forest-900/10 text-left text-xs uppercase tracking-wide text-forest-500">
                  <th className="py-2">Cấp</th>
                  <th className="py-2">Doanh thu tích luỹ từ</th>
                  <th className="py-2">Chiết khấu</th>
                </tr>
              </thead>
              <tbody>
                {DEALER_LEVELS.filter((l) => l.level > 0).map((l) => (
                  <tr
                    key={l.level}
                    className={`border-b border-forest-900/5 ${
                      l.level === stats.dealerLevel
                        ? "bg-gold-400/10 font-semibold text-forest-900"
                        : "text-forest-700"
                    }`}
                  >
                    <td className="py-2">{l.label}</td>
                    <td className="py-2">{formatVnd(l.minRevenue)}</td>
                    <td className="py-2">{l.discountPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Affiliate */}
        <section className="mt-6 rounded-2xl border border-forest-900/10 bg-white p-6">
          <h2 className="text-lg font-bold text-forest-900">
            Giới thiệu đại lý (Affiliate)
          </h2>
          <p className="mt-1 text-sm text-forest-700">
            Chia sẻ link dưới đây — mỗi người đăng ký qua link và đạt{" "}
            <strong>Đại lý cấp {MIN_DEALER_LEVEL_FOR_AFFILIATE_CREDIT}</strong>{" "}
            trở lên, bạn được cộng thêm {AFFILIATE_PERCENT_PER_REFERRAL}%
            chiết khấu, tối đa {AFFILIATE_MAX_PERCENT}%.
          </p>

          <div className="mt-4">
            <ReferralLinkBox memberId={member.id} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-forest-950/5 p-4 text-center">
              <p className="text-2xl font-extrabold text-forest-900">
                {stats.referredCount}
              </p>
              <p className="text-xs text-forest-500">Đã giới thiệu</p>
            </div>
            <div className="rounded-xl bg-forest-950/5 p-4 text-center">
              <p className="text-2xl font-extrabold text-forest-900">
                {stats.referredAtLevel2PlusCount}/{AFFILIATE_REFERRALS_FOR_MAX}
              </p>
              <p className="text-xs text-forest-500">
                Đạt cấp {MIN_DEALER_LEVEL_FOR_AFFILIATE_CREDIT}+
              </p>
            </div>
            <div className="rounded-xl bg-gold-400/10 p-4 text-center">
              <p className="text-2xl font-extrabold text-gold-600">
                +{stats.affiliateBonusPercent}%
              </p>
              <p className="text-xs text-forest-500">Thưởng hiện tại</p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-forest-900/10 bg-white p-6">
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
          <Link
            href="/#goi-san-pham"
            className="mt-4 inline-block rounded-xl bg-forest-900 px-5 py-2.5 text-sm font-bold text-cream-50 transition hover:bg-forest-800"
          >
            Xem gói sản phẩm
          </Link>
        </section>
      </main>
    </div>
  );
}
