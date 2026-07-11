import { useContext, useState, useEffect, useRef } from 'react';
import { MainContext } from './context'; 
import type { DestinationType } from './context';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useJsApiLoader } from '@react-google-maps/api';
import { Leaf, Plus, Search, Compass, Share2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import SortableDestinationItem from './components/Plan/sortableDestinationItem';
import PoiDetailCard from './components/Plan/poiDetailCard';
import MapDisplay from './components/Plan/mapDisplay';
import LoadingScreen from './components/All/loadingScreen';
import Header from './components/All/header';

gsap.registerPlugin(ScrollTrigger);

export default function Plan() {
    const { destinationData, destinationCart } = useContext(MainContext)!;

    const [isLoading, setIsLoading] = useState(true)
    const [hasLoaded, setHasLoaded] = useState(false)

    const [itinerary, setItinerary] = useState<any[]>([]);
    const [carbonFootprint, setCarbonFootprint] = useState<string>("0.00");
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

    const [activeTab, setActiveTab] = useState<'saved' | 'search' | 'itinerary'>('saved');
    const [selectedPlace, setSelectedPlace] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [totalDays, setTotalDays] = useState<number>(2);

    const mapRef = useRef<google.maps.Map | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const onMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const focusToLocation = (lat: number, lng: number) => {
        if (mapRef.current) {
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(15); 
        }
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries: ['places']
    });

    const savedPlaces = destinationData.filter((d: DestinationType) => 
        destinationCart.includes(d.id) && !itinerary.some(it => it.id === d.id)
    );

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

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
        }
    }, []);

    useEffect(() => {
        if (itinerary.length > 1 && isLoaded) calculateLiveRoute();
        else { setDirections(null); setCarbonFootprint("0.00"); }
    }, [itinerary, isLoaded]);

    useGSAP(() => {
        if(!hasLoaded) return

        const ctx = gsap.context(() => {
            gsap.fromTo('.gsap-sidebar', 
                { x: -30, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: '.gsap-sidebar' }
            );
            gsap.fromTo('.gsap-map-container', 
                { scale: 0.98, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.4 }
            );
        }, containerRef);
        
        return () => ctx.revert();
    }, [hasLoaded]);

    const handleLiveSearch = () => {
        if (!searchQuery.trim() || !window.google) return;
        setIsSearching(true);
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        
        // Focus search around Kediri
        const kediriBounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(-7.9, 111.9),
        new window.google.maps.LatLng(-7.7, 112.1)
        );

        service.textSearch({ query: searchQuery, bounds: kediriBounds }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            setSearchResults(results.map(place => ({
            id: place.place_id || Math.random().toString(),
            name: place.name,
            category: place.types ? place.types[0].replace('_', ' ') : 'POI',
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
            desc: place.formatted_address || '',
            rating: place.rating || 0,
            img: place.photos ? place.photos[0].getUrl({ maxWidth: 400 }) : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
            })));
        } else setSearchResults([]);
        setIsSearching(false);
        });
    };

    const addToItinerary = (place: any) => {
        if (!window.google) return;
        
        setIsSearching(true); 

        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        
        const kediriBounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(-7.9, 111.9),
            new window.google.maps.LatLng(-7.7, 112.1)
        );

        service.textSearch({ 
            query: place.name, 
            bounds: kediriBounds 
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                const topMatch = results[0];
                
                const verifiedPlace = {
                    id: topMatch.place_id || place.id,
                    name: topMatch.name || place.name,
                    category: topMatch.types ? topMatch.types[0].replace('_', ' ') : place.category || 'POI',
                    lat: topMatch.geometry?.location?.lat() || place.lat,
                    lng: topMatch.geometry?.location?.lng() || place.lng,
                    desc: topMatch.formatted_address || place.desc || '',
                    rating: topMatch.rating || place.rating || 4.5,
                    img: topMatch.photos 
                    ? topMatch.photos[0].getUrl({ maxWidth: 400 }) 
                    : place.img || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
                };

                setItinerary(prevItinerary => [
                    ...prevItinerary, 
                    { ...verifiedPlace, day: currentDay, uniqueId: `${verifiedPlace.id}-${Date.now()}` }
                ]);

                focusToLocation(place.lat, place.lng);

                calculateLiveRoute();
                
            } else {
                console.warn(`Google Maps tidak menemukan "${place.name}". Menggunakan data cadangan.`);
                setItinerary(prevItinerary => [
                    ...prevItinerary, 
                    { ...place, day: currentDay, uniqueId: `${place.id}-${Date.now()}` }
                ]);
            }

            setSelectedPlace(null);
            setIsSearching(false);
        })
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
        setItinerary((items) => arrayMove(items, items.findIndex(i => (i.uniqueId || i.id) === active.id), items.findIndex(i => (i.uniqueId || i.id) === over.id)));
        }
    };

    const calculateLiveRoute = () => {
        if (!window.google || itinerary.length < 2) return;
        const DirectionsService = new window.google.maps.DirectionsService();
        const waypoints = itinerary.slice(1, -1).map(item => ({ location: { lat: item.lat, lng: item.lng }, stopover: true }));

        DirectionsService.route({
        origin: { lat: itinerary[0].lat, lng: itinerary[0].lng },
        destination: { lat: itinerary[itinerary.length - 1].lat, lng: itinerary[itinerary.length - 1].lng },
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING
        }, (result, status) => {
        if (status === 'OK' && result) {
            setDirections(result);
            const distanceKm = result.routes[0].legs.reduce((acc, leg) => acc + (leg.distance?.value || 0), 0) / 1000;
            setCarbonFootprint((distanceKm * 0.12).toFixed(2));
        }
        });
    };

  return (
    <>
        {hasLoaded && <Header hasLoaded={hasLoaded} isSectionMenu={false}/>}
        {!hasLoaded ? <LoadingScreen isLoading={isLoading} onCompleteLoad={() => setHasLoaded(true)} /> : 
            <div ref={containerRef} className="w-full bg-background px-4 md:px-8 lg:px-34 py-25 lg:py-10 lg:h-svh flex flex-col overflow-hidden relative">
            
                {/* Container Peta dan sidebar */}
                <div className="gsap-map-container w-full h-full flex flex-col gap-10 lg:gap-0 lg:flex-row relative lg:rounded-[2.5rem]  lg:overflow-hidden bg-background transition-all">
                    
                    {/* sidebar */}
                    <div className="gsap-sidebar lg:absolute lg:top-0 lg:left-0 lg:bottom-0 w-full h-200 lg:h-full md:w-[90%] md:self-center lg:w-[420px] rounded-3xl md:rounded-[2.5rem] lg:rounded-none bg-primary backdrop-blur-xl z-20 flex flex-col border-r border-slate-100 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.1)]">
                    
                        <div className="p-5 border-b border-slate-100 shrink-0">
                            <h1 className="font-javamango font-bold text-3xl text-accent tracking-widest">Smart Route</h1>
                            <p className="font-mono text-sm text-background mt-1">Rencanakan rute efisien Anda di Kediri.</p>
                        </div>

                        <div className="px-5 py-3 flex flex-col gap-3 shrink-0">
                            <div className="flex bg-slate-50 p-1 rounded-xl">
                                <button onClick={() => setActiveTab('saved')} className={`flex-1 py-1.5 text-xs rounded-lg font-mono font-bold transition-all ${activeTab === 'saved' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-accent'}`}>Saved</button>
                                <button onClick={() => setActiveTab('search')} className={`flex-1 py-1.5 text-xs rounded-lg font-mono font-bold transition-all ${activeTab === 'search' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-accent'}`}>Search Map</button>
                                <button onClick={() => setActiveTab('itinerary')} className={`flex-1 py-1.5 text-xs rounded-lg font-mono font-bold transition-all ${activeTab === 'itinerary' ? 'bg-primary text-white shadow-sm' : 'text-secondary hover:text-accent'}`}>Rute ({itinerary.length})</button>
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100">
                                <span className="font-mono text-sm uppercase text-secondary">Timeline:</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setTotalDays(prev => Math.min(prev - 1, 7))} className="w-5 h-5 rounded-md bg-secondary text-white font-bold flex items-center justify-center">-</button>
                                    <p className='text-sm'>{totalDays}</p>
                                    <button onClick={() => setTotalDays(prev => Math.min(prev + 1, 7))} className="w-5 h-5 rounded-md bg-secondary text-white font-bold flex items-center justify-center">+</button>
                                    <select value={currentDay} onChange={(e) => setCurrentDay(Number(e.target.value))} className="bg-transparent font-mono text-xs font-bold text-accent outline-none cursor-pointer">
                                    {Array.from({ length: totalDays }, (_, i) => <option key={i+1} value={i+1}>Hari {i+1}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 h-full overflow-y-auto px-5 pb-5 space-y-3 hide-scrollbar">
                            {/* tab saved */}
                            {activeTab === 'saved' && (
                            savedPlaces.length === 0 ? (
                                <div className="text-center p-6 text-background"><Compass size={30} className="mx-auto opacity-50 mb-2"/> <span className="font-mono ">Keranjang kosong.</span></div>
                            ) : (
                                savedPlaces.map(place => (
                                <div key={place.id} className="flex gap-3 items-center bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm">
                                    <img src={place.img} alt={place.name} className="w-12 h-12 object-cover rounded-xl" />
                                    <div className="flex-1 overflow-hidden">
                                        <h4 className="font-playfair-display font-bold text-accent text-sm truncate">{place.name}</h4>
                                        <span className="font-mono text-[9px] text-secondary uppercase tracking-wider">{place.category}</span>
                                    </div>
                                    <button onClick={() => addToItinerary(place)} className="p-1.5 bg-primary rounded-full text-white"><Plus size={14}/></button>
                                </div>
                                ))
                            )
                            )}
                            {/* tab search */}
                            {activeTab === 'search' && (
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={14} />
                                        <input type="text" placeholder="Cari di Maps..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLiveSearch()} className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:outline-none focus:border-primary shadow-sm" />
                                    </div>
                                    <button onClick={handleLiveSearch} className="px-3 bg-primary rounded-xl text-white font-mono text-xs font-bold shadow-sm">Cari</button>
                                </div>
                                {isSearching ? <div className="text-center py-6 font-mono text-xs text-background animate-pulse">Mencari...</div> : (
                                    searchResults.map(place => (
                                        <div key={place.id} className="flex gap-2 items-center bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm" onClick={() => setSelectedPlace(place)}>
                                            <div className="flex-1 overflow-hidden">
                                                <h4 className="font-playfair-display font-bold text-accent text-sm truncate">{place.name}</h4>
                                                <span className="font-mono text-[9px] text-secondary block truncate">{place.desc}</span>
                                            </div>
                                            <button onClick={(e) => { e.stopPropagation(); addToItinerary(place); }} className="p-1.5 bg-primary rounded-full text-white"><Plus size={14}/></button>
                                        </div>
                                    ))
                                )}
                            </div>
                            )}
                            {/* tab itinerary */}
                            {activeTab === 'itinerary' && (
                                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={itinerary.filter(i => i.day === currentDay).map(i => i.uniqueId || i.id)} strategy={verticalListSortingStrategy}>
                                        <div className="space-y-3">
                                            {itinerary.filter(i => i.day === currentDay).map((dest, idx) => (
                                                <SortableDestinationItem key={dest.uniqueId || dest.id} id={dest.uniqueId || dest.id} name={dest.name} category={dest.category} index={idx} onRemove={(id) => setItinerary(itinerary.filter(item => item.uniqueId !== id))} onView={() => setSelectedPlace(dest)} />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            )}
                        </div>

                        {/* carbonnn */}
                        <div className="p-5 bg-accent text-white shrink-0 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-mono flex items-center gap-1"><Leaf className="text-secondary" size={24} /> Emisi Karbon</span>
                                <span className="font-playfair-display text-xl text-background">{carbonFootprint} kg</span>
                            </div>
                            <button 
                                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=$${userLocation?.lat},${userLocation?.lng}&destination=${itinerary[itinerary.length - 1]?.lat},${itinerary[itinerary.length - 1]?.lng}&waypoints=${itinerary.slice(1, -1).map(i => `${i.lat},${i.lng}`).join('|')}&travelmode=driving`, '_blank')}
                                disabled={itinerary.length === 0} 
                                className="w-full py-3 bg-secondary text-white font-playfair-display tracking-widest text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all"
                            >
                                <Share2 size={14} /> Ekspor Navigasi
                            </button>
                        </div>
                    </div>

                    {/* katakan peta katakan peta lebih kerass PETAAAAA!!!*/}
                    <div className="w-full w-[90%] lg:w-full self-center aspect-2/4 h-200 lg:h-full relative z-10 bg-background block">
                        <MapDisplay isLoaded={isLoaded} userLocation={userLocation} directions={directions} itinerary={itinerary} onMapLoad={onMapLoad} />
                        {selectedPlace && (
                            <PoiDetailCard place={selectedPlace} onClose={() => setSelectedPlace(null)} onAdd={addToItinerary} currentDay={currentDay} isScheduled={itinerary.some(it => it.id === selectedPlace.id)} />
                        )}
                    </div>

                </div>

            </div>
        }
    </>
  );
}