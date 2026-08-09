import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-forest-900/10 bg-white p-8 shadow-lg">
        <Link
          href="/"
          className="text-sm font-semibold text-gold-600 hover:underline"
        >
          ← Về trang chủ
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-forest-900">
          Đăng nhập
        </h1>
        <p className="mt-1 text-sm text-forest-700">
          Dùng số điện thoại/email và mật khẩu đã nhận khi đăng ký.
        </p>

        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
