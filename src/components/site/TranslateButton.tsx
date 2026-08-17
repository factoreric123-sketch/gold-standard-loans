import { useCallback, useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

const STORAGE_KEY = "site-lang";

/**
 * Whole-site translation control (English / Spanish).
 * Loads the Google Website Translator once and drives its hidden language
 * select. Only the most recent selection is ever applied — older retry loops
 * are cancelled so the page can't flip back to the previous language.
 */
function setTransCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  const host = window.location.hostname;
  try {
    document.cookie = `googtrans=${value};path=/`;
    document.cookie = `googtrans=${value};path=/;domain=${host}`;
    document.cookie = `googtrans=${value};path=/;domain=.${host}`;
  } catch {
    /* cookies may be blocked in embedded previews */
  }
}

function storedLang() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") return saved;
  } catch {
    /* ignore */
  }
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return m && m[1] !== "en" ? m[1] : "en";
}

function loadWidget() {
  if (!document.getElementById("google_translate_element")) {
    const div = document.createElement("div");
    div.id = "google_translate_element";
    div.style.display = "none";
    document.body.appendChild(div);
  }
  if (document.getElementById("google-translate-script")) return;
  (window as unknown as Record<string, unknown>).googleTranslateInit = () => {
    const g = (window as any).google;
    if (g?.translate?.TranslateElement) {
      new g.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,es", autoDisplay: false },
        "google_translate_element",
      );
    }
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
  document.body.appendChild(s);
}

export function TranslateButton({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState("en");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Token identifying the latest selection; stale loops bail out.
  const runId = useRef(0);
  const timer = useRef<number | null>(null);

  const apply = useCallback((target: string) => {
    const id = ++runId.current;
    if (timer.current) window.clearTimeout(timer.current);

    const want = target === "en" ? "" : target;

    const tick = (attempt: number) => {
      if (id !== runId.current) return; // a newer click took over
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo && [...combo.options].some((o) => o.value === want)) {
        if (combo.value !== want || attempt < 4) {
          combo.value = want;
          combo.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
      if (attempt < 20) {
        timer.current = window.setTimeout(() => tick(attempt + 1), 400);
      }
    };

    tick(0);
  }, []);

  useEffect(() => {
    const initial = storedLang();
    setLang(initial);
    loadWidget();
    apply(initial);
    return () => {
      runId.current++;
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [apply]);

  // Re-assert the chosen language after navigating to another page.
  useEffect(() => {
    apply(lang);
  }, [pathname, lang, apply]);

  const choose = (next: string) => {
    if (next === lang) return;
    setTransCookie(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setLang(next);
    loadWidget();
    apply(next);
  };

  const baseBtn =
    "notranslate inline-flex items-center justify-center gap-1.5 border px-3.5 py-2 text-[11px] uppercase tracking-[0.15em] transition-colors";
  const activeBtn = "border-gold text-gold bg-gold/10";
  const idleBtn =
    "border-foreground/20 text-foreground/75 hover:border-gold hover:text-gold";

  return (
    <div className={`inline-flex flex-col items-stretch gap-1 ${className}`}>
      <button
        type="button"
        onClick={() => choose("en")}
        aria-pressed={lang === "en"}
        aria-label="View site in English"
        className={`${baseBtn} ${lang === "en" ? activeBtn : idleBtn}`}
      >
        <Languages className="h-3.5 w-3.5" />
        English
      </button>
      <button
        type="button"
        onClick={() => choose("es")}
        aria-pressed={lang === "es"}
        aria-label="Ver el sitio en español"
        className={`${baseBtn} ${lang === "es" ? activeBtn : idleBtn}`}
      >
        <Languages className="h-3.5 w-3.5" />
        Español
      </button>
    </div>
  );
}
