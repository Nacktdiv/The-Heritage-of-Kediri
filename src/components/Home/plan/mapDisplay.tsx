import React from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%', borderRadius: '24px' };

export default function MapDisplay({ directions } : any) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  return isLoaded ? (
    <div className="h-64 lg:h-full w-full shadow-lg">
      <GoogleMap mapContainerStyle={containerStyle} center={{ lat: -7.817, lng: 112.000 }} zoom={12}>
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  ) : (
    <div className="h-64 flex items-center justify-center bg-slate-100 rounded-3xl font-mono text-primary">Loading Map...</div>
  );
}