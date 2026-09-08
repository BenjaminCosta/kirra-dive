"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/cn";

const intentRetryCallbacks = new Set<() => void>();
let hasObservedUserIntent = false;
let intentListenersAttached = false;

function retryAfterUserIntent() {
  hasObservedUserIntent = true;
  intentListenersAttached = false;

  for (const callback of intentRetryCallbacks) callback();
  intentRetryCallbacks.clear();

  window.removeEventListener("pointerdown", retryAfterUserIntent);
  window.removeEventListener("keydown", retryAfterUserIntent);
}

function registerIntentRetry(callback: () => void) {
  if (hasObservedUserIntent) {
    callback();
    return () => undefined;
  }

  intentRetryCallbacks.add(callback);

  if (!intentListenersAttached) {
    intentListenersAttached = true;
    window.addEventListener("pointerdown", retryAfterUserIntent, {
      once: true,
      passive: true,
    });
    window.addEventListener("keydown", retryAfterUserIntent, { once: true });
  }

  return () => intentRetryCallbacks.delete(callback);
}

type AutoplayVideoProps = {
  src: string;
  type: string;
  poster: string;
  className: string;
  playLabel: string;
  playButtonClassName?: string;
  iconOnly?: boolean;
};

/**
 * Native iOS autoplay can be withheld even for muted, inline clips. Keep the
 * video silent and inline, retry when it is visible or after the first gesture,
 * then offer a small manual control only when the browser still refuses it.
 */
export function AutoplayVideo({
  src,
  type,
  poster,
  className,
  playLabel,
  playButtonClassName,
  iconOnly = false,
}: AutoplayVideoProps) {
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

    const unregisterIntentRetry = registerIntentRetry(requestPlayback);

    return () => {
      observer.disconnect();
      unregisterIntentRetry();
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
        onError={() => setShowPlayButton(true)}
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
          className={cn(
            "absolute z-10 inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-background/60 text-xs font-semibold tracking-[0.08em] text-text uppercase shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md transition-[border-color,background-color,transform] duration-200 hover:border-primary hover:bg-background/80 active:scale-[0.98]",
            iconOnly ? "h-9 w-9" : "h-11 px-4",
            playButtonClassName ??
              "top-[calc(var(--header-height)+1rem)] right-5 sm:right-8",
          )}
          aria-label={iconOnly ? playLabel : undefined}
        >
          <Play className="h-4 w-4 fill-current text-primary" aria-hidden />
          {iconOnly ? null : playLabel}
        </button>
      ) : null}
    </>
  );
}

export const HeroVideo = AutoplayVideo;
