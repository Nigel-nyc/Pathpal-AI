import { motion } from "framer-motion";
import { LanguageToggle, useT } from "../i18n/LanguageContext";
import Logo from "./Logo";

const NAV_LINKS: { key: keyof ReturnType<typeof useT>["t"]["nav"]; href: string }[] = [
  { key: "whatWeOffer", href: "#how-it-works" },
  { key: "whosItFor", href: "#" },
  { key: "pricing", href: "#" },
  { key: "community", href: "#" },
  { key: "aboutUs", href: "#" },
];

export default function Navbar() {
  const { t } = useT();

  return (
    // Outer fixed container handles horizontal centering via flex,
    // so framer-motion's transform can't break it.
    <div className="pointer-events-none fixed inset-x-0 top-7 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong pointer-events-auto flex h-[56px] w-[min(92vw,880px)] items-center gap-1 rounded-full pl-4 pr-1.5 shadow-navbar"
      >
        <a href="#" className="mr-2 flex shrink-0 items-center">
          <Logo />
        </a>

        <ul className="ml-1 hidden flex-1 items-center justify-center gap-6 md:flex">
          {NAV_LINKS.map(({ key, href }) => (
            <li key={key}>
              <a
                href={href}
                className="text-[13px] font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex-1 md:hidden" />

        <LanguageToggle />

        <a
          href="#"
          className="group relative ml-auto inline-flex h-[42px] items-center justify-center rounded-full
                     border border-white/15 bg-white/[0.04] px-4 text-[13px] font-medium text-white
                     transition-all duration-200
                     hover:border-white/40 hover:bg-white/[0.08]
                     hover:shadow-[0_0_22px_rgba(168,85,247,0.35)]"
        >
          <span className="relative z-10">{t.nav.getStarted}</span>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 50%, rgba(236,72,153,0.18), transparent 60%)",
            }}
          />
        </a>
      </motion.nav>
    </div>
  );
}
