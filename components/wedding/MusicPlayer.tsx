"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  src: string;
}

export function MusicPlayer({ src }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  const handlePlayPause = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }, [isPlaying]);

  // Attempt autoplay on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || hasAttemptedAutoplay) return;

    audio.loop = true;
    audio.preload = "auto";

    const attemptAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay blocked by browser - user will need to click to play
        console.log("Autoplay blocked, user interaction required");
      }
      setHasAttemptedAutoplay(true);
    };

    // Try autoplay after a short delay
    const timer = setTimeout(attemptAutoplay, 500);

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      clearTimeout(timer);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, [hasAttemptedAutoplay]);

  // Listen for user interaction to enable autoplay
  useEffect(() => {
    if (isPlaying || hasAttemptedAutoplay) return;

    const enableAudio = async () => {
      const audio = audioRef.current;
      if (!audio || isPlaying) return;

      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Still blocked
      }
    };

    // Try to play on first user interaction with the page
    document.addEventListener("click", enableAudio, { once: true });
    document.addEventListener("touchstart", enableAudio, { once: true });
    document.addEventListener("scroll", enableAudio, { once: true });

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("scroll", enableAudio);
    };
  }, [isPlaying, hasAttemptedAutoplay]);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        playsInline
        className="hidden"
      />
      <button
        onClick={handlePlayPause}
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 backdrop-blur-md border-2 border-[#996515] text-[#5D2E0C] hover:bg-[#5D2E0C] hover:text-white hover:border-[#5D2E0C] transition-all duration-200 active:scale-95"
        style={{ boxShadow: "0 4px 20px rgba(93, 46, 12, 0.3)" }}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" />
        )}
      </button>
    </>
  );
}
