// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Event } from "../interfaces/Event";
// import axios from "axios";
// import "../App.css";
// import { fetchAuthSession } from "aws-amplify/auth";
// import Map from "./Map"; // Import the Map component

// interface EventDetailPageProps {
//   user: any;
//   events: Event[];
// }

// const EventDetailPage: React.FC<EventDetailPageProps> = ({ user, events }) => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const selectedEvent = events.find((event) => event.id === parseInt(eventId!));
//   const eventCreator = selectedEvent?.cognitoUserId;

//   const [isAttending, setIsAttending] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
//   // const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(null);
//   // const [mapZoom] = useState(10); 

//   const center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // San Francisco
//   const zoom = 12;
//   const markerPosition: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };


//   useEffect(() => {
//     const fetchTokenAndCheckAttendance = async () => {
//       try {
//         const session = await fetchAuthSession();
//         const idToken = session?.tokens?.idToken;
//         const cognitoUserId = idToken?.payload?.sub;
//         setLoggedInUser(cognitoUserId || null);

//         if (eventId && cognitoUserId) {
//           const response = await axios.get<boolean>(
//             `http://localhost:8080/event_attendees/check/${eventId}/user/${cognitoUserId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${idToken}`,
//               },
//             }
//           );
//           setIsAttending(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching auth session or checking attendance:', error);
//       }
//     };

    // const fetchCoordinates = async () => {
    //   if (selectedEvent) {
    //     const address = `${selectedEvent.city}, ${selectedEvent.state}`;
    //     try {
    //       const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    //         params: {
    //           address,
    //           key: apiKey
    //         }
    //       });
    //       if (response.data.results.length > 0) {
    //         const location = response.data.results[0].geometry.location;
    //         setMapCenter({ lat: location.lat, lng: location.lng });
    //       } else {
    //         console.error("No results found for address:", address);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching geocode:", error);
    //     }
    //   }
    // };

  //   fetchTokenAndCheckAttendance();
  //   fetchCoordinates();
  // }, [eventId, selectedEvent, user, apiKey]);

  // const attendEvent = async () => {
  //   const session = await fetchAuthSession();
  //   const token = session?.tokens?.idToken;
  //   try {
  //     await axios.post(
  //       `http://localhost:8080/event_attendees/${eventId}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setIsAttending(true);
  //   } catch (error) {
  //     console.error("Error attending event:", error);
  //   }
  // };

  // const withdrawEvent = async () => {
  //   const session = await fetchAuthSession();
  //   const token = session?.tokens?.idToken;
  //   try {
  //     await axios.delete(
  //       `http://localhost:8080/event_attendees/events/${eventId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setIsAttending(false);
  //   } catch (error) {
  //     console.error("Error withdrawing from event:", error);
  //   }
  // };

  // if (!selectedEvent) {
  //   return <div>Event not found.</div>;
  // }

  // const spotsLeft = selectedEvent.maxAttendees - 5;

  // const deleteEvent = async (id: number) => {
  //   const session = await fetchAuthSession();
  //   const token = session?.tokens?.idToken;
  //   try {
  //     await axios.delete(`http://localhost:8080/events/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Event deleted");
  //   } catch (error) {
  //     console.error("Error deleting event:", error);
  //   }
  // };

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../interfaces/Event";
import axios from "axios";
import "../App.css";
import { fetchAuthSession } from "aws-amplify/auth";
import Map from "./Map"; 

interface EventDetailPageProps {
  user: any;
  events: Event[];
}

// const EventDetailPage: React.FC<EventDetailPageProps> = ({ user, events }) => {
//   const { eventId } = useParams<{ eventId: string }>();
//   const selectedEvent = events.find((event) => event.id === parseInt(eventId!));
//   const eventCreator = selectedEvent?.cognitoUserId;
//   console.log("Selected Event", selectedEvent);

//   const [isAttending, setIsAttending] = useState(false);

//   const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

//   const center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // San Francisco
//   const zoom = 12;
//   const markerPosition: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };



  
//   const apiKey = import.meta.env.VITE_API_KEY;
  
//   // Example center coordinates; adjust as needed
//   // const defaultCenter = '40.7128,-74.0060'; // Default to New York City
//   // const zoom = 10; // Adjust zoom for a good view at small size
//   // const size = '100x100'; // Very small square size
//   // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(defaultCenter)}&zoom=${zoom}&size=${size}&key=${apiKey}`;
  

//   useEffect(() => {
//     const fetchTokenAndCheckAttendance = async () => {
//       try {
//         const session = await fetchAuthSession();
//         const idToken = session?.tokens?.idToken;
//         const cognitoUserId = idToken?.payload?.sub;
//         setLoggedInUser(cognitoUserId || null);

//         if (eventId && cognitoUserId) {
//           const response = await axios.get<boolean>(
//             `http://localhost:8080/event_attendees/check/${eventId}/user/${cognitoUserId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${idToken}`,
//               },
//             }
//           );
//           setIsAttending(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching auth session or checking attendance:', error);
//       }
//     };

//     fetchTokenAndCheckAttendance();
//   }, [eventId, user]);

//   const attendEvent = async () => {
//     const session = await fetchAuthSession();
//     const token = session?.tokens?.idToken;
//     try {
//       await axios.post(
//         `http://localhost:8080/event_attendees/${eventId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setIsAttending(true);
//     } catch (error) {
//       console.error("Error attending event:", error);
//     }
//   };

