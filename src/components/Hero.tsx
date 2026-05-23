import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Plus, ArrowUpRight } from "lucide-react";
import { useT } from "../i18n/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.08,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const { t } = useT();

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col items-center px-6 pt-[130px] text-center sm:pt-[140px]">
      {/* Headline */}
      <motion.h1
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={0}
        className="mx-auto max-w-[800px] text-[28px] font-bold leading-[1.08] tracking-[-0.025em] text-white
                   sm:text-[36px] md:text-[42px] lg:text-[46px]"
      >
        {t.hero.titleLine1}
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>
        {t.hero.titleLine2}
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>
        {t.hero.titleLine3Prefix}
        <span className="text-brand-gradient italic-0 font-bold">
          {t.hero.titleAccent}
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={1}
        className="mt-5 max-w-[540px] text-balance text-[12px] leading-[1.65] text-white/55 sm:text-[12.5px]"
      >
        {t.hero.subtitleP1}
        <br className="hidden md:block" />
        {t.hero.subtitleP2}
        <br className="hidden md:block" />
        {t.hero.subtitleP3}
      </motion.p>

      {/* Pill button */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={2}
        className="mt-6"
      >
        <Link
          to="/features/pathpal-agent"
          className="glass group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11.5px] font-medium text-white/85 shadow-pill transition-all duration-200 hover:border-white/25 hover:text-white"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
            <Plus className="h-2.5 w-2.5 text-white/80" strokeWidth={2.5} />
          </span>
          <span>{t.hero.pillBadge}</span>
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white/95 transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2.5} />
          </span>
        </Link>
      </motion.div>

      {/* See how it works */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        custom={3}
        className="mt-3"
      >
        <a
          href="#how-it-works"
          className="glass-strong group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11.5px] font-medium text-white shadow-pill
                     transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30
                     hover:shadow-[0_8px_30px_rgba(168,85,247,0.25)]"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
            <Play className="h-2 w-2 fill-white text-white" />
          </span>
          {t.hero.seeHowItWorks}
        </a>
      </motion.div>
    </section>
  );
}
