import { getSupabase } from "@/lib/supabase";
import type { LeadPayload, LeadRecord } from "@/lib/leads";

interface LeadRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  audience: string;
  product: string | null;
  note: string | null;
  created_at: string;
}

function toRecord(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    audience: row.audience as LeadRecord["audience"],
    product: (row.product ?? undefined) as LeadRecord["product"],
    note: row.note ?? undefined,
    createdAt: row.created_at,
  };
}

export async function findExistingLeadByContact(
  phone: string,
  email: string,
): Promise<LeadRecord | null> {
  const { data, error } = await getSupabase()
    .from("leads")
    .select("*")
    .or(`phone.eq.${phone},email.ilike.${email}`)
    .limit(1)
    .maybeSingle<LeadRow>();

  if (error) throw error;
  return data ? toRecord(data) : null;
}

export async function appendLead(payload: LeadPayload): Promise<LeadRecord> {
  const { data, error } = await getSupabase()
    .from("leads")
    .insert({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      audience: payload.audience,
      product: payload.product ?? null,
      note: payload.note ?? null,
    })
    .select("*")
    .single<LeadRow>();

  if (error) throw error;
  return toRecord(data);
}
