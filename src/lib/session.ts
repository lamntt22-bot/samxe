import "server-only";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { findMemberById } from "@/lib/member-store";
import type { MemberRecord } from "@/lib/members";

/**
 * Re-verifies the session and re-fetches the member server-side, even
 * though `proxy.ts` already gates these routes — defense in depth, so a
 * page never trusts a single layer for who's allowed to see it.
 */
export async function getCurrentMember(): Promise<MemberRecord | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  const member = await findMemberById(session.memberId);
  if (!member) return null;

  const { passwordHash: _passwordHash, ...record } = member;
  return record;
}

/** For API routes: verifies the session cookie belongs to an admin, or returns null. */
export async function requireAdminFromRequest(
  request: NextRequest,
): Promise<MemberRecord | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session || session.role !== "admin") return null;

  const member = await findMemberById(session.memberId);
  if (!member || member.role !== "admin") return null;

  const { passwordHash: _passwordHash, ...record } = member;
  return record;
}
