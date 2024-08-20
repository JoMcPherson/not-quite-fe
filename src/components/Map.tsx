import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  markerPosition?: google.maps.LatLngLiteral;
}

const mapContainerStyle = {
  height: "400px",
  width: "90%"
};

const Map: React.FC<MapProps> = ({ center, zoom, markerPosition }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API
    const loadGoogleMapsApi = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
        script.onload = initializeMap;
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
        });

        if (markerPosition) {
          new google.maps.Marker({
            map,
            position: markerPosition,
          });
        }
      }
    };

    loadGoogleMapsApi();
  }, [center, zoom, markerPosition]);

  return (<div ref={mapRef} style={mapContainerStyle} />)
};

export default Map;
