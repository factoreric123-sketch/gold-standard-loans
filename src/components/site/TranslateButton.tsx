import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const STORAGE_KEY = "site-lang";

/**
 * Simple whole-site language switch (English / Spanish).
 * Sets the Google Translate cookie and reloads — the widget then renders the
 * page in the chosen language on every route, with no toggling back.
 */
function setTransCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  const host = window.location.hostname;
  for (const c of [
    `googtrans=${value};path=/`,
    `googtrans=${value};path=/;domain=${host}`,
    `googtrans=${value};path=/;domain=.${host}`,
  ]) {
    try {
      document.cookie = c;
    } catch {
      /* cookies may be blocked in embedded previews */
    }
  }
}

function currentLang() {
  if (typeof window === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  if (m && m[1] && m[1] !== "en") return m[1];
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "es" ? "es" : "en";
  } catch {
    return "en";
  }
}

/** Load the Google translator once; it reads the googtrans cookie itself. */
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

  useEffect(() => {
    setLang(currentLang());
    loadWidget();
  }, []);

  const choose = (next: string) => {
    if (next === currentLang()) return;
    setTransCookie(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    window.location.reload();
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
