import type { CSSProperties } from "react";

interface BananaLeafProps {
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
}

export function BananaLeaf({
  className,
  style,
  flip = false,
}: BananaLeafProps) {
  return (
    <svg
      viewBox="0 0 200 500"
      className={className}
      style={{
        ...style,
        transform: flip
          ? `scaleX(-1) ${style?.transform || ""}`
          : style?.transform,
      }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5a8f29" />
          <stop offset="50%" stopColor="#4a7c23" />
          <stop offset="100%" stopColor="#3a6318" />
        </linearGradient>
        <linearGradient id="leafHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6ba832" />
          <stop offset="100%" stopColor="#4a7c23" />
        </linearGradient>
      </defs>
      {/* Main leaf shape */}
      <path
        d="M100 10 
           C 60 50, 20 120, 15 200
           C 10 280, 30 360, 50 420
           C 60 450, 80 480, 100 490
           C 120 480, 140 450, 150 420
           C 170 360, 190 280, 185 200
           C 180 120, 140 50, 100 10Z"
        fill="url(#leafGradient)"
        opacity="0.95"
      />
      {/* Central vein */}
      <path
        d="M100 20 L100 480"
        stroke="#3a5f18"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Side veins */}
      {[80, 140, 200, 260, 320, 380].map((y, i) => (
        <g key={i}>
          <path
            d={`M100 ${y} Q ${70 - i * 3} ${y + 20}, ${40 + i * 5} ${y + 40}`}
            stroke="#3a5f18"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <path
            d={`M100 ${y} Q ${130 + i * 3} ${y + 20}, ${160 - i * 5} ${y + 40}`}
            stroke="#3a5f18"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </g>
      ))}
      {/* Highlight */}
      <path
        d="M100 30 
           C 75 60, 50 120, 45 180
           C 40 240, 50 300, 60 350"
        stroke="url(#leafHighlight)"
        strokeWidth="8"
        fill="none"
        opacity="0.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
