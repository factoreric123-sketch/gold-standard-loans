import wideLogo from "@/assets/logo-wide.png.asset.json";

export function Logo({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  // Footer / hero: full stacked lockup (image already includes the wordmark).
  if (size === "lg") {
    return (
      <img
        src="/logo.webp"
        alt="The Discount Mortgage Store"
        width={1254}
        height={1254}
        loading="eager"
        decoding="async"
        className={`block h-20 w-auto md:h-28 ${className}`.trim()}
      />
    );
  }

  // Nav: horizontal lockup so the architecture mark and wordmark stay optically aligned.
  return (
    <img
      src={wideLogo.url}
      alt="The Discount Mortgage Store"
      width={586}
      height={182}
      loading="eager"
      decoding="async"
      className={`block h-16 w-auto md:h-20 ${className}`.trim()}
    />
  );
}
