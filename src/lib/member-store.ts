import { getSupabase } from "@/lib/supabase";
import type { AudienceId, ProductId } from "@/lib/leads";
import {
  buildMemberStats,
  type MemberRecord,
  type MemberRole,
  type MemberStats,
  type MemberWithHash,
  type OrderRecord,
  type RegisterPayload,
} from "@/lib/members";

interface MemberRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: string;
  audience: string;
  interested_product: string | null;
  note: string | null;
  referred_by: string | null;
  must_change_password: boolean;
  created_at: string;
}

interface OrderRow {
  id: string;
  member_id: string;
  amount: number;
  note: string | null;
  created_at: string;
}

function toMemberWithHash(row: MemberRow): MemberWithHash {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role as MemberRole,
    audience: row.audience as AudienceId,
    interestedProduct: (row.interested_product ?? undefined) as
      | ProductId
      | undefined,
    note: row.note ?? undefined,
    referredBy: row.referred_by ?? undefined,
    mustChangePassword: row.must_change_password,
    createdAt: row.created_at,
  };
}

function toMemberRecord(row: MemberRow): MemberRecord {
  const { passwordHash: _passwordHash, ...rest } = toMemberWithHash(row);
  return rest;
}

function toOrderRecord(row: OrderRow): OrderRecord {
  return {
    id: row.id,
    memberId: row.member_id,
    amount: row.amount,
    note: row.note ?? undefined,
    createdAt: row.created_at,
  };
}

export async function findMemberByContact(
  phone: string,
  email: string,
): Promise<MemberWithHash | null> {
  const { data, error } = await getSupabase()
    .from("members")
    .select("*")
    .or(`phone.eq.${phone},email.ilike.${email}`)
    .limit(1)
    .maybeSingle<MemberRow>();

  if (error) throw error;
  return data ? toMemberWithHash(data) : null;
}

export async function findMemberByLoginId(
  loginId: string,
): Promise<MemberWithHash | null> {
  const { data, error } = await getSupabase()
    .from("members")
    .select("*")
    .or(`phone.eq.${loginId},email.ilike.${loginId}`)
    .limit(1)
    .maybeSingle<MemberRow>();

  if (error) throw error;
  return data ? toMemberWithHash(data) : null;
}

export async function findMemberById(
  id: string,
): Promise<MemberWithHash | null> {
  const { data, error } = await getSupabase()
    .from("members")
    .select("*")
    .eq("id", id)
    .maybeSingle<MemberRow>();

  if (error) throw error;
  return data ? toMemberWithHash(data) : null;
}

export async function createMember(
  payload: RegisterPayload,
  passwordHash: string,
): Promise<MemberRecord> {
  // Referral must point at a real, existing member — otherwise silently
  // drop it rather than fail the whole registration over a stale/forged/
  // malformed (e.g. non-uuid) link.
  let referredBy: string | null = null;
  if (payload.referredBy) {
    try {
      const referrer = await findMemberById(payload.referredBy);
      if (referrer) referredBy = referrer.id;
    } catch {
      referredBy = null;
    }
  }

  const { data, error } = await getSupabase()
    .from("members")
    .insert({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      password_hash: passwordHash,
      audience: payload.audience,
      interested_product: payload.product ?? null,
      note: payload.note ?? null,
      referred_by: referredBy,
    })
    .select("*")
    .single<MemberRow>();

  if (error) throw error;
  return toMemberRecord(data);
}

export async function updateMemberPassword(
  id: string,
  passwordHash: string,
): Promise<void> {
  const { error } = await getSupabase()
    .from("members")
    .update({ password_hash: passwordHash, must_change_password: false })
    .eq("id", id);

  if (error) throw error;
}

export async function listMembers(): Promise<MemberRecord[]> {
  const { data, error } = await getSupabase()
    .from("members")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<MemberRow[]>();

  if (error) throw error;
  return (data ?? []).map(toMemberRecord);
}

export async function listAllOrders(): Promise<OrderRecord[]> {
  const { data, error } = await getSupabase()
    .from("orders")
    .select("*")
    .returns<OrderRow[]>();

  if (error) throw error;
  return (data ?? []).map(toOrderRecord);
}

export async function listOrdersForMember(
  memberId: string,
): Promise<OrderRecord[]> {
  const { data, error } = await getSupabase()
    .from("orders")
    .select("*")
    .eq("member_id", memberId)
    .order("created_at", { ascending: false })
    .returns<OrderRow[]>();

  if (error) throw error;
  return (data ?? []).map(toOrderRecord);
}

export async function createOrder(
  memberId: string,
  amount: number,
  note?: string,
): Promise<OrderRecord> {
  const { data, error } = await getSupabase()
    .from("orders")
    .insert({ member_id: memberId, amount, note: note ?? null })
    .select("*")
    .single<OrderRow>();

  if (error) throw error;
  return toOrderRecord(data);
}

/** Fetches every member + every order once and computes stats for all of them. */
export async function getAllMemberStats(): Promise<{
  members: MemberRecord[];
  statsByMemberId: Map<string, MemberStats>;
}> {
  const [members, orders] = await Promise.all([listMembers(), listAllOrders()]);
  return { members, statsByMemberId: buildMemberStats(members, orders) };
}

export async function getMemberStats(memberId: string): Promise<MemberStats> {
  const { statsByMemberId } = await getAllMemberStats();
  return (
    statsByMemberId.get(memberId) ?? {
      revenue: 0,
      dealerLevel: 0,
      dealerDiscountPercent: 0,
      referredCount: 0,
      referredAtLevel2PlusCount: 0,
      affiliateBonusPercent: 0,
      totalDiscountPercent: 0,
    }
  );
}
