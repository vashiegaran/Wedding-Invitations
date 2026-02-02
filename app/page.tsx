"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { FallingLeavesAnimation } from "@/components/wedding/FallingLeavesAnimation";

// Wedding event data
const WEDDING_DATA = {
  couple: {
    groom: "K. Lauvindra Raj",
    groomShort: "Lauvindra",
    bride: "V. Divashini",
    brideShort: "Divashini",
    hashtag: "#divafoundherlau",
  },

  wedding: {
    date: "Sunday, 8th March 2026",
    time: "9.15am to 11.30am",
    venue: "Arulmigu Samayapura Maha Mariamman Temple",
    address: "1982, A13, Kampung Masjid, 31250 Tanjung Rambutan, Perak",
    googleMapsUrl:
      "https://maps.google.com/?q=Arulmigu+Samayapura+Maha+Mariamman+Temple,+Tanjung+Rambutan,+Perak",
    wazeUrl:
      "https://waze.com/ul?q=Arulmigu+Samayapura+Maha+Mariamman+Temple,+Tanjung+Rambutan,+Perak&navigate=yes",
  },
  reception: {
    date: "Saturday, 14th March 2026",
    time: "7.00pm to 10.30pm",
    venue: "Mana Mana Cafe Event Hall",
    address:
      "Lot. 10, Seskyen 22, Hak Milik, No. 7841, Jalan Teluk Sisek, 25000 Kuantan, Pahang",
    googleMapsUrl:
      "https://maps.google.com/?q=Mana+Mana+Cafe+Event+Hall,+Jalan+Teluk+Sisek,+25000+Kuantan,+Pahang",
    wazeUrl:
      "https://waze.com/ul?q=Mana+Mana+Cafe+Event+Hall,+Jalan+Teluk+Sisek,+25000+Kuantan,+Pahang&navigate=yes",
    note: "Wedding Reception on behalf of bride's family",
  },
};

