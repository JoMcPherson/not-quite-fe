import React, { useEffect, useRef, useState } from 'react';
import "../styles/map.css";

export interface MapProps {
  center: google.maps.LatLngLiteral; 
  zoom: number; 
  markerPosition?: google.maps.LatLngLiteral; 
}

const Map: React.FC<MapProps> = ({ center, zoom, markerPosition })  => {
  const mapRef = useRef(null);
  const [map, setMap] = useState<google.maps.Map | null>(null); // Track the map instance

  const apiKey = import.meta.env.VITE_API_KEY as string;

  const loadGoogleMapsApiAsync = (apiKey: string) => {
    return new Promise<void>((resolve, reject) => {
      if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=quarterly&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  };

  const initializeMap = () => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
      setMap(newMap);

      if (markerPosition) {
        const marker =  new google.maps.Marker({
          map: newMap,
          position: markerPosition,
        });
      }
    }
  };

  const loadGoogleMapsApi = async () => {
    try {
      await loadGoogleMapsApiAsync(apiKey);
      initializeMap();
    } catch (error) {
    }
  };

  useEffect(() => {
    const initMap = async () => {
      try {
        await loadGoogleMapsApi();
        initializeMap();
      } catch (error) {
      }
    };

    initMap();
  }, [center, zoom, markerPosition]);

  return (
    <div ref={mapRef} className="mapContainer" />
  );
};

export default Map;