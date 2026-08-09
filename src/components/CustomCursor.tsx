"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, summary, [role='button'], input[type='submit'], input[type='button']";
const TEXT_FIELD_SELECTOR = "input, textarea, select, [contenteditable='true']";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(0);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const hoveredEl = e.target as HTMLElement | null;
      const overInteractive = Boolean(
        hoveredEl?.closest(INTERACTIVE_SELECTOR),
      );
      const overTextField = Boolean(hoveredEl?.closest(TEXT_FIELD_SELECTOR));

      cursorRef.current?.classList.toggle("cursor-hover", overInteractive);
      cursorRef.current?.classList.toggle("cursor-hidden", overTextField);
      glowRef.current?.classList.toggle("glow-hover", overInteractive);
    }

    function loop() {
      glowPos.current.x += (target.current.x - glowPos.current.x) * 0.14;
      glowPos.current.y += (target.current.y - glowPos.current.y) * 0.14;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="glow-orb pointer-events-none fixed left-0 top-0 z-[9998]"
      />
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <svg
          viewBox="0 0 32 32"
          className="ginseng-cursor text-gold-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 20 C 12 24, 10 26, 8 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M18 20 C 20 24, 22 26, 24 30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M16 21 C 15.5 25, 16 28, 16 31"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M16 8 C 20 8, 21 12, 20 16 C 19.5 19, 18 21, 16 21 C 14 21, 12.5 19, 12 16 C 11 12, 12 8, 16 8 Z"
            fill="currentColor"
            stroke="var(--color-forest-950)"
            strokeWidth="0.75"
          />
          <path
            d="M16 8 L16 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <ellipse
            cx="16"
            cy="3"
            rx="1.8"
            ry="3.2"
            fill="currentColor"
            transform="rotate(-35 16 3)"
          />
          <ellipse cx="16" cy="2.5" rx="1.8" ry="3.4" fill="currentColor" />
          <ellipse
            cx="16"
            cy="3"
            rx="1.8"
            ry="3.2"
            fill="currentColor"
            transform="rotate(35 16 3)"
          />
        </svg>
      </div>
    </>
  );
}
