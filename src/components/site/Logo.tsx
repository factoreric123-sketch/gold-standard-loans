export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  const main = size === "lg" ? "text-2xl md:text-3xl" : "text-base md:text-lg";
  const eyebrow = size === "lg" ? "text-[10px]" : "text-[9px]";
  const roof = size === "lg" ? { w: 26, h: 10 } : { w: 20, h: 8 };

  return (
    <span className={`inline-flex flex-col leading-none ${className}`.trim()}>
      <span className="flex items-center gap-1.5">
        <svg
          width={roof.w}
          height={roof.h}
          viewBox="0 0 26 10"
          fill="none"
          aria-hidden="true"
          className="text-gold"
        >
          <path
            d="M2 8 L13 2 L24 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={`${eyebrow} uppercase tracking-[0.3em] text-gold`}>The Discount</span>
      </span>
      <span className={`font-serif ${main} tracking-tight mt-1`}>Mortgage Store</span>
    </span>
  );
}
