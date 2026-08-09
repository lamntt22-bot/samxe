"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Mật khẩu mới phải từ 8 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới nhập lại không khớp.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Đổi mật khẩu thất bại.");
        return;
      }

      router.push(data.role === "admin" ? "/admin" : "/dashboard");
      router.refresh();
    } catch {
      setError("Không kết nối được máy chủ, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label
          htmlFor="currentPassword"
          className="mb-1 block text-sm font-medium text-forest-900"
        >
          Mật khẩu hiện tại
        </label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
          autoComplete="current-password"
        />
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="mb-1 block text-sm font-medium text-forest-900"
        >
          Mật khẩu mới (tối thiểu 8 ký tự)
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1 block text-sm font-medium text-forest-900"
        >
          Nhập lại mật khẩu mới
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
          autoComplete="new-password"
        />
      </div>

      {error && <p className="text-sm text-ruby-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-gold-500 px-6 py-3.5 text-base font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-60"
      >
        {submitting ? "Đang lưu..." : "Đổi mật khẩu"}
      </button>
    </form>
  );
}
