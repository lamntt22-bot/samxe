import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

const LINKS = [
  { href: "/dashboard", label: "Tổng quan" },
  { href: "/change-password", label: "Đổi mật khẩu" },
];

export default function MemberNav({ homeHref = "/dashboard" }: { homeHref?: string }) {
  return (
    <header className="border-b border-forest-900/10 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link
          href={homeHref}
          className="text-lg font-extrabold text-forest-900"
        >
          SÂM XÉ
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-forest-700">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-gold-600"
            >
              {link.label}
            </Link>
          ))}
          <LogoutButton className="text-ruby-600 transition hover:text-ruby-700" />
        </nav>
      </div>
    </header>
  );
}
