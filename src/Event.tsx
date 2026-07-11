import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MainContext } from './context'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Header from './components/All/header';
import LoadingScreen from './components/All/loadingScreen';

gsap.registerPlugin(ScrollTrigger);

export default function Event() {
  const { eventData } = useContext(MainContext)!;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
            setIsLoading(false);
            }, 5500)
        }
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            return () => window.removeEventListener("load", handleLoad);
        }
    }, []);

  // 8. Animasi GSAP menggunakan ScrollTrigger
  useGSAP(() => {
    // Animasi Header
    gsap.fromTo('.gsap-header', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Animasi List Item (Staggered Scroll)
    const items = gsap.utils.toArray('.gsap-article-item');
    items.forEach((item: any) => {
      gsap.fromTo(item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            scroller: scrollContainerRef.current, // Wajib menggunakan ini karena parent h-svh
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, { scope: mainRef, dependencies: [eventData] });

  return (
    <>
        {hasLoaded && <Header hasLoaded={hasLoaded}  isSectionMenu={false} />}
        {!hasLoaded ? <LoadingScreen isLoading={isLoading} onCompleteLoad={() => setHasLoaded(true)} /> : 
            <div ref={mainRef} className="w-full bg-background px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh flex flex-col overflow-hidden relative">
                
                <div className="gsap-header flex flex-col gap-2 shrink-0 border-b border-slate-200 pb-6 mb-6">
                    <h2 className="font-javamango text-5xl md:text-6xl text-accent tracking-[4px]">Events & News</h2>
                    <p className="font-mono text-sm md:text-base text-slate-500">Discover the latest updates, festivals, and stories from Kediri.</p>
                </div>

                {/* Area Scroll Internal */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto hide-scrollbar pb-20 pr-0 md:pr-4">
                    <div className="flex flex-col gap-10 lg:gap-14">
                    
                    {eventData.map((event) => (
                        <article 
                        key={event.id}
                        // 12. Redirect ke halaman detail dengan mengirim parameter ID
                        onClick={() => navigate(`/event/${event.id}`)}
                        // 2. Mobile (flex-col) gambar di atas, Desktop (lg:flex-row-reverse) gambar di kanan
                        className="gsap-article-item group flex flex-col lg:flex-row-reverse gap-5 lg:gap-10 items-center cursor-pointer border-b border-slate-100 pb-10 lg:pb-14 last:border-0 last:pb-0"
                        >
                        {/* Gambar Event */}
                        <div className="w-full lg:w-2/5 aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shrink-0 shadow-md">
                            <img 
                            src={event.img} 
                            alt={event.name} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                            />
                        </div>
                        
                        {/* Teks Konten */}
                        <div className="w-full lg:w-3/5 flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2 font-mono text-xs md:text-sm text-primary uppercase tracking-widest font-semibold">
                            <span className="bg-primary/10 px-3 py-1 rounded-full text-primary">{event.time}</span>
                            <span className="text-slate-400">•</span>
                            <span>{event.location}</span>
                            </div>
                            
                            <h3 className="font-playfair-display text-2xl md:text-3xl lg:text-4xl font-bold text-accent group-hover:text-secondary transition-colors duration-300 leading-snug">
                            {event.name}
                            </h3>
                            
                            <p className="font-mono text-sm md:text-base text-slate-600 line-clamp-3 leading-relaxed mt-2">
                            {event.desc}
                            </p>
                            
                            <span className="font-playfair-display text-secondary text-sm md:text-base font-semibold italic mt-2 group-hover:translate-x-2 transition-transform duration-300">
                            Read full article &rarr;
                            </span>
                        </div>
                        </article>
                    ))}
                    
                    </div>
                </div>
                
            </div>     
        }
    </>
  );
}