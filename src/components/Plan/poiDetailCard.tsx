import { useRef } from 'react';
import { Star, Plus, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface PoiDetailCardProps {
  place: any;
  onClose: () => void;
  onAdd: (place: any) => void;
  currentDay: number;
  isScheduled: boolean;
}

export default function PoiDetailCard({ place, onClose, onAdd, currentDay, isScheduled }: PoiDetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(cardRef.current, 
      { y: 30, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
    );
  }, []);

  return (
    <div ref={cardRef} className="absolute bottom-6 right-6 left-6 md:left-auto md:w-[320px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl z-30 p-4 border border-white/40 flex flex-col gap-2">
      <button onClick={onClose} className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 p-1.5 rounded-full z-10 transition-colors">
        <X size={14} />
      </button>
      <img src={place.img} alt={place.name} className="w-full h-32 object-cover rounded-2xl shadow-sm" />
      <div className="flex flex-col mt-1">
        <span className="font-mono text-[9px] uppercase text-secondary tracking-widest">{place.category}</span>
        <h3 className="font-playfair-display font-bold text-accent text-lg leading-tight mt-1">{place.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-yellow-500 font-mono text-xs">
          <Star size={12} fill="currentColor" /> <span>{place.rating || '4.5'}</span>
        </div>
        <p className="font-mono text-[10px] text-slate-500 mt-2 leading-relaxed text-justify line-clamp-3">{place.desc}</p>
      </div>
      {!isScheduled && (
        <button 
          onClick={() => onAdd(place)} 
          className="w-full py-2.5 bg-primary hover:opacity-90 text-white font-mono text-xs font-bold rounded-xl flex items-center justify-center gap-1 mt-2 shadow-md transition-all"
        >
          <Plus size={14} /> Masukkan ke Hari {currentDay}
        </button>
      )}
    </div>
  );
}