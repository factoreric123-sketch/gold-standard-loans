export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  // The image already includes the wordmark, so we render it as the full lockup.
  // sm/md (nav) — compact; lg (footer / hero) — bigger.
  const h = size === "lg" ? "h-20 md:h-24" : "h-11 md:h-12";
  return (
    <img
      src="/logo.webp"
      alt="The Discount Mortgage Store"
      width={1254}
      height={1254}
      loading="eager"
      decoding="async"
      className={`block w-auto ${h} ${className}`.trim()}
    />
  );
}
