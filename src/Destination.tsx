import { useState, useEffect, useRef, useContext } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  IoSearch, 
  IoFilter, 
  IoCartOutline,
} from 'react-icons/io5';

import { MainContext } from './context';
import type { DestinationType } from './context';

import Header from './components/All/header';
import LoadingScreen from './components/All/loadingScreen';
import Sidebar from './components/Destination/sidebarDesktop';
import Modal from './components/Destination/modalMobile';
import Cart from './components/Destination/cart';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Landmark', 'Nature', 'Culture', 'Culinary'];

export default function Destination() {
  const { destinationData, destinationCart, setDestinationCart } = useContext(MainContext)!

  const [isLoading, setIsLoading] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDest, setSelectedDest] = useState<DestinationType | null>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  
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

  const addToCart = (id: String) => {
      if (!destinationCart.includes(id)) {
      setDestinationCart([...destinationCart, id]);
      }
  };

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

            <div className="gsap-filter-bar flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 my-6 z-10 shrink-0">
              <div className="flex flex-col">
                <h2 className="font-playfair-display text-4xl md:text-5xl text-accent font-bold">Destinations</h2>
                <p className="font-mono text-sm text-slate-500 mt-1">Discover the hidden gems of Kediri.</p>
              </div>

              <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 items-center">
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
                
                <div className="flex gap-2 w-full sm:w-auto overflow-hidden">
                  <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar flex-1">
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

                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex items-center justify-center w-[38px] h-[38px] md:w-10 md:h-10 rounded-full bg-accent text-white shadow-md hover:bg-secondary transition-colors shrink-0"
                  >
                    <IoCartOutline size={20} />
                    {destinationCart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary font-mono text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-background">
                        {destinationCart.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

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

              <Sidebar selectedDest={selectedDest} setSelectedDest={setSelectedDest} addToCart={addToCart} />
              
            </div>

            <Modal selectedDest={selectedDest} setSelectedDest={setSelectedDest} addToCart={addToCart}/>

            <Cart 
              destinationData={destinationData} 
              destinationCart={destinationCart} 
              setDestinationCart={setDestinationCart} 
              isCartOpen={isCartOpen} 
              setIsCartOpen={setIsCartOpen}
            />
            
          </div>
      }
    </>
  );
}