import { redirect } from "next/navigation";
import AdminAddOrderForm from "@/components/AdminAddOrderForm";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentMember } from "@/lib/session";
import { getAllMemberStats } from "@/lib/member-store";
import { AUDIENCES, PRODUCTS } from "@/lib/leads";
import { DEALER_LEVELS } from "@/lib/members";
import { formatVnd } from "@/lib/format";

export default async function AdminPage() {
  const admin = await getCurrentMember();
  if (!admin || admin.role !== "admin") redirect("/login");

  const { members, statsByMemberId } = await getAllMemberStats();

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="border-b border-forest-900/10 bg-forest-950 text-cream-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-extrabold">SÂM XÉ — Admin</p>
            <p className="text-xs text-cream-100/70">
              Đăng nhập: {admin.email}
            </p>
          </div>
          <LogoutButton className="rounded-lg border border-cream-50/30 px-4 py-2 text-sm font-bold transition hover:bg-cream-50/10" />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h2 className="text-lg font-bold text-forest-900">
          Tất cả thành viên ({members.length})
        </h2>
        <p className="mt-1 text-sm text-forest-500">
          Bấm &ldquo;+ Thêm đơn hàng&rdquo; để ghi nhận doanh thu cho một
          thành viên — cấp đại lý và chiết khấu sẽ tự tính lại theo doanh thu
          tích luỹ.
        </p>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-forest-900/10 bg-white">
          <table className="w-full min-w-[1100px] text-sm">
            <thead>
              <tr className="border-b border-forest-900/10 text-left text-xs uppercase tracking-wide text-forest-500">
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Liên hệ</th>
                <th className="px-4 py-3">Là</th>
                <th className="px-4 py-3">Sản phẩm quan tâm</th>
                <th className="px-4 py-3">Doanh thu tích luỹ</th>
                <th className="px-4 py-3">Cấp đại lý</th>
                <th className="px-4 py-3">Giới thiệu (cấp 2+)</th>
                <th className="px-4 py-3">Tổng chiết khấu</th>
                <th className="px-4 py-3">Ghi nhận đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => {
                const stats = statsByMemberId.get(m.id);
                const levelLabel =
                  DEALER_LEVELS[stats?.dealerLevel ?? 0].label;
                return (
                  <tr key={m.id} className="border-b border-forest-900/5">
                    <td className="px-4 py-3 font-medium text-forest-900">
                      {m.name}
                      {m.role === "admin" && (
                        <span className="ml-2 rounded bg-forest-900 px-1.5 py-0.5 text-[10px] font-bold text-cream-50">
                          ADMIN
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-forest-700">
                      {m.phone}
                      <br />
                      {m.email}
                    </td>
                    <td className="px-4 py-3 text-forest-700">
                      {AUDIENCES.find((a) => a.id === m.audience)?.label ??
                        m.audience}
                    </td>
                    <td className="px-4 py-3 text-forest-700">
                      {m.interestedProduct
                        ? (PRODUCTS.find((p) => p.id === m.interestedProduct)
                            ?.label ?? m.interestedProduct)
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-forest-700">
                      {formatVnd(stats?.revenue ?? 0)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          (stats?.dealerLevel ?? 0) > 0
                            ? "rounded-full bg-gold-400/20 px-2 py-1 text-xs font-bold text-gold-600"
                            : "text-xs text-forest-500"
                        }
                      >
                        {levelLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-forest-700">
                      {stats?.referredAtLevel2PlusCount ?? 0} /{" "}
                      {stats?.referredCount ?? 0} tổng
                    </td>
                    <td className="px-4 py-3 font-semibold text-forest-900">
                      {stats?.totalDiscountPercent ?? 0}%
                    </td>
                    <td className="px-4 py-3">
                      <AdminAddOrderForm memberId={m.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
