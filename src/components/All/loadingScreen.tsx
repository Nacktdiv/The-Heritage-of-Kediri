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

  const bgColumns = [
    { id: 1, title: 'CULINARY', img: 'https://images.unsplash.com/photo-1707274861080-8c72f289cb6c?q=80&w=2098&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, title: 'NATURE', img: 'https://images.unsplash.com/photo-1552985346-10467d0e0306?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, title: 'CULTURE', img: 'https://images.unsplash.com/photo-1709094979090-bc35418ab53b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFyaSUyMHJlbW9uZ3xlbnwwfHwwfHx8MA%3D%3D' },
    { id: 4, title: 'MODERN', img: 'https://images.unsplash.com/photo-1664691455980-6000cf88d1e1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  useGSAP(() => {
    const masterTl = gsap.timeline();

    masterTl
      .fromTo(outerCircleRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo(innerCircleRef.current, 
        { scale: 3, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" }, 
        "-=0.7"
      )
      .fromTo(gifRef.current, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, 
        "-=0.5"
      )
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

      .add(() => {
        loopTl.current = gsap.timeline({ repeat: -1 })
          .to(".ball", {
            backgroundColor: "#4B2E2B", 
            duration: 0.4,
            stagger: {
              each: 0.1,
              from: "start" 
            }
          })
          .to(".ball", {
            backgroundColor: "rgba(75, 46, 43, 0.5)",
            duration: 0.4,
            stagger: {
              each: 0.1,
              from: "start"
            }
          });
      });

  }, { scope: containerRef });

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

        <div className="absolute inset-0 z-[1] flex flex-row w-full h-full opacity-25 pointer-events-none select-none">
          {bgColumns.map((col) => (
            <div 
              key={col.id} 
              className="relative flex-1 h-full flex items-center justify-center overflow-hidden border-r border-white/5 last:border-0"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center filter blur-[4px] scale-110"
                style={{ backgroundImage: `url(${col.img})` }}
              />
              <div className="absolute inset-0 bg-black/25" />
              
              <h3 className="relative z-10 text-white font-bold text-lg md:text-xl tracking-[0.2em] opacity-60">
                {col.title}
              </h3>
            </div>
          ))}
        </div>

        <div 
          ref={outerCircleRef}
          className="absolute z-10 flex flex-col items-center justify-center gap-4 rounded-full h-[60vh] lg:h-[130vh] aspect-square bg-black/25"
        >
            <div 
              ref={innerCircleRef}
              className="flex flex-col items-center justify-center gap-8 h-[54%] aspect-square rounded-full bg-primary shadow-2xl"
            >
                <div ref={gifRef} className="flex flex-col items-center justify-center h-76 w-fit">
                  <img src={loading} className="w-full h-full object-contain" alt="Loading Orang Jawa" />
                </div>

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