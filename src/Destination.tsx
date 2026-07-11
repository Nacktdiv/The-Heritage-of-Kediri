import React, { useState, useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoSearch, IoClose, IoTimeOutline, IoLocationOutline, IoFilter } from 'react-icons/io5';

import { MainContext } from './context';
import type { DestinationType } from './context';

import Header from './components/All/header';
import LoadingScreen from './components/All/loadingScreen';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Landmark', 'Nature', 'Culture', 'Culinary'];

export default function Destination() {
  const { destinationData } = useContext(MainContext)!

  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDest, setSelectedDest] = useState<DestinationType | null>(null);
  
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

  const filteredDestinations = destinationData.filter((dest : DestinationType) => {
    const matchSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        dest.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = activeCategory === 'All' || dest.category === activeCategory;
    return matchSearch && matchCategory;
  });

  useEffect(() => {
    if(!hasLoaded) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-masonry-item').forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              scroller: scrollContainerRef.current, 
              start: 'top 95%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // Animasi Header Filter
      gsap.fromTo('.gsap-filter-bar', 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );
      
    }, mainRef);

    return () => ctx.revert();
  }, [filteredDestinations, hasLoaded]);

  return (
    <>
      {hasLoaded && <Header hasLoaded={hasLoaded} isSectionMenu={false}/>}
      {!hasLoaded ? <LoadingScreen isLoading={isLoading} onCompleteLoad={() => setHasLoaded(true)} /> : 
          <div ref={mainRef} className="w-full bg-background px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh flex flex-col overflow-hidden relative">

            {/* ================= Search & Filter ================= */}
            <div className="gsap-filter-bar flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 z-10 shrink-0">
              <div className="flex flex-col">
                <h2 className="font-playfair-display text-4xl md:text-5xl text-accent font-bold">Destinations</h2>
                <p className="font-mono text-sm text-slate-500 mt-1">Discover the hidden gems of Kediri.</p>
              </div>

              <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                  <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:border-primary font-mono text-sm transition-all shadow-sm"
                  />
                </div>
                
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-colors duration-300 flex items-center gap-2 border ${
                        activeCategory === cat 
                          ? 'bg-primary text-white border-primary shadow-md' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-secondary hover:text-secondary'
                      }`}
                    >
                      {cat === 'All' && <IoFilter />}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= AREA KONTEN BAWAH (Masonry + Sidebar) ================= */}
            <div className="flex flex-1 gap-8 overflow-hidden relative">
              <div 
                ref={scrollContainerRef}
                className={`flex-1 h-full overflow-y-auto hide-scrollbar pb-20 transition-all duration-500 ${selectedDest ? 'lg:pr-4' : 'pr-0'}`}
              >
                {filteredDestinations.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center font-mono text-slate-400">
                    No destinations found.
                  </div>
                ) : (
                  // Tailwind CSS Columns untuk Masonry
                  <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {filteredDestinations.map((dest) => (
                      <div 
                        key={dest.id}
                        onClick={() => setSelectedDest(dest)}
                        className="gsap-masonry-item break-inside-avoid relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                      >
                        <img 
                          src={dest.img} 
                          alt={dest.name} 
                          className="w-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        {/* Overlay Gradasi & Judul Kiri Bawah Sesuai Instruksi */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-0 left-0 p-4 w-full flex flex-col">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-secondary mb-1">{dest.category}</span>
                          <h3 className="font-javamango text-xl md:text-2xl text-white tracking-widest leading-none drop-shadow-md">
                            {dest.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* KANAN: SIDEBAR (DESKTOP) */}
              <div 
                className={`hidden lg:flex flex-col h-full bg-white rounded-3xl shadow-2xl border border-slate-100 transition-all duration-500 transform overflow-hidden ${
                  selectedDest ? 'w-[400px] translate-x-0 opacity-100' : 'w-0 translate-x-full opacity-0'
                }`}
              >
                {selectedDest && (
                  <div className="w-full h-full flex flex-col relative">
                    <button 
                      onClick={() => setSelectedDest(null)}
                      className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <IoClose size={20} />
                    </button>
                    
                    <div className="h-[40%] w-full relative shrink-0">
                      <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar p-6 -mt-10 relative z-10 flex flex-col gap-4">
                      <div className="flex items-center gap-2 font-mono text-xs text-primary font-semibold uppercase tracking-wider">
                        <IoLocationOutline size={16} /> {selectedDest.category}
                      </div>
                      
                      <h3 className="font-javamango text-4xl text-accent tracking-[2px] leading-tight">
                        {selectedDest.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 font-mono text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <IoTimeOutline className="text-secondary" size={18} />
                        <span>Open: {selectedDest.openTime}</span>
                      </div>

                      <p className="font-playfair-display text-lg text-slate-800 leading-relaxed font-semibold mt-2">
                        {selectedDest.desc}
                      </p>

                      <p className="font-mono text-sm text-slate-600 leading-relaxed text-justify pb-10">
                        {selectedDest.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* ================= MODAL MOBILE & TABLET ================= */}
            <div 
              className={`fixed inset-0 z-50 lg:hidden flex justify-center items-end bg-black/40 backdrop-blur-sm transition-all duration-500 ${
                selectedDest ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onClick={() => setSelectedDest(null)}
            >
              <div 
                className={`w-full h-[85vh] bg-background rounded-t-3xl shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-500 ease-out delay-100 ${
                  selectedDest ? 'translate-y-0' : 'translate-y-full'
                }`}
                onClick={(e) => e.stopPropagation()} 
              >
                {selectedDest && (
                  <>
                    <div className="w-full h-8 flex justify-center items-center absolute top-0 left-0 z-20" onClick={() => setSelectedDest(null)}>
                      <div className="w-12 h-1.5 bg-white/50 backdrop-blur-md rounded-full shadow-sm"></div>
                    </div>

                    <div className="h-[35%] w-full relative shrink-0">
                      <img src={selectedDest.img} alt={selectedDest.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    </div>

                    <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-2 pb-10 relative z-10 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 font-mono text-xs text-primary font-semibold uppercase">
                          <IoLocationOutline size={14} /> {selectedDest.category}
                        </div>
                        <div className="flex items-center gap-1 font-mono text-xs text-slate-500 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
                          <IoTimeOutline className="text-secondary" /> {selectedDest.openTime}
                        </div>
                      </div>
                      
                      <h3 className="font-javamango text-4xl text-accent tracking-[2px] leading-none">
                        {selectedDest.name}
                      </h3>
                      
                      <p className="font-playfair-display text-base text-slate-800 leading-snug font-semibold mt-1">
                        {selectedDest.desc}
                      </p>

                      <div className="w-8 h-[2px] bg-secondary my-2"></div>

                      <p className="font-mono text-sm text-slate-600 leading-relaxed text-justify">
                        {selectedDest.content}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
      }
    </>
  );
}