const STARS = [
  { top: "10%", left: "10%", size: 2, delay: "0.2s", opacity: 0.7 },
  { top: "20%", left: "30%", size: 2, delay: "0.9s", opacity: 0.5 },
  { top: "15%", left: "55%", size: 3, delay: "1.4s", opacity: 0.85 },
  { top: "30%", left: "75%", size: 2, delay: "0.4s", opacity: 0.6 },
  { top: "45%", left: "15%", size: 2, delay: "1.1s", opacity: 0.55 },
  { top: "55%", left: "45%", size: 2, delay: "1.8s", opacity: 0.6 },
  { top: "40%", left: "88%", size: 2, delay: "0.6s", opacity: 0.7 },
  { top: "65%", left: "65%", size: 2, delay: "1.3s", opacity: 0.5 },
  { top: "8%", left: "85%", size: 2, delay: "2.0s", opacity: 0.65 },
  { top: "60%", left: "8%", size: 2, delay: "0.1s", opacity: 0.5 },
];

const BIG_STARS = [
  { top: "14%", left: "22%", size: 14, delay: "0s", duration: "2.1s" },
  { top: "50%", left: "80%", size: 12, delay: "0.7s", duration: "1.9s" },
];

export default function StarAccent() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="animate-cloud-drift absolute -left-16 -top-16 h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-500) 0%, transparent 70%)",
          animationDuration: "14s",
        }}
      />

      {BIG_STARS.map((star, i) => (
        <svg
          key={`big-${i}`}
          viewBox="0 0 24 24"
          width={star.size}
          height={star.size}
          fill="var(--color-gold-400)"
          className="animate-sparkle-pulse absolute drop-shadow-[0_0_8px_rgba(228,192,105,0.8)]"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        >
          <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
        </svg>
      ))}

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
