import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminFromRequest } from "@/lib/session";
import { createOrder } from "@/lib/member-store";

const schema = z.object({
  amount: z.number().positive().max(100_000_000_000),
  note: z.string().trim().max(500).optional(),
});

export async function POST(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/members/[id]/orders">,
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
      { error: "Số tiền không hợp lệ." },
      { status: 400 },
    );
  }

  try {
    const order = await createOrder(id, parsed.data.amount, parsed.data.note);
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error("[admin/members/orders] failed", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
