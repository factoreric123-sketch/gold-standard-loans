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

  // Nav (default): cropped architecture mark + a single-family sans wordmark.
  // Same font for both lines, distinguished only by size and color, matching the
  // sans typography inside the logo image itself.
  return (
    <span className={`font-sans inline-flex items-center gap-2.5 leading-none ${className}`.trim()}>
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
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
          The Discount
        </span>
        <span className="mt-1.5 text-[14px] font-medium uppercase tracking-[0.2em] text-foreground md:text-[15px]">
          Mortgage Store
        </span>
      </span>
    </span>
  );
}
