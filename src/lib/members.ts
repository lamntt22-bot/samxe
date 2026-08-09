import type { AudienceId, ProductId } from "@/lib/leads";

export type MemberRole = "member" | "admin";

export interface RegisterPayload {
  name: string;
  phone: string;
  email: string;
  audience: AudienceId;
  product?: ProductId;
  note?: string;
  /** id of the member whose referral link was used, if any */
  referredBy?: string;
  /** honeypot field — must stay empty */
  website?: string;
}

export interface MemberRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: MemberRole;
  audience: AudienceId;
  interestedProduct?: ProductId;
  note?: string;
  referredBy?: string;
  mustChangePassword: boolean;
  createdAt: string;
}

export interface MemberWithHash extends MemberRecord {
  passwordHash: string;
}

export interface OrderRecord {
  id: string;
  memberId: string;
  amount: number;
  note?: string;
  createdAt: string;
}

/**
 * Đại lý cấp 0 = chưa đạt mốc doanh thu nào (chỉ là thành viên Free).
 * Ngưỡng và % chiết khấu theo đúng yêu cầu kinh doanh — chỉnh ở đây nếu
 * chính sách thay đổi, không cần sửa logic tính toán.
 */
export const DEALER_LEVELS = [
  { level: 0, minRevenue: 0, discountPercent: 0, label: "Chưa là đại lý" },
  { level: 1, minRevenue: 10_000_000, discountPercent: 15, label: "Đại lý cấp 1" },
  { level: 2, minRevenue: 30_000_000, discountPercent: 20, label: "Đại lý cấp 2" },
  { level: 3, minRevenue: 60_000_000, discountPercent: 25, label: "Đại lý cấp 3" },
  { level: 4, minRevenue: 100_000_000, discountPercent: 30, label: "Đại lý cấp 4" },
  { level: 5, minRevenue: 200_000_000, discountPercent: 35, label: "Đại lý cấp 5" },
  { level: 6, minRevenue: 500_000_000, discountPercent: 40, label: "Đại lý cấp 6" },
] as const;

export const MIN_DEALER_LEVEL_FOR_AFFILIATE_CREDIT = 2;
export const AFFILIATE_PERCENT_PER_REFERRAL = 1;
export const AFFILIATE_MAX_PERCENT = 10;
export const AFFILIATE_REFERRALS_FOR_MAX = 10;

export function getDealerLevelForRevenue(
  revenue: number,
): (typeof DEALER_LEVELS)[number] {
  let current: (typeof DEALER_LEVELS)[number] = DEALER_LEVELS[0];
  for (const level of DEALER_LEVELS) {
    if (revenue >= level.minRevenue) current = level;
  }
  return current;
}

export function getNextDealerLevel(currentLevel: number) {
  return DEALER_LEVELS.find((l) => l.level === currentLevel + 1) ?? null;
}

export interface MemberStats {
  revenue: number;
  dealerLevel: number;
  dealerDiscountPercent: number;
  referredCount: number;
  referredAtLevel2PlusCount: number;
  affiliateBonusPercent: number;
  totalDiscountPercent: number;
}

export function computeAffiliateBonus(referredAtLevel2PlusCount: number) {
  return Math.min(
    referredAtLevel2PlusCount * AFFILIATE_PERCENT_PER_REFERRAL,
    AFFILIATE_MAX_PERCENT,
  );
}

/**
 * Pure computation, no DB access — given every member and every order, works
 * out each member's revenue, dealer level, and affiliate bonus in one pass.
 * Kept here (not member-store.ts) so it can be unit-tested without Supabase.
 */
export function buildMemberStats(
  members: MemberRecord[],
  orders: OrderRecord[],
): Map<string, MemberStats> {
  const revenueByMember = new Map<string, number>();
  for (const order of orders) {
    revenueByMember.set(
      order.memberId,
      (revenueByMember.get(order.memberId) ?? 0) + order.amount,
    );
  }

  const dealerLevelByMember = new Map<string, number>();
  for (const member of members) {
    const revenue = revenueByMember.get(member.id) ?? 0;
    dealerLevelByMember.set(
      member.id,
      getDealerLevelForRevenue(revenue).level,
    );
  }

  const stats = new Map<string, MemberStats>();
  for (const member of members) {
    const revenue = revenueByMember.get(member.id) ?? 0;
    const dealerLevel = dealerLevelByMember.get(member.id) ?? 0;
    const dealerDiscountPercent = getDealerLevelForRevenue(revenue)
      .discountPercent;

    const referred = members.filter((m) => m.referredBy === member.id);
    const referredAtLevel2PlusCount = referred.filter(
      (m) =>
        (dealerLevelByMember.get(m.id) ?? 0) >=
        MIN_DEALER_LEVEL_FOR_AFFILIATE_CREDIT,
    ).length;
    const affiliateBonusPercent = computeAffiliateBonus(
      referredAtLevel2PlusCount,
    );

    stats.set(member.id, {
      revenue,
      dealerLevel,
      dealerDiscountPercent,
      referredCount: referred.length,
      referredAtLevel2PlusCount,
      affiliateBonusPercent,
      totalDiscountPercent: dealerDiscountPercent + affiliateBonusPercent,
    });
  }

  return stats;
}
