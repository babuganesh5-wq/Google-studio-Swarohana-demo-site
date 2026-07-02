import React from "react";

interface SwarohanaBrandLogoProps {
  language: "en" | "ta";
  theme: "light" | "dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function SwarohanaBrandLogo({
  language,
  theme,
  showText = true,
  size = "md",
}: SwarohanaBrandLogoProps) {
  // Determine dimensions based on size
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  // SVG stylized S-curve/veena musical notes symbol inside the yellow box
  const renderSwarohanaSymbol = () => (
    <svg
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
    >
      {/* 1. Yellow Rounded Rectangular Background Block */}
      <rect x="10" y="10" width="100" height="130" rx="20" fill="#FFC72C" />

      {/* 2. Stylized Musical S-Curve / Veena silhouette in deep chocolate brown */}
      {/* Bottom circular swirl */}
      <circle cx="48" cy="110" r="18" fill="#3D281A" />
      <circle cx="48" cy="110" r="10" fill="#FFC72C" />
      
      {/* Elegant sweeping S-curves that form the neck/wave */}
      <path
        d="M 48 110 
           C 68 110, 88 95, 80 65 
           C 72 35, 42 35, 52 15 
           C 53 13, 56 12, 58 15 
           C 50 30, 84 45, 85 70 
           C 86 95, 62 122, 48 110 Z"
        fill="#7F6553"
      />

      {/* Stylized note head / veena peg detail (Top branch) */}
      <path
        d="M 68 35 
           C 65 45, 55 50, 60 62 
           C 65 74, 82 74, 85 64 
           C 88 54, 78 45, 74 38
           C 72 34, 70 32, 68 35 Z"
        fill="#3D281A"
      />
      
      {/* Inner flame element */}
      <path
        d="M 52 50
           C 48 65, 55 80, 68 95
           C 60 85, 53 70, 56 55
           Z"
        fill="#3D281A"
      />
    </svg>
  );

  if (!showText) {
    return <div className={iconSizes[size]}>{renderSwarohanaSymbol()}</div>;
  }

  // Define text and subtitle colors based on active theme
  const subtitleColorClass =
    theme === "dark"
      ? "text-brand-yellow-700 font-extrabold"
      : "text-brand-brown-800 font-extrabold";

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Swarohana Yellow Emblem Box */}
      <div className={`${iconSizes[size]} flex-shrink-0`}>
        {renderSwarohanaSymbol()}
      </div>

      {/* Swarohana Typographic Brand Layout */}
      <div className="flex flex-col justify-center">
        {/* Dark Brown Banner Card with Swarohana text inside */}
        <div className={`${
          theme === "dark"
            ? "bg-[#2C1A16] border border-[#FFC72C]/50"
            : "bg-[#3D281A] border border-[#4E3524]"
        } px-3.5 py-1 rounded-md shadow-xs`}>
          {language === "en" ? (
            <span
              className="font-serif text-lg font-extrabold tracking-wide text-[#FFFDF9]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Swarohana
            </span>
          ) : (
            <span
              className="font-serif text-sm font-extrabold tracking-wider text-[#FFFDF9]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              ஸ்வரோஹனா
            </span>
          )}
        </div>

        {/* Subtitle text positioned perfectly underneath, fully high contrast in dark mode */}
        <div className="pl-1 mt-1">
          {language === "en" ? (
            <span
              className={`text-[9px] uppercase tracking-[0.24em] font-mono ${subtitleColorClass}`}
            >
              MUSIC STUDIO
            </span>
          ) : (
            <span
              className={`text-[9px] uppercase tracking-[0.16em] font-serif font-extrabold ${subtitleColorClass}`}
            >
              மியூசிக் ஸ்டுடியோஸ்
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
