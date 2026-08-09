"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import FloatingContactButton from "@/components/FloatingContactButton";
import LeadFormModal from "@/components/LeadFormModal";
import type { AudienceId, ProductId } from "@/lib/leads";
import { captureReferralFromUrl } from "@/lib/referral";

interface OpenOptions {
  audience?: AudienceId;
  product?: ProductId;
}

interface LeadCaptureContextValue {
  open: (options?: OpenOptions) => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextValue | null>(
  null,
);

export function useLeadCapture() {
  const ctx = useContext(LeadCaptureContext);
  if (!ctx) {
    throw new Error("useLeadCapture must be used within LeadCaptureProvider");
  }
  return ctx;
}

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [audience, setAudience] = useState<AudienceId | undefined>();
  const [product, setProduct] = useState<ProductId | undefined>();

  useEffect(() => {
    captureReferralFromUrl();
  }, []);

  const open = useCallback((options?: OpenOptions) => {
    setAudience(options?.audience);
    setProduct(options?.product);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LeadCaptureContext.Provider value={value}>
      {children}
      {!isOpen && <FloatingContactButton />}
      <LeadFormModal
        isOpen={isOpen}
        onClose={close}
        initialAudience={audience}
        initialProduct={product}
      />
    </LeadCaptureContext.Provider>
  );
}
