import React, { useContext, useState, useEffect } from 'react';
import { MainContext } from './context'; 
import type { DestinationType } from './context'
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, MapPin, Leaf, Navigation } from 'lucide-react';
import MapDisplay from './components/Home/plan/mapDisplay';

// Interface untuk Props Sortable
interface SortableItemProps {
  dest: DestinationType;
  onRemove: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ dest, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: dest.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}
         className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between shadow-sm hover:border-primary transition-all">
      <div className="flex items-center gap-3"><MapPin className="text-secondary" size={20} /> <span className="font-playfair-display font-bold text-accent">{dest.name}</span></div>
      <button onClick={() => onRemove(dest.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
    </div>
  );
};

export default function TripPlanner() {
  const { destinationData, destinationCart, setDestinationCart } = useContext(MainContext)!;
  const [items, setItems] = useState<DestinationType[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [carbon, setCarbon] = useState<string>("0");

  useEffect(() => {
    setItems(destinationData.filter(d => destinationCart.includes(d.id)));
  }, [destinationCart, destinationData]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const calculateRoute = async () => {
    // Memastikan google maps dimuat
    if (!window.google) return;

    const DirectionsService = new window.google.maps.DirectionsService();
    
    // Mendapatkan lokasi user
    const pos: GeolocationPosition = await new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
    const origin = `${pos.coords.latitude},${pos.coords.longitude}`;
    
    DirectionsService.route({
      origin,
      destination: { lat: items[items.length - 1].lat, lng: items[items.length - 1].lng },
      waypoints: items.slice(0, -1).map(i => ({ location: { lat: i.lat, lng: i.lng }, stopover: true })),
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === 'OK' && result) {
        setDirections(result);
        const distanceKm = result.routes[0].legs.reduce((acc, leg) => acc + (leg.distance?.value || 0), 0) / 1000;
        setCarbon((distanceKm * 0.12).toFixed(2));
      }
    });
  };

  return (
    <div className="w-full h-svh bg-background px-4 md:px-8 lg:px-34 py-25 lg:py-10 flex flex-col lg:flex-row gap-8 overflow-y-auto">
      <div className="flex-1 space-y-6">
        <h1 className="font-javamango text-4xl text-accent">Trip Planner</h1>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map(dest => <SortableItem key={dest.id} dest={dest} onRemove={(id) => setDestinationCart(destinationCart.filter(c => c !== id))} />)}
          </SortableContext>
        </DndContext>
      </div>

      <div className="lg:w-1/3 space-y-6">
        <div className="bg-accent text-white p-6 rounded-3xl">
          <h3 className="font-mono text-sm uppercase mb-2">Estimated Carbon</h3>
          <div className="flex items-center gap-2"><Leaf className="text-secondary" /> <span className="text-3xl font-bold">{carbon} kg CO2e</span></div>
          <button onClick={calculateRoute} className="mt-4 w-full py-3 bg-secondary text-accent font-bold rounded-xl flex items-center justify-center gap-2">
            <Navigation size={18} /> Calculate Route
          </button>
        </div>
        <MapDisplay directions={directions} />
      </div>
    </div>
  );
}