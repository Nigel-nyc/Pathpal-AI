import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Seamless looping video background.
 *
 * Strategy: two stacked <video> elements playing the same source, offset by
 * half the duration. When one is near its end, the other has already been
 * running for a while; we cross-fade their opacity so the wrap-around moment
 * is never visible. Combined with `loop`, this hides any seam the encoded
 * loop point may have.
 *
 * Also:
 *  - autoplay + muted + playsInline + preload=auto for reliable autoplay
 *  - poster image avoids a black flash on first paint
 *  - subtle dark overlay + readability vignette keep hero text legible
 */
export default function VideoBackground({
  src = "/hero-bg-v2.mp4",
  poster = "/hero-bg-poster.jpg",
  /** Crossfade duration (ms) — also the half-window before swap. */
  fade = 900,
}: {
  src?: string;
  poster?: string;
  fade?: number;
}) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const [showA, setShowA] = useState(true);
  const showARef = useRef(true);
  const swapAtRef = useRef(0);

  // keep ref in sync with state
  useLayoutEffect(() => {
    showARef.current = showA;
  }, [showA]);

  useEffect(() => {
    const va = a.current;
    const vb = b.current;
    if (!va || !vb) return;

    let cancelled = false;
    let raf = 0;

    const safePlay = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const onMetadata = () => {
      if (cancelled) return;
      const dur = va.duration || vb.duration || 5;
      // Swap slightly before the loop wrap so the crossfade hides it.
      swapAtRef.current = Math.max(0.2, dur - fade / 1000 - 0.05);
      // Offset B by half duration so the two videos are out of phase.
      try {
        vb.currentTime = dur / 2;
      } catch {
        /* ignore */
      }
      safePlay(va);
      safePlay(vb);
    };

    const tick = () => {
      if (cancelled) return;
      const active = showARef.current ? va : vb;
      if (active.duration && active.currentTime >= swapAtRef.current) {
        setShowA((prev) => !prev);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    if (va.readyState >= 1) onMetadata();
    else va.addEventListener("loadedmetadata", onMetadata, { once: true });

    // Some browsers pause videos when the tab is hidden; resume on visibility
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        safePlay(va);
        safePlay(vb);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      va.removeEventListener("loadedmetadata", onMetadata);
    };
  }, [fade]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-ink-950"
    >
      {/* Video layer A */}
      <video
        ref={a}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{
          opacity: showA ? 1 : 0,
          transitionDuration: `${fade}ms`,
          filter: "brightness(1.35) saturate(1.15) contrast(1.05)",
        }}
        src={src}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      />
      {/* Video layer B (offset by half duration) */}
      <video
        ref={b}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{
          opacity: showA ? 0 : 1,
          transitionDuration: `${fade}ms`,
          filter: "brightness(1.35) saturate(1.15) contrast(1.05)",
        }}
        src={src}
        poster={poster}
        muted
        loop
        autoPlay
        playsInline
        preload="auto"
      />

      {/* Light edge wash — only the top/bottom corners, leaves middle bright */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,3,10,0.35) 0%, rgba(2,3,10,0) 18%, rgba(2,3,10,0) 82%, rgba(2,3,10,0.35) 100%)",
        }}
      />

      {/* Center readability vignette behind the title/subtitle — softer + smaller, positioned higher */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 20% 22% at 50% 34%, rgba(2,3,10,0.6), rgba(2,3,10,0.25) 60%, transparent 92%)",
        }}
      />
    </div>
  );
}
