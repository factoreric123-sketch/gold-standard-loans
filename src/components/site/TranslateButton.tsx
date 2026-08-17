import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

/**
 * Whole-site translation toggle (English <-> Spanish).
 * Loads the Google Website Translator on demand and switches language by
 * setting the `googtrans` cookie, which Google's widget reads on load.
 */
function setTransCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  const host = window.location.hostname;
  document.cookie = `googtrans=${value};path=/`;
  document.cookie = `googtrans=${value};path=/;domain=${host}`;
  document.cookie = `googtrans=${value};path=/;domain=.${host}`;
}

function currentLang() {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return m ? m[1] : "en";
}

export function TranslateButton({ className = "" }: { className?: string }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(currentLang());
    loadWidget();
  }, []);

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
  function applyViaCombo(target: string, attempt = 0) {
    const want = target === "en" ? "" : target;
    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (combo && combo.value !== want) {
      combo.value = want;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }
    // Keep re-asserting for a few seconds: the widget can re-initialise and
    // reset the select right after it is first inserted.
    if (attempt < 25) {
      window.setTimeout(() => applyViaCombo(target, attempt + 1), 400);
    }
  }


  const toggle = () => {
    const next = lang === "es" ? "en" : "es";
    setTransCookie(next);
    setLang(next);
    loadWidget();
    applyViaCombo(next);
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
