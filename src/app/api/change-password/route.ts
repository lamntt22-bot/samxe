import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findMemberById, updateMemberPassword } from "@/lib/member-store";
import {
  SESSION_COOKIE,
  SESSION_COOKIE_OPTIONS,
  createSessionToken,
  hashPassword,
  verifyPassword,
  verifySessionToken,
} from "@/lib/auth";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  currentPassword: z.string().min(1).max(200),
  newPassword: z.string().min(8).max(200),
});

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  if (isRateLimited(`change-password:${session.memberId}`)) {
    return NextResponse.json(
      { error: "Quá nhiều lần thử, vui lòng thử lại sau." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Mật khẩu mới phải từ 8 ký tự." },
      { status: 400 },
    );
  }

  try {
    // Danh tính lấy từ session đã verify, KHÔNG từ body — chống IDOR.
    const member = await findMemberById(session.memberId);
    if (!member) {
      return NextResponse.json(
        { error: "Không tìm thấy tài khoản." },
        { status: 404 },
      );
    }

    const validCurrent = await verifyPassword(
      parsed.data.currentPassword,
      member.passwordHash,
    );
    if (!validCurrent) {
      return NextResponse.json(
        { error: "Mật khẩu hiện tại không đúng." },
        { status: 401 },
      );
    }

    const newHash = await hashPassword(parsed.data.newPassword);
    await updateMemberPassword(member.id, newHash);

    // Refresh the session cookie so mustChangePassword flips to false
    // immediately, without forcing a re-login.
    const newToken = await createSessionToken({
      memberId: member.id,
      role: member.role,
      mustChangePassword: false,
    });

    const response = NextResponse.json({ ok: true, role: member.role });
    response.cookies.set(SESSION_COOKIE, newToken, SESSION_COOKIE_OPTIONS);
    return response;
  } catch (err) {
    console.error("[change-password] failed", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
