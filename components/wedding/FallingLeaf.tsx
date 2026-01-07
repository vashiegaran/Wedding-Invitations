import type { CSSProperties } from "react";

interface FallingLeafProps {
  className?: string;
  style?: CSSProperties;
}

// Golden petal for elegant wedding theme
export function FallingLeaf({ className, style }: FallingLeafProps) {
  return (
    <svg
      viewBox="0 0 40 60"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2 
           C 10 10, 4 25, 4 35
           C 4 45, 10 55, 20 58
           C 30 55, 36 45, 36 35
           C 36 25, 30 10, 20 2Z"
        fill="#C9A227"
        opacity="0.4"
      />
      <path
        d="M20 5 L20 55"
        stroke="#8B7355"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
