"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TIER_LABELS, type MemberTier } from "@/lib/members";

export default function AdminTierSelect({
  memberId,
  currentTier,
}: {
  memberId: string;
  currentTier: MemberTier;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleChange(tier: MemberTier) {
    setSaving(true);
    try {
      await fetch(`/api/admin/members/${memberId}/tier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={currentTier}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as MemberTier)}
      className="rounded-lg border border-forest-900/15 bg-white px-2 py-1 text-xs text-forest-900"
    >
      {Object.entries(TIER_LABELS).map(([id, label]) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  );
}
