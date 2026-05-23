import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  FileText,
  FolderGit2,
  GraduationCap,
  Monitor,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import FeatureSidebar from "./_layout/FeatureSidebar";

const CARD_META = [
  { icon: Briefcase, grad: "from-violet-500/30 to-pink-500/20" },
  { icon: Monitor, grad: "from-indigo-500/30 to-violet-500/20" },
  { icon: GraduationCap, grad: "from-fuchsia-500/30 to-violet-500/20" },
] as const;

const STEP_ICONS = [FileText, FolderGit2, Users, Sparkles] as const;

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.05 + i * 0.05,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function RightPanel() {
  const { t } = useT();

  return (
    <aside className="hidden xl:flex w-[300px] flex-none flex-col gap-6 border-l border-white/[0.06] bg-black/30 px-5 py-7">
      {/* Top insights */}
      <section>
        <h3 className="px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/45">
          {t.pathpalAgent.topInsights}
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {t.pathpalAgent.cards.map((c, i) => {
            const { icon: Icon, grad } = CARD_META[i];
            return (
              <li key={c.title}>
                <button
                  type="button"
                  className="group flex w-full items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition-all duration-200 hover:border-white/15 hover:bg-white/[0.045]"
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gradient-to-br ${grad} ring-1 ring-white/10`}
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.9} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[12px] font-medium text-white">
                      {c.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-[1.55] text-white/50">
                      {c.desc}
                    </span>
                  </span>
                  <ChevronRight className="mt-1 h-3.5 w-3.5 flex-none text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Suggested next steps */}
      <section>
        <h3 className="px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/45">
          {t.pathpalAgent.suggestedSteps}
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {t.pathpalAgent.steps.map((s, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={s.title}>
                <button
                  type="button"
                  className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition-all duration-200 hover:border-white/15 hover:bg-white/[0.045]"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/10">
                    <Icon
                      className="h-4 w-4 text-violet-200"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[12px] font-medium text-white">
                      {s.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-white/50">
                      {s.desc}
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 flex-none text-white/40 transition-all duration-200 group-hover:text-white/80" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </aside>
  );
}

export default function PathpalAgentPage() {
  const { t } = useT();

  return (
    <div className="relative flex min-h-screen w-full bg-ink-950 text-white">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(45% 35% at 50% 12%, rgba(124,58,237,0.18), transparent 70%), radial-gradient(40% 35% at 80% 80%, rgba(236,72,153,0.10), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full">
        <FeatureSidebar />

        {/* Center main */}
        <main className="relative flex flex-1 flex-col items-center px-6 pb-32 pt-12 sm:px-10 sm:pt-14">
          {/* Big P logo with glow */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={0}
            className="relative mb-8"
          >
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(236,72,153,0.45), rgba(124,58,237,0.30) 60%, transparent 80%)",
              }}
            />
            <img
              src="/Logo.png"
              alt="Pathpal AI"
              className="h-[72px] w-[72px] rounded-[16px] object-contain"
              draggable={false}
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fade}
            custom={1}
            className="max-w-[640px] text-center text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[42px]"
          >
            {t.pathpalAgent.titleBefore}
            <span className="text-brand-gradient">
              {t.pathpalAgent.titleAccent}
            </span>
            {t.pathpalAgent.titleAfter}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={fade}
            custom={2}
            className="mt-4 max-w-[620px] text-balance text-center text-[12.5px] leading-[1.7] text-white/55"
          >
            {t.pathpalAgent.subtitle}
          </motion.p>

          {/* Three insight cards */}
          <div className="mt-10 grid w-full max-w-[820px] grid-cols-1 gap-3 sm:grid-cols-3">
            {t.pathpalAgent.cards.map((c, i) => {
              const { icon: Icon, grad } = CARD_META[i];
              return (
                <motion.button
                  type="button"
                  key={c.title}
                  initial="hidden"
                  animate="show"
                  variants={fade}
                  custom={3 + i}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.045]"
                >
                  <span
                    className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${grad} ring-1 ring-white/15`}
                  >
                    <Icon className="h-4 w-4 text-white" strokeWidth={1.9} />
                  </span>
                  <h3 className="text-[12.5px] font-semibold tracking-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-[1.55] text-white/50">
                    {c.desc}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* Suggested question chips */}
          <div className="mt-10 flex w-full max-w-[820px] flex-wrap justify-center gap-2">
            {t.pathpalAgent.questions.map((q, i) => (
              <motion.button
                type="button"
                key={q}
                initial="hidden"
                animate="show"
                variants={fade}
                custom={6 + i}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11.5px] text-white/70 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
              >
                {q}
              </motion.button>
            ))}
          </div>

          {/* Chat input */}
          <motion.form
            initial="hidden"
            animate="show"
            variants={fade}
            custom={10}
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 w-full max-w-[820px]"
          >
            <div className="relative">
              <input
                type="text"
                placeholder={t.pathpalAgent.inputPlaceholder}
                className="h-12 w-full rounded-full border border-white/10 bg-white/[0.04] pl-5 pr-14 text-[13px] text-white placeholder:text-white/40 outline-none transition-colors duration-200 focus:border-violet-400/40 focus:bg-white/[0.06]"
              />
              <button
                type="submit"
                aria-label="Send"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-[0_4px_18px_rgba(168,85,247,0.45)] transition-transform duration-200 hover:scale-105"
              >
                <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
            </div>
          </motion.form>
        </main>

        <RightPanel />
      </div>
    </div>
  );
}
