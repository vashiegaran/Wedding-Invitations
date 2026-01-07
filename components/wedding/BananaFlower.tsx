import type { CSSProperties } from "react";

interface BananaFlowerProps {
  className?: string;
  style?: CSSProperties;
}

// Teal/gold petal for elegant wedding theme
export function BananaFlower({ className, style }: BananaFlowerProps) {
  return (
    <svg
      viewBox="0 0 30 45"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="15" cy="20" rx="12" ry="18" fill="#1A5F5A" opacity="0.3" />
      <ellipse cx="15" cy="18" rx="8" ry="12" fill="#C9A227" opacity="0.4" />
      <ellipse cx="15" cy="16" rx="4" ry="6" fill="#D4B847" opacity="0.5" />
    </svg>
  );
}
