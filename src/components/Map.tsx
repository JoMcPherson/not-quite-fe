import React from 'react';
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
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log('Loading Google Maps API with key:', apiKey);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
      >
        {markerPosition && <Marker position={markerPosition} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
