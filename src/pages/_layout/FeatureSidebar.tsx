import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bot,
  Compass,
  Lightbulb,
  Settings as SettingsIcon,
  Sparkles,
  Telescope,
  Users,
} from "lucide-react";
import { LanguageToggle, useT } from "../../i18n/LanguageContext";

type NavKey =
  | "overview"
  | "growthRecords"
  | "aiMentors"
  | "pathpalAgent"
  | "opportunities"
  | "reflections"
  | "pathpalCommunity";

type NavItem = {
  key: NavKey;
  icon: typeof Bot;
  href: string;
  /** When true, item is a placeholder (no real page) and renders as button. */
  placeholder?: boolean;
};

const NAV: NavItem[] = [
  { key: "overview", icon: Compass, href: "/features/overview" },
  { key: "growthRecords", icon: BarChart3, href: "#", placeholder: true },
  { key: "aiMentors", icon: Sparkles, href: "#", placeholder: true },
  { key: "pathpalAgent", icon: Bot, href: "/features/pathpal-agent" },
  { key: "opportunities", icon: Telescope, href: "#", placeholder: true },
  { key: "reflections", icon: Lightbulb, href: "#", placeholder: true },
  { key: "pathpalCommunity", icon: Users, href: "/features/community" },
];

export default function FeatureSidebar() {
  const { pathname } = useLocation();
  const { t } = useT();

  return (
    <aside className="hidden lg:flex w-[220px] flex-none flex-col border-r border-white/[0.06] bg-black/40 px-3 py-5">
      {/* Brand — click goes back to marketing landing */}
      <Link to="/" className="mb-7 flex items-center gap-2 px-2" aria-label="Back to home">
        <img
          src="/Logo.png"
          alt="Pathpal AI"
          className="h-7 w-7 rounded-[6px] object-contain"
          draggable={false}
        />
        <span className="text-[14px] font-semibold tracking-tight text-white">
          {t.sidebar.brand}
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV.map(({ key, icon: Icon, href, placeholder }) => {
          const active = !placeholder && pathname === href;
          const className = `group flex items-center gap-3 rounded-xl px-3 py-2 text-[12.5px] font-medium transition-colors duration-200 ${
            active
              ? "bg-gradient-to-r from-violet-600/35 to-pink-500/15 text-white ring-1 ring-white/10"
              : "text-white/55 hover:bg-white/[0.04] hover:text-white"
          }`;
          const content = (
            <>
              <Icon
                className={`h-4 w-4 ${active ? "text-violet-200" : "text-white/60 group-hover:text-white/80"}`}
                strokeWidth={1.8}
              />
              <span>{t.sidebar[key]}</span>
            </>
          );
          return placeholder ? (
            <button key={key} type="button" className={className}>
              {content}
            </button>
          ) : (
            <Link key={key} to={href} className={className}>
              {content}
            </Link>
          );
        })}
      </nav>

      {/* User chip + settings at bottom */}
      <div className="mt-2 flex flex-col gap-1">
        <LanguageToggle variant="sidebar" />
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-[12.5px] font-medium text-white/55 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
        >
          <SettingsIcon className="h-4 w-4" strokeWidth={1.8} />
          <span>{t.sidebar.settings}</span>
        </button>
        <button
          type="button"
          className="mt-1 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2 text-left transition-colors duration-200 hover:bg-white/[0.05]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-[11px] font-semibold text-white">
            N
          </span>
          <span className="text-[12.5px] font-medium text-white/85">
            {t.sidebar.userName}
          </span>
        </button>
      </div>
    </aside>
  );
}
