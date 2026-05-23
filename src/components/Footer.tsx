import { motion } from "framer-motion";
import { Globe, ShieldCheck } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import Logo from "./Logo";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.05 + i * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const BADGE_ICONS = [Globe, ShieldCheck] as const;

export default function Footer() {
  const { t } = useT();

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-ink-950 px-6 pb-10 pt-16 sm:pb-12 sm:pt-20"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
        {/* Brand column */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="flex flex-col"
        >
          <Logo size={32} />
          <p className="mt-5 max-w-[320px] text-[13px] leading-[1.7] text-white/55">
            {t.footer.tagline}
          </p>

          <div className="mt-7 flex items-center gap-4">
            {t.footer.badges.map((label, i) => {
              const Icon = BADGE_ICONS[i];
              return (
                <div key={label} className="flex flex-col items-center gap-2">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-white/10"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 30% 20%, rgba(60,30,110,0.55), rgba(15,15,28,0.95))",
                    }}
                  >
                    <Icon
                      className="h-5 w-5 text-violet-300"
                      strokeWidth={1.8}
                    />
                  </span>
                  <span className="text-[10.5px] font-medium text-white/65">
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Link columns */}
        {t.footer.columns.map((col, i) => (
          <motion.div
            key={col.heading}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={i + 1}
          >
            <h4 className="text-[13px] font-semibold tracking-tight text-white">
              {col.heading}
            </h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((label) => (
                <li key={label}>
                  <a
                    href="#"
                    className="text-[13px] text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Bottom rule + copyright */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-[1200px] border-t border-white/[0.06] pt-6">
        <p className="text-[12px] text-white/40">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
