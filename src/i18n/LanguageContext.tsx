import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Dict, type Lang } from "./translations";

const STORAGE_KEY = "pathpal.lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

function readInitial(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "zh" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh" : "en";
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: translations[lang] as Dict }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT(): Ctx {
  return useContext(LanguageContext);
}

type ToggleProps = {
  /** Visual variant. "navbar" = inline within glass pill nav. "sidebar" = block row inside FeatureSidebar. */
  variant?: "navbar" | "sidebar";
};

export function LanguageToggle({ variant = "navbar" }: ToggleProps) {
  const { lang, setLang } = useT();

  if (variant === "sidebar") {
    return (
      <div className="mt-1 flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.025] p-1">
        {(["en", "zh"] as const).map((code) => {
          const active = lang === code;
          return (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`flex-1 rounded-lg px-2 py-1 text-[11.5px] font-medium transition-colors duration-150 ${
                active
                  ? "bg-white/[0.08] text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {code === "en" ? "EN" : "中文"}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="ml-1 mr-1 hidden items-center gap-1 text-[12px] font-medium md:flex">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`px-1 transition-colors duration-150 ${
          lang === "en" ? "text-white" : "text-white/45 hover:text-white/80"
        }`}
      >
        EN
      </button>
      <span className="text-white/25">/</span>
      <button
        type="button"
        onClick={() => setLang("zh")}
        className={`px-1 transition-colors duration-150 ${
          lang === "zh" ? "text-white" : "text-white/45 hover:text-white/80"
        }`}
      >
        中文
      </button>
    </div>
  );
}
