"use client";

import type { CSSProperties } from "react";
import { FallingLeaf } from "./FallingLeaf";
import { BananaFlower } from "./BananaFlower";

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
  const size = randomBetween(20, 40);
  const opacity = randomBetween(0.4, 0.75);

  const wrapperStyle: FallStyle = {
    left: leftPosition,
    top: `${topOffset}px`,
    "--drift-x": `${driftX}px`,
    "--drift-alt": `${driftAlt}px`,
    "--fall-duration": `${duration}s`,
    "--fall-delay": `${delay}s`,
  };

  const leafStyle: CSSProperties = {
    width: `${size}px`,
    height: `${size * 1.5}px`,
  };

  return { animationClass, wrapperStyle, leafStyle, opacity };
}

export function FallingLeavesAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Left side falling elements */}
      {[...Array(6)].map((_, i) => {
        const leftPosition = `${(Math.random() * 20).toFixed(2)}%`;
        const { animationClass, wrapperStyle, leafStyle, opacity } =
          buildFallConfig(leftPosition, {
            delayRange: [0, 6],
            durationRange: [14, 22],
          });
        return (
          <div
            key={`left-${i}`}
            className={`absolute ${animationClass}`}
            style={wrapperStyle}
          >
            <FallingLeaf style={{ ...leafStyle, opacity }} />
          </div>
        );
      })}

      {/* Right side falling elements */}
      {[...Array(6)].map((_, i) => {
        const leftPosition = `${(80 + Math.random() * 20).toFixed(2)}%`;
        const { animationClass, wrapperStyle, leafStyle, opacity } =
          buildFallConfig(leftPosition, {
            delayRange: [0.5, 7],
            durationRange: [15, 24],
          });
        return (
          <div
            key={`right-${i}`}
            className={`absolute ${animationClass}`}
            style={wrapperStyle}
          >
            <FallingLeaf style={{ ...leafStyle, opacity }} />
          </div>
        );
      })}

      {/* Center scattered elements */}
      {[...Array(4)].map((_, i) => {
        const leftPosition = `${(30 + Math.random() * 40).toFixed(2)}%`;
        const { animationClass, wrapperStyle, leafStyle, opacity } =
          buildFallConfig(leftPosition, {
            delayRange: [2, 10],
            durationRange: [16, 26],
          });
        const isFlower = i % 3 === 0;
        return (
          <div
            key={`center-${i}`}
            className={`absolute ${animationClass} hidden sm:block`}
            style={wrapperStyle}
          >
            {isFlower ? (
              <BananaFlower style={{ ...leafStyle, opacity: opacity * 0.8 }} />
            ) : (
              <FallingLeaf style={{ ...leafStyle, opacity }} />
            )}
          </div>
        );
      })}

      {/* Extra scattered elements */}
      {[...Array(5)].map((_, i) => {
        const leftPosition = `${Math.random() * 100}%`;
        const { animationClass, wrapperStyle, leafStyle, opacity } =
          buildFallConfig(leftPosition, {
            delayRange: [0, 8],
            durationRange: [12, 20],
          });
        return (
          <div
            key={`scattered-${i}`}
            className={`absolute ${animationClass}`}
            style={wrapperStyle}
          >
            <FallingLeaf style={{ ...leafStyle, opacity: opacity * 0.9 }} />
          </div>
        );
      })}
    </div>
  );
}

