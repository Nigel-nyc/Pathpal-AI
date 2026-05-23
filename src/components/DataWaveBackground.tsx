import { useMemo } from "react";

/**
 * Glowing neural-mesh / blockchain-wave background.
 * Layered: glow blobs, dense SVG mesh curves, dot particles, vignettes.
 * Waves span the bottom ~70% of the viewport on both sides,
 * rising up almost behind the headline to match the reference.
 */
export default function DataWaveBackground() {
  const leftParticles = useMemo(() => buildParticles("left"), []);
  const rightParticles = useMemo(() => buildParticles("right"), []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Top center vignette */}
      <div
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(40,18,80,0.35), transparent 70%)",
        }}
      />

      {/* LEFT wave cluster — taller, denser, brighter, hugs the left edge */}
      <div
        className="absolute -left-[6%] -bottom-[8%] h-[115%] w-[62%] animate-float-slow"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black 75%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(40% 45% at 25% 60%, rgba(168,85,247,0.85), transparent 65%), radial-gradient(38% 35% at 50% 80%, rgba(236,72,153,0.7), transparent 70%), radial-gradient(35% 30% at 10% 75%, rgba(99,102,241,0.7), transparent 70%), radial-gradient(28% 25% at 55% 92%, rgba(245,158,11,0.55), transparent 70%)",
            filter: "blur(45px)",
          }}
        />
        <WaveSvg side="left" />
        <div className="absolute inset-0">{leftParticles}</div>
      </div>

      {/* RIGHT wave cluster */}
      <div
        className="absolute -right-[6%] -bottom-[8%] h-[115%] w-[62%] animate-float"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 75%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 0%, black 75%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(40% 45% at 75% 60%, rgba(59,130,246,0.85), transparent 65%), radial-gradient(38% 35% at 50% 80%, rgba(168,85,247,0.6), transparent 70%), radial-gradient(35% 30% at 90% 75%, rgba(245,158,11,0.65), transparent 70%), radial-gradient(28% 25% at 45% 92%, rgba(236,72,153,0.55), transparent 70%)",
            filter: "blur(45px)",
          }}
        />
        <WaveSvg side="right" />
        <div className="absolute inset-0">{rightParticles}</div>
      </div>

      {/* Narrow elliptical vignette behind the title/subtitle column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 26% 32% at 50% 40%, rgba(2,3,10,0.88), rgba(2,3,10,0.5) 60%, transparent 90%)",
        }}
      />

      {/* Bottom darkening for footer-area weight */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(2,3,10,0.6) 100%)",
        }}
      />
    </div>
  );
}

/* ---------- helpers ---------- */

function WaveSvg({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  return (
    <svg
      viewBox="0 0 800 700"
      className="absolute inset-0 h-full w-full animate-wave-drift"
      preserveAspectRatio="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <defs>
        <linearGradient id={`wave-${side}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.0" />
          <stop offset="30%" stopColor="#6366f1" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#a855f7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`wave-${side}-b`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#ec4899" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id={`wave-${side}-c`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
        </linearGradient>
        <filter id={`glow-${side}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Primary dense mesh — many curves stacked to mimic a 3D wave surface */}
      <g
        filter={`url(#glow-${side})`}
        stroke={`url(#wave-${side}-a)`}
        fill="none"
      >
        {Array.from({ length: 38 }).map((_, i) => {
          const offset = i * 13;
          const opacity = 0.18 + (i / 38) * 0.65;
          const strokeWidth = 0.55 + (i % 5) * 0.18;
          return (
            <path
              key={i}
              d={`M -80 ${640 - offset}
                  C 120 ${500 - offset * 0.55}, 300 ${320 + offset * 0.18}, 500 ${360 - offset * 0.4}
                  S 760 ${220 - offset * 0.5}, 920 ${300 - offset * 0.7}`}
              strokeWidth={strokeWidth}
              opacity={opacity}
            />
          );
        })}
      </g>

      {/* Secondary lower fan — broader bottom coverage */}
      <g
        filter={`url(#glow-${side})`}
        stroke={`url(#wave-${side}-a)`}
        fill="none"
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const offset = i * 10;
          const opacity = 0.12 + (i / 24) * 0.45;
          return (
            <path
              key={i}
              d={`M -60 ${720 - offset}
                  C 200 ${620 - offset * 0.5}, 420 ${540 - offset * 0.3}, 700 ${480 - offset * 0.4}`}
              strokeWidth={0.5 + (i % 4) * 0.15}
              opacity={opacity}
            />
          );
        })}
      </g>

      {/* Orange/pink ribbon highlight */}
      <g
        filter={`url(#glow-${side})`}
        stroke={`url(#wave-${side}-b)`}
        fill="none"
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const yo = i * 12;
          return (
            <path
              key={i}
              d={`M -20 ${560 - yo}
                  C 200 ${440 - yo * 0.5}, 420 ${420 - yo * 0.4}, 700 ${340 - yo * 0.3}`}
              strokeWidth={0.7}
              opacity={0.4 + i * 0.04}
            />
          );
        })}
      </g>

      {/* Bottom orange shimmer */}
      <g
        filter={`url(#glow-${side})`}
        stroke={`url(#wave-${side}-c)`}
        fill="none"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const yo = i * 8;
          return (
            <path
              key={i}
              d={`M -40 ${680 - yo}
                  C 220 ${600 - yo * 0.4}, 460 ${560 - yo * 0.3}, 760 ${500 - yo * 0.2}`}
              strokeWidth={0.6}
              opacity={0.35 + i * 0.04}
            />
          );
        })}
      </g>
    </svg>
  );
}

function buildParticles(side: "left" | "right") {
  const count = 220;
  const nodes: JSX.Element[] = [];
  for (let i = 0; i < count; i++) {
    const r1 = (Math.sin(i * 12.9898 + (side === "left" ? 0 : 7)) * 43758.5453) % 1;
    const r2 = (Math.sin(i * 78.233 + (side === "left" ? 3 : 11)) * 43758.5453) % 1;
    const r3 = (Math.sin(i * 39.346 + (side === "left" ? 5 : 13)) * 43758.5453) % 1;
    const x = Math.abs(r1) * 100;
    // bias particles toward the wave area (middle to bottom)
    const y = 25 + Math.abs(r2) * 75;
    const size = 1 + Math.abs(r3) * 3.2;
    const hueRoll = Math.abs(r3);
    // Per-side color biases: left favors pink/magenta, right favors blue/orange
    let color: string;
    if (side === "left") {
      color =
        hueRoll > 0.75
          ? "rgba(255,160,80,1)" // bright orange
          : hueRoll > 0.45
          ? "rgba(244,114,182,1)" // pink
          : hueRoll > 0.2
          ? "rgba(168,85,247,1)" // violet
          : "rgba(99,102,241,1)"; // indigo
    } else {
      color =
        hueRoll > 0.75
          ? "rgba(255,160,80,1)"
          : hueRoll > 0.45
          ? "rgba(96,165,250,1)" // sky blue
          : hueRoll > 0.2
          ? "rgba(129,140,248,1)" // indigo light
          : "rgba(244,114,182,1)";
    }
    const delay = (Math.abs(r1) * 6).toFixed(2);
    nodes.push(
      <span
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          boxShadow: `0 0 ${size * 6}px ${color}`,
          opacity: 0.55 + Math.abs(r2) * 0.45,
          animation: `float ${6 + Math.abs(r2) * 6}s ease-in-out ${delay}s infinite`,
        }}
      />
    );
  }
  return nodes;
}
