import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../interfaces/Event";
import "../App.css";
import {
  attendEvent,
  checkAttendance,
  deleteEvent,
  withdrawEvent,
} from "../api/apiCalls";
import { fetchAuthSession } from "@aws-amplify/auth";
import axios from "axios";

interface EventDetailPageProps {
  events: Event[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ events }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const selectedEvent = events.find((event) => event.id === parseInt(eventId!));
  const eventCreator = selectedEvent?.cognitoUserId;

  const [isAttending, setIsAttending] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [attendees, setAttendees] = useState<string[]>([]);
  const [showAttendees, setShowAttendees] = useState(false);

  useEffect(() => {
    const fetchTokenAndCheckAttendance = async () => {
      try {
        const session = await fetchAuthSession();
        const cognitoUserId = session?.tokens?.idToken?.payload?.sub;
        setLoggedInUser(cognitoUserId || null);

        if (eventId && cognitoUserId) {
          const isUserAttending = await checkAttendance(eventId, cognitoUserId);
          setIsAttending(isUserAttending);
        }
      } catch (error) {
        console.error(
          "Error fetching auth session or checking attendance:",
          error
        );
      }
    };

    fetchTokenAndCheckAttendance();
  }, [eventId]);

  const handleAttendEvent = async () => {
    try {
      await attendEvent(eventId!);
      setIsAttending(true);
    } catch (error) {
      console.error("Error attending event:", error);
    }
  };

  const handleWithdrawEvent = async () => {
    try {
      await withdrawEvent(eventId!);
      setIsAttending(false);
    } catch (error) {
      console.error("Error withdrawing from event:", error);
    }
  };

  const fetchAttendees = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session?.tokens?.idToken;

      const response = await axios.get<string[]>(
        `http://localhost:8080/event_attendees/events/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAttendees(response.data);
      setShowAttendees(!showAttendees);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  if (!selectedEvent) {
    return <div>Event not found.</div>;
  }

  const deleteEvent = async (id: number) => {
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;
    try {
      await deleteEvent(id);
      console.log("Event deleted");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!selectedEvent) {
    return <div>Event not found.</div>;
  }

  const spotsLeft = selectedEvent.maxAttendees - 5;

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto">
      <div className="flex justify-center py-8 px-4">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-4">
            {selectedEvent.title}
          </h1>
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
                {loggedInUser !== eventCreator ? (
                  <button
                    onClick={
                      isAttending ? handleWithdrawEvent : handleAttendEvent
                    }
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
              <div className="flex justify-center mt-4">
                <button
                  onClick={fetchAttendees}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700"
                >
                  {showAttendees ? "Hide Attendees" : "See Attendees"}
                </button>
              </div>
              {showAttendees && (
                <div className="mt-4 text-left">
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
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
