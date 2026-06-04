export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  // Footer / hero: full image (image already includes the wordmark, big enough to read).
  if (size === "lg") {
    return (
      <img
        src="/logo.webp"
        alt="The Discount Mortgage Store"
        width={1254}
        height={1254}
        loading="eager"
        decoding="async"
        className={`block h-20 w-auto md:h-24 ${className}`.trim()}
      />
    );
  }

  // Nav (default): crop the image to just the architecture (top ~65%) and put a
  // crisp serif wordmark next to it, since the embedded image text is too small
  // to read at nav height.
  return (
    <span className={`inline-flex items-center gap-3 leading-none ${className}`.trim()}>
      <span
        role="img"
        aria-label="The Discount Mortgage Store"
        className="block h-11 w-11 shrink-0 bg-no-repeat md:h-12 md:w-12"
        style={{
          backgroundImage: "url(/logo.webp)",
          backgroundSize: "auto 158%",
          backgroundPosition: "top center",
        }}
      />
      <span className="inline-flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold">The Discount</span>
        <span className="font-serif text-base tracking-tight md:text-lg mt-1">Mortgage Store</span>
      </span>
    </span>
  );
}
