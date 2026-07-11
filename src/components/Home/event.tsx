import { useState, useEffect, useRef, useContext } from 'react';
import { IoArrowForwardOutline, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router';

import { MainContext } from '../../context';

import background from '../../assets/event-bg.webp'

gsap.registerPlugin(ScrollTrigger);

type EventType = {
  onActiveSection : (data : string) => void
}

export default function Event({onActiveSection} : EventType) {
  const { eventData } = useContext(MainContext)!

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = eventData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % eventData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? eventData.length - 1 : prev - 1));
  };

  const progressWidth = `${((currentIndex + 1) / eventData.length) * 100}%`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 25%',
          end: 'center top',
          toggleActions: 'play reverse play reverse',
          onEnter: () => onActiveSection('event'),
          onEnterBack : () => onActiveSection('event')
        }
      });

      tl.to('.gsap-heading', { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
        .to('.gsap-card', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5")
        .to('.gsap-nav', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} id='event' className="child-section relative w-full bg-background px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh overflow-hidden flex flex-col justify-center">
      
      <div className="absolute inset-0 z-0 py-25 ">
        <img 
          src={background} 
          alt="Nature Background" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16 pt-8 lg:pt-0">

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
          <h2 className="gsap-heading opacity-0 -translate-x-10 font-playfair-display text-3xl md:text-5xl lg:text-6xl text-white tracking-[0.2em] uppercase font-light">
            Acara spesial
          </h2>
          <h3 className="gsap-heading opacity-0 -translate-x-10 font-javamango text-2xl md:text-3xl lg:text-5xl text-white font-bold tracking-[0.1em] mt-1 lg:mt-3 drop-shadow-md">
            DI KOTA KITA
          </h3>

          <div className="gsap-nav opacity-0 translate-y-5 hidden lg:flex flex-col w-full mt-10 lg:mt-16">
            <div className="w-64 mb-8">
              <div className="h-[2px] bg-white/30 w-full relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out" 
                  style={{ width: progressWidth }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handlePrev} 
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-accent backdrop-blur-sm transition-colors duration-300"
              >
                <IoChevronBack size={20} />
              </button>
              <button 
                onClick={handleNext} 
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-accent backdrop-blur-sm transition-colors duration-300"
              >
                <IoChevronForward size={20} />
              </button>
            </div>
          </div>

          <button className='relative h-15 mt-10 lg:mt-16 py-2 px-4 font-playfair-display text-base md:text-xl text-white rounded-full border border-white hover:bg-white hover:text-accent backdrop-blur-sm transition-colors duration-300'>
            <Link to='/event' className='inset-0 absolute'></Link>
            Search more Event
          </button>
        </div>

        <div className="w-full sm:w-[85%] lg:w-1/2 h-full flex flex-col items-center justify-center order-2">
          
          <div className="gsap-card opacity-0 translate-y-12 w-full max-w-lg bg-white shadow-2xl flex flex-col transition-all duration-500">
            <div className="w-full h-56 md:h-72 lg:h-[350px] relative p-3 lg:p-5 pb-0 bg-white">
              <img 
                src={currentEvent.img} 
                alt={currentEvent.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6 lg:p-10 flex flex-col gap-3 lg:gap-4 bg-white">
              <h4 className="font-playfair-display text-2xl lg:text-3xl text-accent font-semibold">
                {currentEvent.name}
              </h4>
              <p className="font-mono text-sm lg:text-base text-gray-700 leading-relaxed line-clamp-3">
                {currentEvent.desc}
              </p>
              <button className="group flex relative items-center gap-4 text-sm font-playfair-display text-primary mt-2 lg:mt-4 hover:text-secondary transition-colors duration-300 w-fit">
                <Link to={`/event/${currentEvent.id}`} className='absolute inset-0'></Link>
                More informations 
                <IoArrowForwardOutline className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>

        <div className="gsap-nav opacity-0 translate-y-5 w-full flex lg:hidden items-center justify-between gap-4 mt-auto order-3 pb-4">
          <button 
            onClick={handlePrev} 
            className="w-11 h-11 rounded-full border border-white/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors flex-shrink-0"
          >
            <IoChevronBack size={18} />
          </button>
          
          <div className="h-[2px] bg-white/30 flex-1 relative mx-2">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-out" 
              style={{ width: progressWidth }}
            ></div>
          </div>
          
          <button 
            onClick={handleNext} 
            className="w-11 h-11 rounded-full border border-white/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors flex-shrink-0"
          >
            <IoChevronForward size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}