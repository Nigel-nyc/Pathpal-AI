import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Flame,
  MessageSquareText,
  Sparkles,
  Star,
} from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import FeatureSidebar from "./_layout/FeatureSidebar";

const MENTOR_META = [
  { initials: "SC", grad: "from-violet-500 to-fuchsia-500" },
  { initials: "ME", grad: "from-indigo-500 to-violet-500" },
  { initials: "ER", grad: "from-pink-500 to-violet-500" },
  { initials: "AM", grad: "from-sky-500 to-indigo-500" },
] as const;

const STAT_VALUES = [12, 4, 6, 9] as const;

const STREAK_POINTS = [4, 9, 6, 12, 10, 16, 14, 20, 18, 24, 22, 28];

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.04 + i * 0.04,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function Sparkline({ points }: { points: number[] }) {
  const w = 180;
  const h = 56;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points
    .map((p, i) => `${i * step},${h - ((p - min) / range) * (h - 6) - 3}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-14 w-full">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(168,85,247,0.45)" />
          <stop offset="100%" stopColor="rgba(168,85,247,0)" />
        </linearGradient>
        <linearGradient id="sparkLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${coords} ${w},${h}`} fill="url(#sparkFill)" />
      <polyline
        points={coords}
        fill="none"
        stroke="url(#sparkLine)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OverviewPage() {
  const { t } = useT();

  return (
    <div className="relative flex min-h-screen w-full bg-ink-950 text-white">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 30% at 12% 8%, rgba(124,58,237,0.18), transparent 70%), radial-gradient(40% 35% at 92% 92%, rgba(236,72,153,0.14), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full">
        <FeatureSidebar />

        <main className="relative flex flex-1 flex-col px-6 pb-32 pt-10 sm:px-10 sm:pt-12">
          {/* Welcome row */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={0}
            className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center"
          >
            <h1 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[30px]">
              {t.overview.welcome}{" "}
              <span className="inline-block translate-y-[-2px]">✨</span>
            </h1>

            {/* Weekly check-in card */}
            <button
              type="button"
              className="group relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 p-4 text-left transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.35) 0%, rgba(236,72,153,0.25) 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <Star className="h-3.5 w-3.5 text-white/85" strokeWidth={2} />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-white/85">
                  {t.overview.weeklyCheckIn}
                </span>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-medium text-white ring-1 ring-white/20 transition-all duration-200 group-hover:bg-white/25">
                {t.overview.startCheckIn}
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} />
              </span>
            </button>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={fade}
            custom={1}
            className="mt-1 text-[13px] text-white/55"
          >
            {t.overview.subtitle}
          </motion.p>

          {/* AI Mentor Agents */}
          <motion.h2
            initial="hidden"
            animate="show"
            variants={fade}
            custom={2}
            className="mt-10 text-[14px] font-semibold tracking-tight text-white"
          >
            {t.overview.aiMentorAgents}
          </motion.h2>

          <div className="mt-4 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.overview.mentors.map((m, i) => {
              const { initials, grad } = MENTOR_META[i];
              return (
                <motion.button
                  type="button"
                  key={m.name}
                  initial="hidden"
                  animate="show"
                  variants={fade}
                  custom={3 + i}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
                >
                  {/* Avatar */}
                  <div className="relative mb-3 h-[112px] w-full overflow-hidden rounded-xl">
                    <div
                      aria-hidden
                      className={`absolute inset-0 bg-gradient-to-br ${grad} opacity-90`}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(120% 70% at 50% 20%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(80% 60% at 50% 100%, rgba(0,0,0,0.35), transparent 65%)",
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[36px] font-semibold tracking-tight text-white/95">
                      {initials}
                    </span>
                  </div>

                  <h3 className="text-[13px] font-semibold text-white">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-[11px] text-white/50">{m.school}</p>
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/[0.05] px-2.5 py-1 text-[10.5px] font-medium text-white/75 ring-1 ring-white/10">
                    <Sparkles className="h-2.5 w-2.5" strokeWidth={2.2} />
                    {m.topic}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Three stat tiles */}
          <div className="mt-8 grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
            {/* Streak */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={7}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
            >
              <div className="flex items-center gap-2 text-white/60">
                <Flame className="h-3.5 w-3.5 text-orange-300" strokeWidth={2} />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em]">
                  {t.overview.growthStreak}
                </span>
              </div>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-[36px] font-bold leading-none tracking-tight text-white">
                  23
                </span>
                <span className="pb-1 text-[12px] text-white/55">
                  {t.overview.daysSuffix}
                </span>
              </div>
              <div className="mt-3">
                <Sparkline points={STREAK_POINTS} />
              </div>
              <p className="mt-1 text-[11px] text-white/45">
                {t.overview.streakHelp}
              </p>
            </motion.div>

            {/* Mentor conversation */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={8}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
            >
              <div className="flex items-center gap-2 text-white/60">
                <MessageSquareText
                  className="h-3.5 w-3.5 text-violet-300"
                  strokeWidth={2}
                />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em]">
                  {t.overview.mentorConversation}
                </span>
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-semibold text-white">
                    SC
                  </span>
                  <div className="rounded-2xl rounded-tl-md bg-white/[0.05] px-3 py-2 text-[11.5px] leading-[1.55] text-white/80">
                    <span className="block text-[10px] font-semibold text-violet-200">
                      {t.overview.chat1Author}
                    </span>
                    {t.overview.chat1Body}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-[10px] font-semibold text-white">
                    SS
                  </span>
                  <div className="rounded-2xl rounded-tl-md bg-white/[0.05] px-3 py-2 text-[11.5px] leading-[1.55] text-white/80">
                    <span className="block text-[10px] font-semibold text-violet-200">
                      {t.overview.chat2Author}
                    </span>
                    {t.overview.chat2Body}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Growth record */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={fade}
              custom={9}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5"
            >
              <div className="flex items-center gap-2 text-white/60">
                <Briefcase
                  className="h-3.5 w-3.5 text-pink-300"
                  strokeWidth={2}
                />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em]">
                  {t.overview.growthRecord}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {t.overview.stats.map((s, i) => (
                  <div
                    key={s.label}
                    className="rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/[0.05]"
                  >
                    <div className="text-[22px] font-bold leading-none tracking-tight text-white">
                      {STAT_VALUES[i]}
                    </div>
                    <div className="mt-1 text-[10.5px] text-white/55">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA banner */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={10}
            className="relative mt-8 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 px-5 py-5 sm:flex-row sm:items-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,15,40,0.85), rgba(60,20,90,0.55))",
            }}
          >
            {/* Decorative wave */}
            <svg
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-40"
              viewBox="0 0 400 120"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="ctaWave" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="rgba(236,72,153,0)" />
                  <stop offset="60%" stopColor="rgba(236,72,153,0.6)" />
                  <stop offset="100%" stopColor="rgba(168,85,247,0.6)" />
                </linearGradient>
              </defs>
              <path
                d="M0 80 Q 80 30 160 70 T 320 60 T 480 80"
                stroke="url(#ctaWave)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M0 90 Q 80 50 160 85 T 320 75 T 480 95"
                stroke="url(#ctaWave)"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </svg>

            <div className="relative z-10">
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                {t.overview.ctaTitle}
              </h3>
              <p className="mt-1 text-[12px] text-white/55">
                {t.overview.ctaSubtitle}
              </p>
            </div>
            <button
              type="button"
              className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 px-4 py-2 text-[12.5px] font-semibold text-white shadow-[0_8px_24px_rgba(168,85,247,0.45)] transition-transform duration-200 hover:scale-[1.02]"
            >
              {t.overview.ctaButton}
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </button>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
