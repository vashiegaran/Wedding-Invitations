"use client";

import type { CSSProperties } from "react";
import Image from "next/image";

const FALL_ANIMATION_CLASSES = [
  "animate-banana-fall-1",
  "animate-banana-fall-2",
  "animate-banana-fall-3",
];

type FallStyle = CSSProperties &
  Record<
    "--drift-x" | "--drift-alt" | "--fall-duration" | "--fall-delay",
    string
  >;

interface FallConfigOptions {
  topRange?: [number, number];
  delayRange?: [number, number];
  durationRange?: [number, number];
}

function buildFallConfig(leftPosition: string, options?: FallConfigOptions) {
  const randomBetween = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const animationClass =
    FALL_ANIMATION_CLASSES[
      Math.floor(Math.random() * FALL_ANIMATION_CLASSES.length)
    ];

  const [topMin, topMax] = options?.topRange ?? [-150, -50];
  const [delayMin, delayMax] = options?.delayRange ?? [0, 8];
  const [durationMin, durationMax] = options?.durationRange ?? [14, 24];

  const duration = randomBetween(durationMin, durationMax);
  const delay = randomBetween(delayMin, delayMax);
  const topOffset = randomBetween(topMin, topMax);
  const driftX = randomBetween(-60, 60);
  const driftAlt = randomBetween(-50, 50);
  const size = randomBetween(25, 45);
  const opacity = randomBetween(0.2, 0.4);

  const wrapperStyle: FallStyle = {
    left: leftPosition,
    top: `${topOffset}px`,
    "--drift-x": `${driftX}px`,
    "--drift-alt": `${driftAlt}px`,
    "--fall-duration": `${duration}s`,
    "--fall-delay": `${delay}s`,
  };

  const flowerStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    opacity,
  };

  return { animationClass, wrapperStyle, flowerStyle };
}

function FallingFlower({ style }: { style: CSSProperties }) {
  return (
    <Image
      src="/drop.png"
      alt=""
      width={50}
      height={50}
      className="object-contain"
      style={style}
    />
  );
}

export function FallingLeavesAnimation() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Left side falling flowers */}
      {[...Array(6)].map((_, i) => {
        const leftPosition = `${(Math.random() * 20).toFixed(2)}%`;
        const { animationClass, wrapperStyle, flowerStyle } = buildFallConfig(
          leftPosition,
          {
            delayRange: [0, 6],
            durationRange: [14, 22],
          }
        );
        return (
          <div
            key={`left-${i}`}
            className={`absolute ${animationClass}`}
            style={wrapperStyle}
          >
            <FallingFlower style={flowerStyle} />
          </div>
        );
      })}

      {/* Right side falling flowers */}
      {[...Array(6)].map((_, i) => {
        const leftPosition = `${(80 + Math.random() * 20).toFixed(2)}%`;
        const { animationClass, wrapperStyle, flowerStyle } = buildFallConfig(
          leftPosition,
          {
            delayRange: [0.5, 7],
            durationRange: [15, 24],
          }
        );
        return (
          <div
            key={`right-${i}`}
            className={`absolute ${animationClass}`}
            style={wrapperStyle}
          >
            <FallingFlower style={flowerStyle} />
          </div>
        );
      })}

      {/* Center scattered flowers */}
      {[...Array(4)].map((_, i) => {
        const leftPosition = `${(30 + Math.random() * 40).toFixed(2)}%`;
        const { animationClass, wrapperStyle, flowerStyle } = buildFallConfig(
          leftPosition,
          {
            delayRange: [2, 10],
            durationRange: [16, 26],
          }
        );
        return (
          <div
            key={`center-${i}`}
            className={`absolute ${animationClass} hidden sm:block`}
            style={wrapperStyle}
          >
            <FallingFlower style={flowerStyle} />
          </div>
        );
      })}

      {/* Extra scattered flowers */}
      {[...Array(5)].map((_, i) => {
        const leftPosition = `${Math.random() * 100}%`;
        const { animationClass, wrapperStyle, flowerStyle } = buildFallConfig(
          leftPosition,
          {
            delayRange: [0, 8],
            durationRange: [12, 20],
          }
        );
        return (
          <div
            key={`scattered-${i}`}
            className={`absolute ${animationClass}`}
            style={wrapperStyle}
          >
            <FallingFlower style={flowerStyle} />
          </div>
        );
      })}
    </div>
  );
}
