import { getSupabase } from "@/lib/supabase";
import type { AudienceId, ProductId } from "@/lib/leads";
import type {
  MemberRecord,
  MemberRole,
  MemberTier,
  MemberWithHash,
  RegisterPayload,
  UpgradeRequestRecord,
  UpgradeRequestStatus,
} from "@/lib/members";

interface MemberRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: string;
  tier: string;
  audience: string;
  interested_product: string | null;
  note: string | null;
  must_change_password: boolean;
  created_at: string;
}

interface UpgradeRequestRow {
  id: string;
  member_id: string;
  status: string;
  note: string | null;
  created_at: string;
  resolved_at: string | null;
}

function toMemberWithHash(row: MemberRow): MemberWithHash {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role as MemberRole,
    tier: row.tier as MemberTier,
    audience: row.audience as AudienceId,
    interestedProduct: (row.interested_product ?? undefined) as
      | ProductId
      | undefined,
    note: row.note ?? undefined,
    mustChangePassword: row.must_change_password,
    createdAt: row.created_at,
  };
}

function toMemberRecord(row: MemberRow): MemberRecord {
  const { passwordHash: _passwordHash, ...rest } = toMemberWithHash(row);
  return rest;
}

function toUpgradeRequest(row: UpgradeRequestRow): UpgradeRequestRecord {
  return {
    id: row.id,
    memberId: row.member_id,
    status: row.status as UpgradeRequestStatus,
    note: row.note ?? undefined,
    createdAt: row.created_at,
    resolvedAt: row.resolved_at ?? undefined,
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

export async function updateMemberTier(
  id: string,
  tier: MemberTier,
): Promise<void> {
  const { error } = await getSupabase()
    .from("members")
    .update({ tier })
    .eq("id", id);

  if (error) throw error;
}

export async function createUpgradeRequest(
  memberId: string,
  note?: string,
): Promise<UpgradeRequestRecord> {
  const { data, error } = await getSupabase()
    .from("upgrade_requests")
    .insert({ member_id: memberId, note: note ?? null })
    .select("*")
    .single<UpgradeRequestRow>();

  if (error) throw error;
  return toUpgradeRequest(data);
}

export async function listUpgradeRequests(): Promise<UpgradeRequestRecord[]> {
  const { data, error } = await getSupabase()
    .from("upgrade_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<UpgradeRequestRow[]>();

  if (error) throw error;
  return (data ?? []).map(toUpgradeRequest);
}

export async function resolveUpgradeRequest(
  id: string,
  status: "approved" | "rejected",
): Promise<UpgradeRequestRecord> {
  const { data, error } = await getSupabase()
    .from("upgrade_requests")
    .update({ status, resolved_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single<UpgradeRequestRow>();

  if (error) throw error;

  if (status === "approved") {
    await updateMemberTier(data.member_id, "doi-tac");
  }

  return toUpgradeRequest(data);
}
