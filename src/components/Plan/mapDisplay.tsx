import { GoogleMap, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import { Compass } from 'lucide-react';

interface MapDisplayProps {
  isLoaded: boolean;
  userLocation: { lat: number; lng: number } | null;
  directions: google.maps.DirectionsResult | null;
  itinerary: any[];
  onMapLoad: (data : any) => void
}

export default function MapDisplay({ isLoaded, userLocation, directions, itinerary, onMapLoad }: MapDisplayProps) {
  if (!isLoaded) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-background text-primary gap-3">
        <Compass className="w-10 h-10 animate-spin opacity-50" />
        <span className="font-mono text-xs uppercase tracking-widest">Memuat Peta...</span>
      </div>
    );
  }

  return (
    <GoogleMap
      onLoad={onMapLoad}
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={userLocation || { lat: -7.817, lng: 112.000 }}
      zoom={13}
      options={{ 
        disableDefaultUI: true, 
        zoomControl: true,
        styles: [
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
        ]
      }}
    >
      {directions && (
        <DirectionsRenderer 
          directions={directions} 
          options={{
            polylineOptions: { strokeColor: '#var(--primary)', strokeWeight: 4, strokeOpacity: 0.8 } // Menyesuaikan warna garis
          }} 
        />
      )}
      {itinerary.map((dest, idx) => (
        <MarkerF 
          key={dest.uniqueId || dest.id} 
          position={{ lat: dest.lat, lng: dest.lng }} 
          label={{ text: (idx + 1).toString(), color: 'white', fontSize: '12px', fontWeight: 'bold' }} 
        />
      ))}
    </GoogleMap>
  );
}