export default function WeddingInvitation() {
  const [easterEggCount, setEasterEggCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEasterEggClick = () => {
    setEasterEggCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setShowEasterEgg(true);
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (!showEasterEgg) return;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      setShowEasterEgg(false);
    }, 2200);
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [showEasterEgg]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showEasterEgg && (
        <div className="fixed inset-0 z-[50] pointer-events-none flex items-center justify-center">
          <div className="rounded-full bg-[#5D2E0C] text-[#F5E6D3] px-6 py-3 text-base sm:text-lg shadow-xl">
            Created By Vashie
          </div>
        </div>
      )}
      {/* Light to dark gradient background - warm cream/champagne/gold (horizontal: left to right) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #F5E6D3 0%, #EBDAC5 20%, #E0CBB0 40%, #D4BA98 60%, #C9A97D 80%, #B89B6A 100%)",
        }}
      />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 150px 30px rgba(100, 70, 40, 0.2), inset 0 0 300px 80px rgba(80, 55, 30, 0.1)",
        }}
      />

      {/* Golden decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

      {/* Background arch - Top */}
      <div className="absolute top-0 left-0 right-0 z-[4] pointer-events-none flex justify-center">
        <Image
          src="/bg.png"
          alt="Floral arch background"
          width={1094}
          height={1094}
          className="w-full max-w-none h-auto object-contain opacity-20 scale-[1.18]"
          priority
        />
      </div>

      {/* Deco Image - Top */}
      {/* <div
        className="absolute top-0 left-0 right-0 z-[5] pointer-events-none flex justify-center"
        style={{ opacity: 0.3 }}
      >
        <Image
          src="/deco.png"
          alt="Decoration"
          width={600}
          height={200}
          className="w-full max-w-2xl h-auto object-contain"
          priority
        />
      </div> */}

      {/* Side Flower - Right Side */}
      <div
        className="fixed z-[5] pointer-events-none"
        style={{
          top: "60%",
          right: "-30px",
          transform: "translateY(-50%) rotate(-20deg) scaleX(-1)",
          width: "clamp(100px, 20vw, 200px)",
          opacity: 0.4,
        }}
      >
        {/* <Image
          src="/new_flower.png"
          alt="Floral decoration"
          width={200}
          height={140}
          className="w-full h-auto object-contain"
          priority
        /> */}
      </div>

      {/* Side Flower - Left Side */}
      <div
        className="fixed z-[5] pointer-events-none"
        style={{
          top: "60%",
          left: "-30px",
          transform: "translateY(-50%) rotate(20deg)",
          width: "clamp(100px, 20vw, 200px)",
          opacity: 0.4,
        }}
      >
        {/* <Image
          src="/new_flower.png"
          alt="Floral decoration"
          width={200}
          height={140}
          className="w-full h-auto object-contain"
          priority
        /> */}
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full">
        <div className="max-w-2xl mx-auto px-4 mt-36 sm:mt-40 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 space-y-4 sm:space-y-6">
          {/* Names with Infinity Symbol */}
          <section className="text-center space-y-0">
            <h1
              className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#5D2E0C] leading-none animate-slide-down drop-shadow-sm"
              style={{
                fontFamily: "'Great Vibes', cursive",
                textShadow: "2px 2px 4px rgba(93, 46, 12, 0.3)",
              }}
            >
              {WEDDING_DATA.couple.groomShort}
            </h1>
            <div
              className="relative z-10 my-1 sm:my-2 cursor-pointer select-none"
              onClick={handleEasterEggClick}
              role="button"
              aria-label="Infinity symbol"
            >
              <Image
                src="/infinite.png"
                alt="Infinity symbol"
                width={225}
                height={224}
                className="w-14 sm:w-16 md:w-20 h-auto mx-auto"
              />
            </div>
            <h1
              className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#5D2E0C] leading-none animate-slide-up drop-shadow-sm"
              style={{
                fontFamily: "'Great Vibes', cursive",
                textShadow: "2px 2px 4px rgba(93, 46, 12, 0.3)",
              }}
            >
              {WEDDING_DATA.couple.brideShort}
            </h1>
          </section>

          {/* Couple Photo */}
          <section className="flex flex-col items-center justify-center gap-3 animate-scale-in w-full">
            <div className="relative w-full flex items-center justify-center">
              <div className="max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem] mx-auto animate-couple-photo">
                <div
                  className="cursor-pointer select-none"
                  onClick={handleEasterEggClick}
                  role="button"
                  aria-label="Couple photo"
                >
                  <Image
                    src="/lau_diva.png"
                    alt="Lauvindra and Divashini"
                    width={500}
                    height={500}
                    priority
                    className="w-full h-auto mx-auto"
                  />
                </div>
              </div>
            </div>
            <MusicPlayer src="/lau_diva.mp3" />
          </section>

          {/* Invitation Message */}
          <section className="text-center py-2">
            <p
              className="text-[#3D1F0D] text-lg sm:text-xl leading-relaxed font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              With great pleasure, we request your gracious presence and
              blessings on the auspicious occasion of our marriage
            </p>
          </section>

          {/* View Invitation Button */}
          <section className="text-center">
            <a
              href="/lau_diva_wedding.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base sm:text-lg bg-gradient-to-r from-[#8B4513] to-[#996515] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-[#6B3410] hover:to-[#7A5010] transition-all font-semibold shadow-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              🎊 View Invitation Card
            </a>
          </section>

          {/* Wedding Ceremony Details */}
          <section className="text-center space-y-3 event-card-gold rounded-xl p-5 sm:p-8">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl text-[#8B4513] font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Wedding Ceremony
            </h3>
            <div className="space-y-1">
              <p
                className="text-[#4A2511] text-xl sm:text-2xl md:text-3xl font-extrabold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {WEDDING_DATA.wedding.date}
              </p>
              <p
                className="text-[#3D1F0D] text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {WEDDING_DATA.wedding.time}
              </p>
            </div>
            <div className="space-y-1 pt-2">
              <p
                className="text-[#4A2511] text-lg sm:text-xl md:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {WEDDING_DATA.wedding.venue}
              </p>
              <p
                className="text-[#3D1F0D] text-lg sm:text-xl md:text-2xl font-medium"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {WEDDING_DATA.wedding.address}
              </p>
            </div>
            <p
              className="text-[#3D1F0D] text-base sm:text-lg italic pt-1"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              followed by a reception thereafter
            </p>
            <div className="flex justify-center gap-4 pt-3">
              <a
                href={WEDDING_DATA.wedding.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg bg-[#5D3A1A] text-white px-5 py-2.5 rounded-full hover:bg-[#4A2511] transition-colors font-semibold"
              >
                📍 Maps
              </a>
              <a
                href={WEDDING_DATA.wedding.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg bg-[#996515] text-white px-5 py-2.5 rounded-full hover:bg-[#7A5010] transition-colors font-semibold"
              >
                🚗 Waze
              </a>
            </div>
            {/* Contact Numbers */}
            <div className="pt-3 border-t border-[#C9A227]/30">
              <p
                className="text-[#4A2511] text-base sm:text-lg font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact
              </p>
              <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                <div className="text-center">
                  <p
                    className="text-[#3D1F0D] text-base sm:text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Nethi
                  </p>
                  <div className="flex gap-2 mt-1 justify-center">
                    <a
                      href="tel:+60143650752"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="Call"
                    >
                      📞
                    </a>
                    <a
                      href="https://wa.me/60143650752"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="text-[#3D1F0D] text-base sm:text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Shankar
                  </p>
                  <div className="flex gap-2 mt-1 justify-center">
                    <a
                      href="tel:+60149441429"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="Call"
                    >
                      📞
                    </a>
                    <a
                      href="https://wa.me/60149441429"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reception Details */}
          <section className="text-center space-y-3 event-card-rose rounded-xl p-5 sm:p-8">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl text-[#8B4513] font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Wedding Dinner
            </h3>
            <p
              className="text-[#3D1F0D] text-base sm:text-lg italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {WEDDING_DATA.reception.note}
            </p>
            <div className="space-y-1">
              <p
                className="text-[#4A2511] text-xl sm:text-2xl md:text-3xl font-extrabold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {WEDDING_DATA.reception.date}
              </p>
              <p
                className="text-[#3D1F0D] text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {WEDDING_DATA.reception.time}
              </p>
            </div>
            <div className="space-y-1 pt-2">
              <p
                className="text-[#4A2511] text-lg sm:text-xl md:text-2xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {WEDDING_DATA.reception.venue}
              </p>
              <p
                className="text-[#3D1F0D] text-lg sm:text-xl md:text-2xl font-medium"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {WEDDING_DATA.reception.address}
              </p>
            </div>
            <div className="flex justify-center gap-4 pt-3">
              <a
                href={WEDDING_DATA.reception.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg bg-[#5D3A1A] text-white px-5 py-2.5 rounded-full hover:bg-[#4A2511] transition-colors font-semibold"
              >
                📍 Maps
              </a>
              <a
                href={WEDDING_DATA.reception.wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg bg-[#996515] text-white px-5 py-2.5 rounded-full hover:bg-[#7A5010] transition-colors font-semibold"
              >
                🚗 Waze
              </a>
            </div>
            {/* Contact Numbers */}
            <div className="pt-3 border-t border-[#A0522D]/30">
              <p
                className="text-[#4A2511] text-base sm:text-lg font-bold mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contact
              </p>
              <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
                <div className="text-center">
                  <p
                    className="text-[#3D1F0D] text-base sm:text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Vijian
                  </p>
                  <div className="flex gap-2 mt-1 justify-center">
                    <a
                      href="tel:+60145474928"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="Call"
                    >
                      📞
                    </a>
                    <a
                      href="https://wa.me/60145474928"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="text-[#3D1F0D] text-base sm:text-lg font-semibold"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Sahratkumar
                  </p>
                  <div className="flex gap-2 mt-1 justify-center">
                    <a
                      href="tel:+60142177775"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="Call"
                    >
                      📞
                    </a>
                    <a
                      href="https://wa.me/60142177775"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#4A2511] hover:text-[#3D1F0D] transition-colors"
                      title="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Best Compliments */}
          <section className="text-center py-2">
            <p
              className="text-[#3D1F0D] text-sm sm:text-base italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              With best compliments from:
            </p>
            <p
              className="text-[#4A2511] text-base sm:text-lg font-semibold pt-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Family, Relatives & Friends
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-4">
        <div className="flex flex-col items-center justify-center">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#996515] px-5 py-2.5 sm:px-6 sm:py-3 text-[#5D2E0C] text-lg sm:text-xl backdrop-blur-sm font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              boxShadow: "0 4px 20px rgba(93, 46, 12, 0.3)",
              background:
                "linear-gradient(135deg, rgba(245, 230, 211, 0.9) 0%, rgba(228, 203, 176, 0.8) 100%)",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 sm:h-5 sm:w-5 text-[#996515]"
              fill="currentColor"
            >
              <path d="M12 4.248c-3.148-5.402-12-3.09-12 2.944 0 3.44 2.94 6.264 7.763 10.703L12 21.35l4.237-3.455C21.06 13.456 24 10.632 24 7.192c0-6.01-8.852-8.352-12-2.944z" />
            </svg>
            {WEDDING_DATA.couple.hashtag}
          </span>
        </div>
      </footer>

      {/* Falling Leaves Animation */}
      <FallingLeavesAnimation />

      {/* Peacock Image - At the bottom of the page */}
      <div className="relative z-10 w-full pointer-events-none -mt-8">
        <div className="flex justify-center">
          <Image
            src="/peacock.png"
            alt="Peacock decoration"
            width={900}
            height={600}
            className="w-full max-w-4xl h-auto object-contain peacock-fade-mask animate-peacock"
            priority
          />
        </div>
      </div>
    </div>
  );
}
