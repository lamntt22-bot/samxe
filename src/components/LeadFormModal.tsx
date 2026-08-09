"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AUDIENCES, PRODUCTS, type AudienceId, type ProductId } from "@/lib/leads";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAudience?: AudienceId;
  initialProduct?: ProductId;
}

const PHONE_RE = /^(\+84|0)\d{9,10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Step = "form" | "success";

export default function LeadFormModal({
  isOpen,
  onClose,
  initialAudience,
  initialProduct,
}: LeadFormModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<AudienceId>(
    initialAudience ?? "nha-xe",
  );
  const [product, setProduct] = useState<ProductId | "">(
    initialProduct ?? "",
  );
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setAudience(initialAudience ?? "nha-xe");
      setProduct(initialProduct ?? "");
      setSubmitError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function validate() {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Vui lòng nhập họ tên đầy đủ.";
    if (!PHONE_RE.test(phone.trim()))
      next.phone = "Số điện thoại chưa đúng định dạng (VD: 0912345678).";
    if (!EMAIL_RE.test(email.trim()))
      next.email = "Email chưa đúng định dạng.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (website.trim() !== "") {
      // honeypot tripped — silently pretend success
      setStep("success");
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          audience,
          product: product || undefined,
          website,
        }),
      });
      if (res.status === 429) {
        setSubmitError(
          "Bạn vừa đăng ký gần đây — vui lòng thử lại sau ít phút.",
        );
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setSubmitError(data?.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
        return;
      }
      setStep("success");
    } catch {
      setSubmitError("Không kết nối được máy chủ, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-forest-950/60 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-cream-50 p-6 shadow-2xl sm:max-w-md sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-forest-950/5 text-lg text-forest-800 transition hover:bg-forest-950/10"
        >
          ✕
        </button>

        {step === "form" ? (
          <>
            <h2
              id="lead-form-title"
              className="pr-10 text-xl font-bold text-forest-900 sm:text-2xl"
            >
              Đăng ký nhận tư vấn Sâm Xé
            </h2>
            <p className="mt-1 text-sm text-forest-700">
              Điền thông tin, đội ngũ Sâm Xé sẽ liên hệ lại trong 24h.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label
                  htmlFor="lead-name"
                  className="mb-1 block text-sm font-medium text-forest-900"
                >
                  Họ tên
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                  placeholder="Nguyễn Văn A"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-ruby-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lead-phone"
                  className="mb-1 block text-sm font-medium text-forest-900"
                >
                  Số điện thoại
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                  placeholder="0912345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-ruby-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lead-email"
                  className="mb-1 block text-sm font-medium text-forest-900"
                >
                  Email
                </label>
                <input
                  id="lead-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                  placeholder="ban@congty.vn"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-ruby-600">{errors.email}</p>
                )}
              </div>

              <fieldset>
                <legend className="mb-1 block text-sm font-medium text-forest-900">
                  Bạn là
                </legend>
                <div className="flex flex-col gap-2">
                  {AUDIENCES.map((a) => (
                    <label
                      key={a.id}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm text-forest-900 has-[:checked]:border-gold-500 has-[:checked]:bg-gold-400/10"
                    >
                      <input
                        type="radio"
                        name="audience"
                        value={a.id}
                        checked={audience === a.id}
                        onChange={() => setAudience(a.id)}
                        className="accent-gold-600"
                      />
                      {a.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="lead-product"
                  className="mb-1 block text-sm font-medium text-forest-900"
                >
                  Sản phẩm quan tâm (tuỳ chọn)
                </label>
                <select
                  id="lead-product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value as ProductId)}
                  className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-forest-950 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
                >
                  <option value="">— Chưa chọn —</option>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* honeypot — hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              {submitError && (
                <p className="text-sm text-ruby-600">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gold-500 px-6 py-3.5 text-base font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 disabled:opacity-60"
              >
                {submitting ? "Đang gửi..." : "Đăng ký"}
              </button>
            </form>
          </>
        ) : (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-800 text-2xl text-gold-400">
              ✓
            </div>
            <h2 className="mt-4 text-xl font-bold text-forest-900 sm:text-2xl">
              Cảm ơn bạn đã đăng ký!
            </h2>
            <p className="mt-2 text-forest-700">
              Đội ngũ Sâm Xé đã nhận được thông tin và sẽ liên hệ lại với bạn
              trong vòng 24h qua số điện thoại hoặc email vừa cung cấp.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-forest-800 px-6 py-3.5 text-base font-bold text-cream-50 transition hover:bg-forest-700"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
