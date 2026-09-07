"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type HeroVideoProps = {
  src: string;
  type: string;
  poster: string;
  className: string;
  playLabel: string;
};

export function HeroVideo({
  src,
  type,
  poster,
  className,
  playLabel,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const requestPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set the DOM property as well as the JSX attribute before every retry.
    // Safari requires a silent, inline video before it will consider autoplay.
    video.muted = true;
    const playback = video.play();

    void playback
      .then(() => setShowPlayButton(false))
      .catch(() => setShowPlayButton(true));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    requestPlayback();

    // Retry when the scene comes back into view and at the first intentional
    // interaction. The latter gives Safari a user gesture when it withheld
    // initial autoplay to preserve battery.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) requestPlayback();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);

    const retryAfterIntent = () => requestPlayback();
    window.addEventListener("pointerdown", retryAfterIntent, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", retryAfterIntent, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", retryAfterIntent);
      window.removeEventListener("keydown", retryAfterIntent);
    };
  }, [requestPlayback]);

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        className={className}
        onCanPlay={requestPlayback}
        onPlaying={() => setShowPlayButton(false)}
        onPause={(event) => {
          if (!event.currentTarget.ended) setShowPlayButton(true);
        }}
      >
        <source src={src} type={type} />
      </video>

      {showPlayButton ? (
        <button
          type="button"
          onClick={requestPlayback}
          className="absolute top-[calc(var(--header-height)+1rem)] right-5 z-10 inline-flex h-11 items-center gap-2 rounded-full border border-white/35 bg-background/60 px-4 text-xs font-semibold tracking-[0.08em] text-text uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-[border-color,background-color,transform] duration-200 hover:border-primary hover:bg-background/80 active:scale-[0.98] sm:right-8"
        >
          <Play className="h-4 w-4 fill-current text-primary" aria-hidden />
          {playLabel}
        </button>
      ) : null}
    </>
  );
}
