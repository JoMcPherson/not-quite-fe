import React, { useEffect, useRef } from 'react';
import "../styles/map.css";


const Map = ({ center, zoom, markerPosition }) => {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_API_KEY as string;

  const loadGoogleMapsApiAsync = (apiKey: string) => {
    return new Promise<void>((resolve, reject) => {
      // Check if the script is already added
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
    if (typeof google === 'undefined') {
      return;
    }
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
      if (markerPosition) {
        new google.maps.marker.AdvancedMarkerElement({
          map,
          position: markerPosition,
        });
      }
    } else {
      console.error("mapRef is null.");
    }
  };

  const loadGoogleMapsApi = async () => {
    try {
      await loadGoogleMapsApiAsync(apiKey);
      initializeMap();
    } catch (error) {
      console.error("Failed to load Google Maps API", error);
    }
  };

  useEffect(() => {
    loadGoogleMapsApi();
  }, [center, zoom, markerPosition]);

  return (
    <div ref={mapRef} className="mapContainer" />
  );
};

export default Map;