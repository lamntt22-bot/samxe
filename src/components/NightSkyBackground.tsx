import type { CSSProperties } from "react";

const STARS = [
  { top: "6%", left: "8%", size: 2, delay: "0s", opacity: 0.8 },
  { top: "12%", left: "22%", size: 3, delay: "0.6s", opacity: 0.9 },
  { top: "9%", left: "40%", size: 2, delay: "1.4s", opacity: 0.7 },
  { top: "18%", left: "52%", size: 2, delay: "2.1s", opacity: 0.6 },
  { top: "5%", left: "63%", size: 3, delay: "0.9s", opacity: 0.85 },
  { top: "22%", left: "12%", size: 2, delay: "1.8s", opacity: 0.6 },
  { top: "28%", left: "30%", size: 2, delay: "2.6s", opacity: 0.7 },
  { top: "15%", left: "78%", size: 3, delay: "0.3s", opacity: 0.9 },
  { top: "32%", left: "68%", size: 2, delay: "1.1s", opacity: 0.65 },
  { top: "38%", left: "18%", size: 2, delay: "1.9s", opacity: 0.55 },
  { top: "10%", left: "88%", size: 2, delay: "2.4s", opacity: 0.75 },
  { top: "24%", left: "92%", size: 3, delay: "0.7s", opacity: 0.85 },
  { top: "44%", left: "8%", size: 2, delay: "1.3s", opacity: 0.5 },
  { top: "42%", left: "44%", size: 2, delay: "2.9s", opacity: 0.6 },
  { top: "35%", left: "58%", size: 2, delay: "0.4s", opacity: 0.7 },
  { top: "48%", left: "80%", size: 2, delay: "1.6s", opacity: 0.55 },
  { top: "3%", left: "30%", size: 2, delay: "2.2s", opacity: 0.65 },
  { top: "20%", left: "3%", size: 2, delay: "0.2s", opacity: 0.6 },
  { top: "55%", left: "25%", size: 2, delay: "1.0s", opacity: 0.5 },
  { top: "60%", left: "50%", size: 2, delay: "2.7s", opacity: 0.55 },
  { top: "50%", left: "90%", size: 2, delay: "0.5s", opacity: 0.6 },
  { top: "62%", left: "10%", size: 2, delay: "1.7s", opacity: 0.5 },
];

const BIG_STARS = [
  { top: "10%", left: "20%", size: 22, delay: "0s", duration: "2.25s" },
  { top: "6%", left: "58%", size: 16, delay: "0.6s", duration: "1.9s" },
  { top: "26%", left: "85%", size: 18, delay: "1.05s", duration: "2.1s" },
  { top: "34%", left: "6%", size: 14, delay: "0.35s", duration: "2.5s" },
  { top: "16%", left: "38%", size: 12, delay: "1.4s", duration: "2s" },
];

function Sparkle({
  size,
  className,
  style,
}: {
  size: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="var(--color-gold-400)"
    >
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

export default function NightSkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* slow rotating hazy swirl */}
      <div
        className="animate-swirl absolute left-1/2 top-1/2 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
        style={{
          background:
            "conic-gradient(from 0deg, var(--color-gold-500), transparent 25%, var(--color-forest-600) 50%, transparent 75%, var(--color-gold-500))",
          filter: "blur(60px)",
        }}
      />

      {/* hazy drifting cloud blobs */}
      <div
        className="animate-cloud-drift absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-forest-600) 0%, transparent 70%)",
          animationDuration: "15s",
        }}
      />
      <div
        className="animate-cloud-drift absolute right-[-8rem] top-4 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-500) 0%, transparent 70%)",
          animationDuration: "11s",
          animationDelay: "-3s",
        }}
      />
      <div
        className="animate-cloud-drift absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-forest-700) 0%, transparent 70%)",
          animationDuration: "17s",
          animationDelay: "-6s",
        }}
      />

      {/* big glowing sparkle stars */}
      {BIG_STARS.map((star, i) => (
        <Sparkle
          key={`big-${i}`}
          size={star.size}
          className="animate-sparkle-pulse absolute drop-shadow-[0_0_10px_rgba(228,192,105,0.85)]"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* twinkling small stars */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className="animate-star-twinkle absolute rounded-full bg-gold-400"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            boxShadow: "0 0 6px 1px rgba(228, 192, 105, 0.6)",
            animationDelay: star.delay,
            // @ts-expect-error -- CSS custom properties aren't in React's style type
            "--star-max-opacity": star.opacity,
          }}
        />
      ))}
    </div>
  );
}
