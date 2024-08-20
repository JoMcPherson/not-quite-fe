import React, { useEffect, useRef, useState } from 'react';
import "../styles/map.css";

//Define a interface for the props
export interface MapProps {
  center: google.maps.LatLngLiteral; 
  zoom: number; 
  markerPosition?: google.maps.LatLngLiteral; 
}

//Define the component (Input: Center, Zoom and MarkerPosition)
const Map: React.FC<MapProps> = ({ center, zoom, markerPosition })  => {
  //Creates a ref to hold DOM element
  const mapRef = useRef(null);
  const [map, setMap] = useState<google.maps.Map | null>(null); // Track the map instance

  //Gets the API variable
  const apiKey = import.meta.env.VITE_API_KEY as string;

  //Load the Google Maps API
  const loadGoogleMapsApiAsync = (apiKey: string) => {
    //Return promise
    return new Promise<void>((resolve, reject) => {
      //If the script is already added
      if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
        //resolve the promise
        resolve();
        return;
      }

      //Create a new script element
      const script = document.createElement('script');
      //Sets the script to inclde the API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=quarterly&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      //Adds the script to the document
      document.head.appendChild(script);
    });
  };

  //Function to inalize the map
  const initializeMap = () => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
      setMap(newMap);

      // Add marker if position is provided
      if (markerPosition) {
        new google.maps.marker.AdvancedMarkerElement({
          map: newMap,
          position: markerPosition,
        });
      }
    }
  };

  //Load and initialize the map
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