import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";

const STORAGE_KEY = "site-lang";

/**
 * Whole-site translation toggle (English <-> Spanish).
 * Loads the Google Website Translator and drives its hidden language select,
 * re-applying the chosen language on every route change so all pages stay
 * translated once the user clicks "Español".
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
    if (saved) return saved;
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

/** Drive Google's hidden <select> so the page translates without a reload. */
function applyLang(target: string, attempt = 0) {
  const want = target === "en" ? "" : target;
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo) {
    const hasOption = [...combo.options].some((o) => o.value === want);
    // Re-dispatch for the first attempts as well: the widget can attach its
    // change listener after we first set the value.
    if (hasOption && (combo.value !== want || attempt < 8)) {
      combo.value = want;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  if (attempt < 30) {
    window.setTimeout(() => applyLang(target, attempt + 1), 400);
  }
}


export function TranslateButton({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState("en");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const initial = storedLang();
    setLang(initial);
    loadWidget();
    if (initial !== "en") applyLang(initial);
  }, []);

  // Re-apply the language whenever the user navigates to another page.
  useEffect(() => {
    if (lang !== "en") applyLang(lang);
  }, [pathname, lang]);

  const toggle = () => {
    const next = lang === "es" ? "en" : "es";
    setTransCookie(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setLang(next);
    loadWidget();
    applyLang(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "es" ? "Ver en inglés" : "Ver el sitio en español"}
      className={`notranslate inline-flex items-center gap-1.5 border border-foreground/20 px-3.5 py-2 text-[11px] uppercase tracking-[0.15em] text-foreground/75 transition-colors hover:border-gold hover:text-gold ${className}`}
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === "es" ? "English" : "Español"}
    </button>
  );
}