//   const withdrawEvent = async () => {
//     const session = await fetchAuthSession();
//     const token = session?.tokens?.idToken;
//     try {
//       await axios.delete(
//         `http://localhost:8080/event_attendees/events/${eventId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setIsAttending(false);
//     } catch (error) {
//       console.error("Error withdrawing from event:", error);
//     }
//   };

//   if (!selectedEvent) {
//     return <div>Event not found.</div>;
//   }

//   const spotsLeft = selectedEvent.maxAttendees - 5;

//   const deleteEvent = async (id: number) => {
//     const session = await fetchAuthSession();
//     const token = session?.tokens?.idToken;
//     try {
//       await axios.delete(`http://localhost:8080/events/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("Event deleted");
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

const EventDetailPage: React.FC<EventDetailPageProps> = ({ user, events }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const selectedEvent = events.find((event) => event.id === parseInt(eventId!));
  const eventCreator = selectedEvent?.cognitoUserId;

  const [isAttending, setIsAttending] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  // State for map coordinates
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [zoom] = useState(12); // Set a default zoom level

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTokenAndCheckAttendance = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken;
        const cognitoUserId = idToken?.payload?.sub;
        setLoggedInUser(cognitoUserId || null);

        if (eventId && cognitoUserId) {
          const response = await axios.get<boolean>(
            `http://localhost:8080/event_attendees/check/${eventId}/user/${cognitoUserId}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          setIsAttending(response.data);
        }
      } catch (error) {
        console.error('Error fetching auth session or checking attendance:', error);
      }
    };

    const fetchCoordinates = async () => {
      if (selectedEvent) {
        const address = `2237 Decatur Road, Wilmington, Delaware 19801`;
        console.log("Address", address);
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
              address,
              key: apiKey
            }
          });
          if (response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            console.log("Location", location);
            setMapCenter({ lat: location.lat, lng: location.lng });
            setMarkerPosition({ lat: location.lat, lng: location.lng });
          } else {
            console.error("No results found for address:", address);
          }
        } catch (error) {
          console.error("Error fetching geocode:", error);
        }
      }
    };

    fetchTokenAndCheckAttendance();
    fetchCoordinates();
  }, [eventId, selectedEvent, apiKey]);

  const attendEvent = async () => {
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;
    try {
      await axios.post(
        `http://localhost:8080/event_attendees/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAttending(true);
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  const withdrawEvent = async () => {
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;
    try {
      await axios.delete(
        `http://localhost:8080/event_attendees/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAttending(false);
    } catch (error) {
      console.error("Error withdrawing from event:", error);
    }
  };

  if (!selectedEvent) {
    return <div>Event not found.</div>;
  }

  const spotsLeft = selectedEvent.maxAttendees - 5;

  const deleteEvent = async (id: number) => {
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;
    try {
      await axios.delete(`http://localhost:8080/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Event deleted");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
      <div className="flex justify-center py-8 px-4">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-4">
            {selectedEvent.title}
          </h1>
          <div className="flex justify-center pb-8">
              <Map
                center={mapCenter}
                zoom={zoom}
                markerPosition={markerPosition}
              />
            {/* <Map 
                center={{ lat: selectedEvent.latitude, lng: selectedEvent.longitude }} 
                zoom={10} 
              /> */}
            {/* <img
              src={mapUrl}
              alt="Map"
              style={{ width: '300px', height: '300px', border: '1px solid #ddd' }} // Styling to ensure the map appears square and small
            /> */}
          </div>   
          <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-4/5 mx-auto">
            <img
              className="object-cover w-full md:w-1/2 h-96 md:h-auto rounded-t-lg md:rounded-l-lg"
              src={selectedEvent.image}
              alt={selectedEvent.title}
            />
            <div className="flex flex-col justify-between p-6 leading-normal w-full md:w-1/2 text-center">
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {`${selectedEvent.street}, ${selectedEvent.city}, ${selectedEvent.state} ${selectedEvent.zip}`}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {spotsLeft} spots left
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Timing: </b>
                {new Date(selectedEvent.date).toLocaleString()}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Hosted By: </b>
                {selectedEvent.cognitoUserId || "Unknown Host"}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Description: </b>
                {selectedEvent.description}
              </p>
              <div className="flex justify-center">
                { loggedInUser !== eventCreator ? (
                <button
                  onClick={isAttending ? withdrawEvent : attendEvent}
                  className={`inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white ${
                    isAttending
                      ? "bg-[#ff0000] hover:bg-[#ff4d4d] focus:ring-[#ff6666] dark:bg-[#e60000] dark:hover:bg-[#ff3333] dark:focus:ring-[#ff4d4d]"
                      : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  } rounded-lg focus:outline-none`}
                >
                  {isAttending ? "Withdraw" : "Sign up"}
                  <svg
                    className={`rtl:rotate-180 w-4 h-4 ms-2 ${
                      isAttending ? "" : "transform rotate-0"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              ) : (
              loggedInUser === eventCreator && (
              <div className="flex justify-center mt-4 space-x-2">
                <a
                  href={`/edit/${eventId}`}
                  className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                  Edit Event
                </a>
                <button
                  onClick={() => deleteEvent(selectedEvent.id)}
                  className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                >
                  Delete Event
                </button>
              </div>
              )
             )} 
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
