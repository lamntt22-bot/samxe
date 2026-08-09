import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createUpgradeRequest, findMemberById } from "@/lib/member-store";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  note: z.string().trim().max(500).optional(),
});

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  }

  if (isRateLimited(`upgrade-request:${session.memberId}`)) {
    return NextResponse.json(
      { error: "Bạn vừa gửi yêu cầu gần đây, vui lòng đợi." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Thông tin chưa hợp lệ." },
      { status: 400 },
    );
  }

  try {
    const member = await findMemberById(session.memberId);
    if (!member) {
      return NextResponse.json(
        { error: "Không tìm thấy tài khoản." },
        { status: 404 },
      );
    }

    if (member.tier === "doi-tac") {
      return NextResponse.json({ ok: true, alreadyPartner: true });
    }

    await createUpgradeRequest(member.id, parsed.data.note);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[upgrade-request] failed", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
