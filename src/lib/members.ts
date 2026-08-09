import type { AudienceId, ProductId } from "@/lib/leads";

export type MemberRole = "member" | "admin";
export type MemberTier = "free" | "doi-tac";

export const TIER_LABELS: Record<MemberTier, string> = {
  free: "Free",
  "doi-tac": "Đối tác",
};

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  audience: AudienceId;
  product?: ProductId;
  note?: string;
  /** honeypot field — must stay empty */
  website?: string;
}

export interface MemberRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: MemberRole;
  tier: MemberTier;
  audience: AudienceId;
  interestedProduct?: ProductId;
  note?: string;
  mustChangePassword: boolean;
  createdAt: string;
}

export interface MemberWithHash extends MemberRecord {
  passwordHash: string;
}

export type UpgradeRequestStatus = "pending" | "approved" | "rejected";

export interface UpgradeRequestRecord {
  id: string;
  memberId: string;
  status: UpgradeRequestStatus;
  note?: string;
  createdAt: string;
  resolvedAt?: string;
}
