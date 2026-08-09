import { redirect } from "next/navigation";
import AdminTierSelect from "@/components/AdminTierSelect";
import AdminUpgradeRequestActions from "@/components/AdminUpgradeRequestActions";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentMember } from "@/lib/session";
import { listMembers, listUpgradeRequests } from "@/lib/member-store";
import { AUDIENCES, PRODUCTS } from "@/lib/leads";
import { TIER_LABELS } from "@/lib/members";

export default async function AdminPage() {
  const admin = await getCurrentMember();
  if (!admin || admin.role !== "admin") redirect("/login");

  const [members, upgradeRequests] = await Promise.all([
    listMembers(),
    listUpgradeRequests(),
  ]);

  const memberById = new Map(members.map((m) => [m.id, m]));
  const pendingRequests = upgradeRequests.filter(
    (r) => r.status === "pending",
  );

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="border-b border-forest-900/10 bg-forest-950 text-cream-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-extrabold">SÂM XÉ — Admin</p>
            <p className="text-xs text-cream-100/70">
              Đăng nhập: {admin.email}
            </p>
          </div>
          <LogoutButton className="rounded-lg border border-cream-50/30 px-4 py-2 text-sm font-bold transition hover:bg-cream-50/10" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <section>
          <h2 className="text-lg font-bold text-forest-900">
            Yêu cầu nâng cấp đang chờ ({pendingRequests.length})
          </h2>
          {pendingRequests.length === 0 ? (
            <p className="mt-3 text-sm text-forest-500">
              Không có yêu cầu nào đang chờ.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-forest-900/10 bg-white">
              <table className="w-full min-w-[500px] text-sm">
                <thead>
                  <tr className="border-b border-forest-900/10 text-left text-xs uppercase tracking-wide text-forest-500">
                    <th className="px-4 py-3">Thành viên</th>
                    <th className="px-4 py-3">Liên hệ</th>
                    <th className="px-4 py-3">Ngày gửi</th>
                    <th className="px-4 py-3 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((r) => {
                    const m = memberById.get(r.memberId);
                    return (
                      <tr key={r.id} className="border-b border-forest-900/5">
                        <td className="px-4 py-3 font-medium text-forest-900">
                          {m?.name ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-forest-700">
                          {m ? `${m.phone} · ${m.email}` : "—"}
                        </td>
                        <td className="px-4 py-3 text-forest-500">
                          {new Date(r.createdAt).toLocaleString("vi-VN")}
                        </td>
                        <td className="px-4 py-3">
                          <AdminUpgradeRequestActions requestId={r.id} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-forest-900">
            Tất cả thành viên ({members.length})
          </h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-forest-900/10 bg-white">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-forest-900/10 text-left text-xs uppercase tracking-wide text-forest-500">
                  <th className="px-4 py-3">Tên</th>
                  <th className="px-4 py-3">Liên hệ</th>
                  <th className="px-4 py-3">Là</th>
                  <th className="px-4 py-3">Sản phẩm quan tâm</th>
                  <th className="px-4 py-3">Hạng</th>
                  <th className="px-4 py-3">Ngày đăng ký</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
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
                    <td className="px-4 py-3">
                      {m.role === "admin" ? (
                        TIER_LABELS[m.tier]
                      ) : (
                        <AdminTierSelect
                          memberId={m.id}
                          currentTier={m.tier}
                        />
                      )}
                    </td>
                    <td className="px-4 py-3 text-forest-500">
                      {new Date(m.createdAt).toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
