import { motion } from "framer-motion";
import { MessageSquareText, Bot, Sparkles } from "lucide-react";
import { useT } from "../i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.05 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const CARD_ICONS = [MessageSquareText, Sparkles, Bot] as const;

export default function Features() {
  const { t } = useT();

  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-ink-950 px-6 pb-16 pt-8 sm:pb-20 sm:pt-10"
    >
      {/* Full-bleed landscape underlay video — spans the whole section, fades only top/bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-[640px] -translate-y-1/2 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      >
        <video
          src="/phone-underlay.mp4"
          className="h-full w-full object-cover"
          style={{ filter: "saturate(1.15)" }}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
      </div>

      {/* Ambient background glow — top only, so the bottom blends seamlessly into the Footer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 0%, rgba(60,20,110,0.22), transparent 70%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center text-center">
        {/* Headline (matches Hero scale and tracking) */}
        <motion.h2
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
          className="mx-auto max-w-[800px] text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-white
                     sm:text-[36px] md:text-[42px] lg:text-[46px]"
        >
          {t.features.titleBefore}
          <span className="text-brand-gradient">{t.features.titleAccent}</span>
          {t.features.titleAfter}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
          className="mt-5 max-w-[540px] text-balance text-[12px] leading-[1.65] text-white/55 sm:text-[12.5px]"
        >
          {t.features.subtitle}
        </motion.p>

        {/* Phone showcase */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
          className="relative mt-8 w-full"
        >
          {/* Glow behind phone — darker / more contained */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[440px] w-[760px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow"
            style={{
              background:
                "radial-gradient(closest-side, rgba(236,72,153,0.28), transparent 75%), radial-gradient(closest-side at 35% 60%, rgba(168,85,247,0.30), transparent 70%), radial-gradient(closest-side at 70% 40%, rgba(99,102,241,0.28), transparent 70%)",
              filter: "blur(46px)",
            }}
          />

          {/* Cutout phone — transparent PNG, sits in the middle of the underlay video */}
          <img
            src="/product-phone-cutout.png"
            alt="Pathpal AI product preview on mobile"
            className="relative z-10 mx-auto block w-full max-w-[680px] select-none animate-float-slow"
            draggable={false}
          />
        </motion.div>

        {/* Feature cards */}
        <div className="mt-8 grid w-full max-w-[1040px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {t.features.cards.map((f, i) => {
            const Icon = CARD_ICONS[i];
            return (
              <motion.div
                key={f.title}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={4 + i}
                className="glass group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                {/* Card hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 0% 0%, rgba(168,85,247,0.18), transparent 60%)",
                  }}
                />

                <div className="relative z-10">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-pink-500/30 ring-1 ring-white/15">
                    <Icon className="h-4 w-4 text-white" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-[1.65] text-white/55">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
