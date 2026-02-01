"use client";

import { motion } from "framer-motion";

// Floating Diya (Oil Lamp) SVG component
function Diya({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flame */}
      <motion.path
        d="M32 8C32 8 28 16 28 20C28 24 30 26 32 26C34 26 36 24 36 20C36 16 32 8 32 8Z"
        fill="url(#flameGradient)"
        animate={{
          d: [
            "M32 8C32 8 28 16 28 20C28 24 30 26 32 26C34 26 36 24 36 20C36 16 32 8 32 8Z",
            "M32 6C32 6 27 15 27 20C27 25 30 27 32 27C34 27 37 25 37 20C37 15 32 6 32 6Z",
            "M32 8C32 8 28 16 28 20C28 24 30 26 32 26C34 26 36 24 36 20C36 16 32 8 32 8Z",
          ],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Inner flame */}
      <motion.ellipse
        cx="32"
        cy="20"
        rx="2"
        ry="4"
        fill="#FFF7E0"
        animate={{
          ry: [4, 5, 4],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Lamp base */}
      <path
        d="M24 28H40C40 28 42 32 42 36C42 40 38 44 32 44C26 44 22 40 22 36C22 32 24 28 24 28Z"
        fill="url(#brassGradient)"
      />
      {/* Lamp rim */}
      <ellipse cx="32" cy="28" rx="8" ry="2" fill="#D4A84B" />
      {/* Base */}
      <ellipse cx="32" cy="44" rx="6" ry="2" fill="#8B6914" />
      <defs>
        <linearGradient id="flameGradient" x1="32" y1="8" x2="32" y2="26">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#FF9500" />
          <stop offset="100%" stopColor="#FF5722" />
        </linearGradient>
        <linearGradient id="brassGradient" x1="22" y1="28" x2="42" y2="44">
          <stop offset="0%" stopColor="#D4A84B" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Mango leaf SVG
function MangoLeaf({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 50"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 0C15 0 5 15 5 30C5 45 15 50 15 50C15 50 25 45 25 30C25 15 15 0 15 0Z"
        fill="url(#leafGradient)"
      />
      <path
        d="M15 5V45"
        stroke="#2D5016"
        strokeWidth="1"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="leafGradient" x1="5" y1="0" x2="25" y2="50">
          <stop offset="0%" stopColor="#4A7C23" />
          <stop offset="50%" stopColor="#3D6B1E" />
          <stop offset="100%" stopColor="#2D5016" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Kolam dot pattern
function KolamDot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-br from-[#C9A227] to-[#8B6914]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1, 1, 0],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// Sparkle component
function Sparkle({ size = 8, delay = 0, x = 0, y = 0 }: { size?: number; delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z"
          fill="url(#sparkleGrad)"
        />
        <defs>
          <linearGradient id="sparkleGrad" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#C9A227" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export function TopDecoration() {
  return (
    <div className="absolute top-0 left-0 right-0 z-[6] pointer-events-none overflow-hidden">
      {/* Hanging Mango Leaf Toran (Garland) */}
      <div className="relative w-full h-20 sm:h-24">
        {/* Golden thread line */}
        <motion.div 
          className="absolute top-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        {/* Swaying mango leaves */}
        <div className="absolute top-2 left-0 right-0 flex justify-center gap-1 sm:gap-2">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="origin-top"
              animate={{
                rotateZ: [
                  -3 + Math.sin(i) * 2,
                  3 + Math.cos(i) * 2,
                  -3 + Math.sin(i) * 2,
                ],
              }}
              transition={{
                duration: 2 + (i % 3) * 0.5,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MangoLeaf 
                className="w-4 h-8 sm:w-5 sm:h-10" 
                flip={i % 2 === 0}
              />
            </motion.div>
          ))}
        </div>

        {/* Golden bells/ornaments between leaves */}
        <div className="absolute top-14 sm:top-16 left-0 right-0 flex justify-center gap-6 sm:gap-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-3 sm:w-3 sm:h-4 rounded-full bg-gradient-to-b from-[#FFD700] to-[#B8860B]"
              animate={{
                y: [0, 2, 0],
                rotateZ: [-5, 5, -5],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                boxShadow: "0 2px 8px rgba(201, 162, 39, 0.5)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Diyas on sides */}
      <motion.div
        className="absolute top-24 sm:top-28 left-4 sm:left-8"
        animate={{
          y: [0, -8, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Diya className="w-10 h-10 sm:w-14 sm:h-14 opacity-80" />
      </motion.div>

      <motion.div
        className="absolute top-24 sm:top-28 right-4 sm:right-8"
        animate={{
          y: [0, -8, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 3,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Diya className="w-10 h-10 sm:w-14 sm:h-14 opacity-80" />
      </motion.div>

      {/* Kolam-inspired corner decorations */}
      <div className="absolute top-4 left-4 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <KolamDot key={i} delay={i * 0.3} />
        ))}
      </div>
      <div className="absolute top-4 right-4 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <KolamDot key={i} delay={i * 0.3 + 0.5} />
        ))}
      </div>

      {/* Floating sparkles */}
      <Sparkle size={10} delay={0} x={15} y={30} />
      <Sparkle size={8} delay={0.7} x={85} y={25} />
      <Sparkle size={6} delay={1.4} x={25} y={50} />
      <Sparkle size={8} delay={2.1} x={75} y={55} />
      <Sparkle size={10} delay={0.3} x={50} y={20} />
      <Sparkle size={6} delay={1.8} x={10} y={60} />
      <Sparkle size={6} delay={2.5} x={90} y={60} />

      {/* Gradient glow at top */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(201, 162, 39, 0.08) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

