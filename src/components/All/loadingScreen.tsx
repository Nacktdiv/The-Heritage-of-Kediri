// src/components/LoadingScreen.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import loading from "../../assets/orangjawa-loading.gif";

type LoadingScreenProps = {
  isLoading: boolean;
  onCompleteLoad: () => void;
};

export default function LoadingScreen({ isLoading, onCompleteLoad }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerCircleRef = useRef<HTMLDivElement>(null);
  const innerCircleRef = useRef<HTMLDivElement>(null);
  const gifRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const loopTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const masterTl = gsap.timeline();

    // --- PHASE 1: INTRO (Lingkaran & Munculnya Konten) ---
    masterTl
      // 1. Lingkaran luar (Black/40) dari kecil ke besar
      .fromTo(outerCircleRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "power4.out" }
      )
      // 2. Lingkaran dalam (Primary) dari besar mengecil ke normal
      .fromTo(innerCircleRef.current, 
        { scale: 3, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, 
        "-=0.7" // Overlap dengan lingkaran luar
      )
      // 3. GIF Orang Jawa muncul
      .fromTo(gifRef.current, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 
        "-=0.5"
      )
      // 4. Stagger bola kecil PERTAMA (Kiri ke Kanan)
      .fromTo(".ball", 
        { opacity: 0, x: -20, scale: 0 }, 
        { 
          opacity: 1, 
          x: 0, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.1, 
          ease: "power2.out" 
        }, 
        "-=0.3"
      )
      // --- PHASE 2: IDLE LOOP (Stagger Warna Kanan ke Kiri) ---
      .add(() => {
        // Jalankan loop setelah intro selesai
        loopTl.current = gsap.timeline({ repeat: -1 })
          .to(".ball", {
            backgroundColor: "#4B2E2B", // Warna Accent Anda
            duration: 0.4,
            stagger: {
              each: 0.1,
              from: "start" // DARI KANAN KE KIRI
            }
          })
          .to(".ball", {
            backgroundColor: "rgba(75, 46, 43, 0.5)", // Kembali ke Accent/50
            duration: 0.4,
            stagger: {
              each: 0.1,
              from: "start"
            }
          });
      });

  }, { scope: containerRef });

  // --- PHASE 3: EXIT (Outro & Flash White) ---
  useEffect(() => {
    if (!isLoading) {
      if (loopTl.current) loopTl.current.kill();

      const exitTl = gsap.timeline();

      exitTl.to([outerCircleRef.current, innerCircleRef.current], 
        {
          scale: 2.5,
          opacity: 0.5,
          duration: 0.8,
          ease: "power4.in"
        })
        .to(flashRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            // Beritahu parent (Home.tsx) bahwa seluruh animasi loading sudah beres!
            onCompleteLoad(); 
          }
        }, "-=0.2");
    }
  }, [isLoading, onCompleteLoad]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-primary overflow-hidden" 
    >
        <div 
          ref={flashRef}
          className="fixed inset-0 bg-white opacity-0 z-[1000] pointer-events-none"
        />
        <div 
          ref={outerCircleRef}
          className="absolute flex flex-col items-center justify-center gap-4 rounded-full h-[60vh] lg:h-[130vh] aspect-square bg-black/40"
        >
            <div 
              ref={innerCircleRef}
              className="flex flex-col items-center justify-center gap-8 h-[54%] aspect-square rounded-full bg-primary shadow-2xl"
            >
                {/* GIF Area */}
                <div ref={gifRef} className="flex flex-col items-center justify-center h-76 w-fit">
                  <img src={loading} className="w-full h-full object-contain" alt="Loading Orang Jawa" />
                </div>

                {/* Bola Stagger Area */}
                <div className="flex items-center justify-center gap-3 h-5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="ball h-4 w-4 rounded-full bg-accent/50 shadow-sm"
                    ></div>
                  ))}
              </div>
            </div>
        </div>
    </div>
  );
}