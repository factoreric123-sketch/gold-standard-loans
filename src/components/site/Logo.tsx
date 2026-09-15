import wideLogo from "@/assets/logo-wide-v2.png.asset.json";

export function Logo({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
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
        className={`block h-24 w-auto md:h-32 max-w-full object-contain ${className}`.trim()}
      />
    );
  }

  // Nav: horizontal lockup so the architecture mark and wordmark stay optically aligned.
  if (size === "sm") {
    return (
      <img
        src={wideLogo.url}
        alt="The Discount Mortgage Store"
        width={320}
        height={77}
        loading="eager"
        decoding="async"
        className={`block h-16 w-auto md:h-20 lg:h-24 max-w-full object-contain ${className}`.trim()}
      />
    );
  }

  return (
    <img
      src={wideLogo.url}
      alt="The Discount Mortgage Store"
      width={320}
      height={77}
      loading="eager"
      decoding="async"
      className={`block h-14 w-auto md:h-20 max-w-full object-contain ${className}`.trim()}
    />
  );
}
