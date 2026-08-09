const REFERRAL_STORAGE_KEY = "sxe_ref";

/** Reads `?ref=` from the current URL and remembers it for later registration. */
export function captureReferralFromUrl() {
  if (typeof window === "undefined") return;
  const ref = new URLSearchParams(window.location.search).get("ref");
  if (ref && ref.trim()) {
    window.localStorage.setItem(REFERRAL_STORAGE_KEY, ref.trim());
  }
}

export function getStoredReferralCode(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return window.localStorage.getItem(REFERRAL_STORAGE_KEY) ?? undefined;
}
