import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Makes single-click hash navigation reliable, including cross-page links
 * like `/#programs` where the target section may not exist yet on first paint.
 */
export function HashScroll() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let frame = 0;
    let cancelled = false;

    const scrollToHash = (hash: string, smooth: boolean) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      if (!id) return false;
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      return true;
    };

    // Retry briefly while the page hydrates / sections mount.
    const start = Date.now();
    const tryScroll = () => {
      if (cancelled) return;
      if (!window.location.hash) return;
      if (scrollToHash(window.location.hash, false)) return;
      if (Date.now() - start < 2000) frame = requestAnimationFrame(tryScroll);
    };
    tryScroll();

    // Same-page anchor clicks: handle directly so one click always lands.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank") return;

      const [path, hash] = href.split("#");
      if (!hash) return;
      const samePage = path === "" || path === window.location.pathname || path === "/.";
      const targetsCurrent = samePage || path === window.location.pathname;
      if (!targetsCurrent) return;

      if (scrollToHash(hash, true)) {
        e.preventDefault();
        history.replaceState(null, "", `${window.location.pathname}#${hash}`);
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return null;
}
