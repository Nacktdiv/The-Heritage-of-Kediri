import React, { useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { MainContext } from '../../../context'; 
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { IoArrowBackOutline, IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  console.log(id)
  const navigate = useNavigate();
  const { eventData } = useContext(MainContext)!
  
  // 12. Mencari data artikel yang sesuai dengan ID dari params
  const eventDetail = eventData.find((evt) => evt.id === id);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Animasi masuk (Fade in up)
  useGSAP(() => {
    if (eventDetail) {
      gsap.fromTo('.gsap-detail-elem', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
      );
    }
  }, { scope: containerRef, dependencies: [eventDetail] });

  // Handle jika ID tidak ditemukan
  if (!eventDetail) {
    return (
      <div className="w-full bg-background px-4 h-svh flex items-center justify-center font-mono text-accent">
        Article not found. <button onClick={() => navigate(-1)} className="ml-2 text-primary underline">Go back</button>
      </div>
    );
  }

  return (
    // Mempertahankan class template
    <div ref={containerRef} className="w-full bg-background px-4 md:px-8 lg:px-34 py-25 lg:py-10 h-svh flex flex-col overflow-hidden relative">
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => navigate(-1)}
        className="gsap-detail-elem shrink-0 flex items-center gap-2 text-primary hover:text-secondary font-mono text-sm mb-6 transition-colors w-fit"
      >
        <IoArrowBackOutline size={18} /> Back to Events
      </button>

      {/* Konten Artikel (Scrollable) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-20">
        
        {/* Hero Image Artikel */}
        <div className="gsap-detail-elem w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-lg mb-8 relative">
          <img 
            src={eventDetail.img} 
            alt={eventDetail.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Header Teks Artikel */}
        <div className="gsap-detail-elem flex flex-col gap-4 mb-10 max-w-4xl mx-auto text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 font-mono text-xs md:text-sm text-secondary font-semibold">
            <span className="flex items-center gap-1 bg-secondary/10 px-3 py-1.5 rounded-md"><IoCalendarOutline /> {eventDetail.time}</span>
            <span className="flex items-center gap-1 bg-secondary/10 px-3 py-1.5 rounded-md"><IoLocationOutline /> {eventDetail.location}</span>
          </div>
          
          <h1 className="font-javamango text-4xl md:text-5xl lg:text-7xl text-accent leading-tight tracking-[2px]">
            {eventDetail.name}
          </h1>
          
          <p className="font-playfair-display text-lg md:text-2xl text-slate-700 italic font-medium leading-relaxed">
            "{eventDetail.desc}"
          </p>
        </div>

        <div className="gsap-detail-elem w-16 h-1 bg-primary mx-auto mb-10 rounded-full"></div>

        {/* Isi Konten Artikel */}
        <div className="gsap-detail-elem max-w-4xl mx-auto">
          <p className="font-mono text-sm md:text-base text-slate-600 leading-[2em] md:leading-[2.2em] text-justify">
            {eventDetail.content}
          </p>
        </div>

      </div>
    </div>
  );
}