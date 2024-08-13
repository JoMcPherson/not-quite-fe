import React from "react";
import { useParams } from "react-router-dom";
import { Event } from "../interfaces/Event";

interface EventDetailPageProps {
  events: Event[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ events }) => {
  const { eventId } = useParams<{ eventId: string }>();
  const selectedEvent = events.find((event) => event.id === parseInt(eventId!));

  if (!selectedEvent) {
    return <div>Event not found.</div>;
  }

  //replace with events number from axios call of event attendees
  const spotsLeft = selectedEvent.maxAttendees - 5;

  return (
    <div className="flex justify-center py-8 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          {selectedEvent.title}
        </h1>
        <div
          className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <img
            className="object-cover w-full md:w-1/2 h-96 md:h-auto rounded-t-lg md:rounded-l-lg"
            src={selectedEvent.image}
            alt={selectedEvent.title}
          />
          <div className="flex flex-col justify-between p-6 leading-normal w-full md:w-1/2 text-center">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {selectedEvent.location}
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
              <a
                href="#"
                className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
              </a>
            </div>
            <div className="flex justify-center">
              <a
                href={`/edit/${eventId}`}
                className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-pink-500 rounded-lg hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
              >
                Edit Event
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
