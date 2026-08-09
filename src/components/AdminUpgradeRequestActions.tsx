"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminUpgradeRequestActions({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approved" | "rejected" | null>(
    null,
  );
  const [error, setError] = useState("");

  async function resolve(status: "approved" | "rejected") {
    setLoading(status);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/upgrade-requests/${requestId}/resolve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Có lỗi xảy ra.");
        return;
      }
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => resolve("approved")}
          disabled={loading !== null}
          className="rounded-lg bg-forest-900 px-3 py-1.5 text-xs font-bold text-cream-50 transition hover:bg-forest-800 disabled:opacity-60"
        >
          {loading === "approved" ? "..." : "Duyệt"}
        </button>
        <button
          type="button"
          onClick={() => resolve("rejected")}
          disabled={loading !== null}
          className="rounded-lg border border-ruby-600/40 px-3 py-1.5 text-xs font-bold text-ruby-600 transition hover:bg-ruby-700/5 disabled:opacity-60"
        >
          {loading === "rejected" ? "..." : "Từ chối"}
        </button>
      </div>
      {error && <p className="text-xs text-ruby-600">{error}</p>}
    </div>
  );
}
