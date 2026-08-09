"use client";

import { useEffect, useState } from "react";

export default function ReferralLinkBox({ memberId }: { memberId: string }) {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLink(`${window.location.origin}/?ref=${memberId}`);
  }, [memberId]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — user can still select & copy the text manually
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        readOnly
        value={link}
        onFocus={(e) => e.target.select()}
        className="flex-1 rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-sm text-forest-900 outline-none"
      />
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-forest-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
      >
        {copied ? "✓ Đã copy" : "Copy link"}
      </button>
    </div>
  );
}
