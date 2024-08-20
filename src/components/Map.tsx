// import React, { useEffect, useRef } from 'react';

// //Declare the interface of the props
// interface MapProps {
//   center: google.maps.LatLngLiteral;
//   zoom: number;
//   markerPosition?: google.maps.LatLngLiteral;
// }

// //Create a variable to hold the style of the map container (can this be moved to a style sheet?)
// const mapContainerStyle = {
//   height: "300px",
//   width: "90%"
// };

// //Pass in the center, zoom, and markerPosition props
// const Map: React.FC<MapProps> = ({ center, zoom, markerPosition }) => {
//   const mapRef = useRef<HTMLDivElement>(null);

//   //Use the useEffect hook to load the Google Maps API and initialize the map
//   useEffect(() => {
//     const loadGoogleMapsApi = () => {
//       if (!window.google) {
//         const script = document.createElement('script');
//         script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_KEY}&libraries=places`;
//         script.async = true;
//         script.onload = () => {
//           initializeMap();  // Initialize the map only after the script has loaded
//         };
//         script.onerror = (error) => {
//           console.error("Error loading Google Maps API:", error);
//         };
//         document.head.appendChild(script);
//       } else {
//         initializeMap();
//       }
//     };

//     //Initialize the map
//     const initializeMap = () => {
//       if (mapRef.current) {
//         const map = new google.maps.Map(mapRef.current, {
//           center,
//           zoom,
//         });

//         if (markerPosition) {
//           new google.maps.Marker({
//             map,
//             position: markerPosition,
//           });
//         }
//       } else {
//         console.error("Google Maps API not loaded.");
//       }
//     };

//     loadGoogleMapsApi();
//   }, [center, zoom, markerPosition]);

//   return (
//   <div ref={mapRef} style={mapContainerStyle} />
//   );
// };

// export default Map;

import React, { useEffect, useRef } from 'react';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

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
    if (typeof google !== 'undefined' && mapRef.current) {
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
    } else {
      console.error("Google Maps API not loaded.");
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
    <div ref={mapRef} style={mapContainerStyle} />
  );
};

export default Map;