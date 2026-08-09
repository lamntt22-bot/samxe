import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/session";
import { resolveUpgradeRequest } from "@/lib/member-store";

const schema = z.object({
  status: z.enum(["approved", "rejected"]),
});

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/upgrade-requests/[id]/resolve">,
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
    const updated = await resolveUpgradeRequest(id, parsed.data.status);
    return NextResponse.json({ ok: true, request: updated });
  } catch (err) {
    console.error("[admin/upgrade-requests/resolve] failed", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
