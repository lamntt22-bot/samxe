import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendLead, findExistingLeadByContact } from "@/lib/lead-store";
import { isRateLimited } from "@/lib/rate-limit";
import { AUDIENCES, PRODUCTS, type AudienceId, type ProductId } from "@/lib/leads";

const audienceIds = AUDIENCES.map((a) => a.id) as [AudienceId, ...AudienceId[]];
const productIds = PRODUCTS.map((p) => p.id) as [ProductId, ...ProductId[]];

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^(\+84|0)\d{9,10}$/, "invalid phone"),
  email: z.string().trim().email().max(200),
  audience: z.enum(audienceIds),
  product: z.enum(productIds).optional(),
  note: z.string().trim().max(1000).optional(),
  // honeypot — real users never see or fill this; kept permissive so bots
  // that fill it get a fake success instead of a tell-tale 400
  website: z.string().max(200).optional(),
});

/**
 * `x-forwarded-for` can carry attacker-supplied entries prepended before
 * the request reaches our platform. Vercel appends the real connecting IP
 * as `x-real-ip` (and as the last hop of `x-forwarded-for`), so prefer
 * that over trusting the first, client-controllable entry. This is still
 * only a best-effort app-layer signal — real protection against spoofed
 * clients belongs at the edge/WAF (see RULE-24 in bao-mat-CHUAN-OWASP.md).
 */
function getClientIp(request: NextRequest): string {
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const hops = forwardedFor.split(",").map((h) => h.trim());
    return hops[hops.length - 1] || "unknown";
  }

  return "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Quá nhiều yêu cầu, vui lòng thử lại sau." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Thông tin chưa hợp lệ." },
      { status: 400 },
    );
  }

  // honeypot tripped — pretend success, do not persist or touch storage
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _website, ...payload } = parsed.data;

  try {
    const existing = await findExistingLeadByContact(
      payload.phone,
      payload.email,
    );

    if (!existing) {
      await appendLead(payload);
    }

    return NextResponse.json({
      ok: true,
      alreadyRegistered: Boolean(existing),
    });
  } catch (err) {
    console.error("[register] failed to persist lead", err);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
