"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminAddOrderForm({
  memberId,
}: {
  memberId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const amountNumber = Number(amount.replace(/[^\d]/g, ""));
    if (!amountNumber || amountNumber <= 0) {
      setError("Nhập số tiền hợp lệ.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/members/${memberId}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountNumber, note: note.trim() || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Có lỗi xảy ra.");
        return;
      }
      setAmount("");
      setNote("");
      setOpen(false);
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-forest-900 px-3 py-1.5 text-xs font-bold text-cream-50 transition hover:bg-forest-800"
      >
        + Thêm đơn hàng
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Số tiền (đ)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-28 rounded-lg border border-forest-900/15 px-2 py-1.5 text-xs"
        />
        <input
          type="text"
          placeholder="Ghi chú (tuỳ chọn)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-32 rounded-lg border border-forest-900/15 px-2 py-1.5 text-xs"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-gold-500 px-3 py-1.5 text-xs font-bold text-forest-950 disabled:opacity-60"
        >
          {submitting ? "..." : "Lưu"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-forest-900/15 px-3 py-1.5 text-xs text-forest-700"
        >
          Huỷ
        </button>
      </div>
      {error && <p className="text-xs text-ruby-600">{error}</p>}
    </form>
  );
}
