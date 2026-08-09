import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/session";
import { updateMemberTier } from "@/lib/member-store";

const schema = z.object({
  tier: z.enum(["free", "doi-tac"]),
});

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/members/[id]/tier">,
) {
  const admin = await requireAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Không có quyền." }, { status: 403 });
  }

  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Thông tin chưa hợp lệ." },
      { status: 400 },
    );
  }

  try {
    await updateMemberTier(id, parsed.data.tier);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/members/tier] failed", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
