"use client";

import { useState } from "react";

export default function UpgradeRequestButton() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleClick() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/upgrade-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Không kết nối được máy chủ.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "sent") {
    return (
      <p className="rounded-xl bg-forest-900/5 px-5 py-3 text-sm font-semibold text-forest-800">
        ✓ Đã gửi yêu cầu nâng cấp — đội ngũ Sâm Xé sẽ liên hệ xác nhận sớm.
      </p>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={submitting}
        className="rounded-xl bg-gold-500 px-6 py-3 text-sm font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-60"
      >
        {submitting ? "Đang gửi..." : "Yêu cầu nâng cấp lên Đối tác"}
      </button>
      {error && <p className="mt-2 text-sm text-ruby-600">{error}</p>}
    </div>
  );
}
