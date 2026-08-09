"use client";

import { useState } from "react";

interface VideoCardProps {
  videoId: string;
  title: string;
  channel: string;
}

export default function VideoCard({ videoId, title, channel }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-forest-900/10 bg-white">
      <div className="relative aspect-video w-full bg-forest-950">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Xem video: ${title}`}
            className="group relative h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not optimizable by next/image without a remote-pattern allowlist */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-forest-950/20 transition group-hover:bg-forest-950/10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-2xl text-forest-950 shadow-lg transition group-hover:scale-110">
                ▶
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug text-forest-900">
          {title}
        </p>
        <p className="mt-1 text-xs text-forest-500">Nguồn: {channel}</p>
      </div>
    </div>
  );
}
