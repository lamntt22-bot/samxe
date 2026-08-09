import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream-100 px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-forest-900/10 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-extrabold text-forest-900">
          Đổi mật khẩu
        </h1>
        <p className="mt-1 text-sm text-forest-700">
          Vì lý do bảo mật, bạn cần đổi mật khẩu mặc định trước khi tiếp tục.
        </p>

        <div className="mt-6">
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  );
}
