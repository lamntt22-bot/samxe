import { redirect } from "next/navigation";
import MemberNav from "@/components/MemberNav";
import UpgradeRequestButton from "@/components/UpgradeRequestButton";
import { getCurrentMember } from "@/lib/session";
import { TIER_LABELS } from "@/lib/members";

const TIERS = [
  {
    id: "free" as const,
    price: "Miễn phí",
    perks: [
      "Xem đầy đủ thông tin 4 quy cách sản phẩm",
      "Được liên hệ tư vấn khi có nhu cầu",
    ],
  },
  {
    id: "doi-tac" as const,
    price: "Xác nhận qua hợp tác/mua hàng thật",
    perks: [
      "Đầu mối liên hệ ưu tiên riêng",
      "Lịch giao hộp dự trữ định kỳ theo thoả thuận",
      "Mã ưu đãi riêng cho lần đặt tiếp theo",
    ],
  },
];

export default async function UpgradePage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login");

  return (
    <div className="min-h-screen bg-cream-100">
      <MemberNav />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-extrabold text-forest-900">
          Nâng cấp gói
        </h1>
        <p className="mt-1 text-sm text-forest-700">
          Hạng hiện tại của bạn: <strong>{TIER_LABELS[member.tier]}</strong>
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl border p-6 ${
                member.tier === tier.id
                  ? "border-gold-500 bg-gold-400/10"
                  : "border-forest-900/10 bg-white"
              }`}
            >
              <h2 className="text-lg font-bold text-forest-900">
                {TIER_LABELS[tier.id]}
              </h2>
              <p className="mt-1 text-sm text-forest-700">{tier.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-forest-700">
                {tier.perks.map((perk) => (
                  <li key={perk}>✓ {perk}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          {member.tier === "doi-tac" ? (
            <p className="rounded-xl bg-forest-900/5 px-5 py-3 text-sm font-semibold text-forest-800">
              Bạn đã là Đối tác — cảm ơn bạn đã đồng hành cùng Sâm Xé.
            </p>
          ) : (
            <UpgradeRequestButton />
          )}
        </div>
      </main>
    </div>
  );
}
