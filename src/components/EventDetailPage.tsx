import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../interfaces/Event";
import "../App.css";
import {
  attendEvent,
  checkAttendance,
  deleteEvent,
  withdrawEvent,
  fetchHostedBy,
} from "../api/apiCalls";
import { fetchAuthSession } from "@aws-amplify/auth";
import axios from "axios";
import Map from "./Map";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface EventDetailPageProps {
  events: Event[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ events }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const selectedEvent = events.find((event) => event.id === parseInt(eventId!));
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const eventCreator = selectedEvent?.cognitoUserId;

  const [hostedBy, setHostedBy] = useState("Loading...");
  const [isAttending, setIsAttending] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [showAttendees, setShowAttendees] = useState(false);
  const [showSpotsLeft, setShowSpotsLeft] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState<number>(0);

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.7749,
    lng: -122.4194,
  }); // Default to San Francisco
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral>({ lat: 37.7749, lng: -122.4194 }); // Default to San Francisco
  const [zoom] = useState(12);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        try {
          const event = events.find((e) => e.id === parseInt(eventId));
          setCurrentEvent(event || null);

          if (event) {
            const address = `${event.street}, ${event.city}, ${event.state} ${event.zip}`;
            try {
              const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                  params: {
                    address,
                    key: apiKey,
                  },
                }
              );
              if (response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;
                setMapCenter({ lat: location.lat, lng: location.lng });
                setMarkerPosition({ lat: location.lat, lng: location.lng });
              } else {
                console.error("No results found for address:", address);
              }
            } catch (error) {
              console.error("Error fetching geocode:", error);
            }

            const session = await fetchAuthSession();
            const cognitoUserId = session?.tokens?.idToken?.payload?.sub;
            setLoggedInUser(cognitoUserId || null);
            if (typeof cognitoUserId === "string") {
              const retrievedCreator = await fetchHostedBy(event.cognitoUserId);
              if (typeof retrievedCreator === "string") {
                setHostedBy(retrievedCreator);
              }
            }

            if (eventId && cognitoUserId) {
              const isUserAttending = await checkAttendance(
                eventId,
                cognitoUserId
              );
              setIsAttending(isUserAttending);
            }

            // Fetch initial attendees and calculate spots left
            fetchAttendees();
          }
        } catch (error) {
          console.error(
            "Error fetching event details or checking attendance:",
            error
          );
        }
      }
    };

    fetchEventData();
  }, [eventId, events, apiKey]);

  const handleAttendEvent = async () => {
    try {
      await attendEvent(eventId!);
      setIsAttending(true);
      setSpotsLeft(spotsLeft - 1); // Decrease spots left by 1
      fetchAttendees(); // Refresh attendees list
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  const handleWithdrawEvent = async () => {
    try {
      await withdrawEvent(eventId!);
      setIsAttending(false);
      setSpotsLeft(spotsLeft + 1); // Increase spots left by 1
      fetchAttendees(); // Refresh attendees list
    } catch (error) {
      console.error("Error withdrawing from event:", error);
    }
  };

  const fetchAttendees = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session?.tokens?.idToken;

      const response = await axios.get<string[]>(
        `${API_BASE_URL}/event_attendees/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendees(response.data);
      setSpotsLeft(selectedEvent!.maxAttendees - response.data.length); // Calculate spots left
      setShowSpotsLeft(true);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  const handleFetchAttendees = () => {
    setShowAttendees(!showAttendees);
    fetchAttendees();
  };

  useEffect(() => {
    fetchAttendees();
  }, [showAttendees, eventId]);

  if (!selectedEvent) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
      <div className="flex justify-center py-8 px-4">
        <div className="w-full">
          <h1 className="text-3xl font-extrabold text-center mb-4">
            {`${selectedEvent.street}, ${selectedEvent.city}, ${selectedEvent.state} ${selectedEvent.zip}`}
          </h1>
          <div className="flex justify-center pb-8">
            <Map
              center={mapCenter}
              zoom={zoom}
              markerPosition={markerPosition}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-4/5 mx-auto h-[500px]">
            {" "}
            {/* Fixed height added here */}
            <div className="flex flex-col items-start ml-3 w-4/6">
              <img
                className="mt-10 ml-9 md:w-10/12 md:h-auto rounded-t-lg md:rounded-l-lg"
                src={selectedEvent.image}
                alt={selectedEvent.title}
              />
              <div className="min-h-40">
                {showAttendees && (
                  <div className="mt-4 ml-10 text-left overflow-auto max-h-32 min-w-96">
                    <h3 className="text-xl font-bold mb-2">Attendees:</h3>
                    {attendees.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {attendees.map((username, index) => (
                          <li key={index}>{username}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No attendees yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col mr-12 justify-between p-6 leading-normal w-full md:w-1/2 text-center">
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {`${selectedEvent.title}`}
              </h5>
              {showSpotsLeft ? (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <u>{spotsLeft} spot(s) left!</u>
                </p>
              ) : (
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Loading ...
                </p>
              )}
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                The event{" "}
                {selectedEvent.cancelled ? "is cancelled" : "is still on!"}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Time of Event: </b>
                {new Date(selectedEvent.date).toLocaleString()}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Hosted By: </b>
                {hostedBy || "Loading..."}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Description: </b>
                {selectedEvent.description}
              </p>
              <div className="flex justify-center">
                {loggedInUser !== eventCreator && (
                  <>
                    {isAttending ? (
                      <button
                        onClick={handleWithdrawEvent}
                        className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-[#ff0000] hover:bg-[#ff4d4d] focus:ring-[#ff6666] dark:bg-[#e60000] dark:hover:bg-[#ff3333] dark:focus:ring-[#ff4d4d] rounded-lg focus:outline-none"
                      >
                        Withdraw
                        <svg
                          className="rtl:rotate-180 w-4 h-4 ms-2"
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
                      spotsLeft > 0 && (
                        <button
                          onClick={handleAttendEvent}
                          className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-lg focus:outline-none"
                        >
                          Sign up
                          <svg
                            className="rtl:rotate-180 w-4 h-4 ms-2"
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
                      )
                    )}
                  </>
                )}
                {loggedInUser === eventCreator && (
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
                )}
              </div>

              <div className="flex justify-center mt-4">
                <button
                  onClick={handleFetchAttendees}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                >
                  {showAttendees ? "Hide Attendees" : "See Attendees"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
