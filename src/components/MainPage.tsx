import React, { useState } from "react";
import { Event } from "../interfaces/Event";

interface MainPageProps {
  events: Event[];
}

const MainPage: React.FC<MainPageProps> = ({ events }) => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    return (
      (selectedSport === "" || event.sport === selectedSport) &&
      (selectedLocation === "" || event.location === selectedLocation)
    );
  });

  const uniqueSports = Array.from(new Set(events.map((event) => event.sport)));
  const uniqueLocations = Array.from(
    new Set(events.map((event) => event.location))
  );

  return (
    <div className="main-page">
      <h1 className="text-center text-3xl font-bold my-8">Olympic Events</h1>

      <div className="filter-section mb-8 flex flex-wrap items-center">
        <label htmlFor="sport" className="mr-4">
          Filter by Sport:
        </label>
        <select
          name="sport"
          id="sport"
          value={selectedSport}
          onChange={handleSportChange}
          className="mr-8"
        >
          <option value="">All Sports</option>
          {uniqueSports.map((sport, index) => (
            <option key={index} value={sport}>
              {sport}
            </option>
          ))}
        </select>

        <label htmlFor="location" className="mr-4">
          Filter by Location:
        </label>
        <select
          name="location"
          id="location"
          value={selectedLocation}
          onChange={handleLocationChange}
          className="mr-8"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        {/* Add a form to search for events */}
        <form className="max-w-md mx-auto flex-grow">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-30 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              // className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="event-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="event-card p-4 border rounded shadow"
            >
              <img
                src={event.image}
                alt={event.title}
                className="mb-4 w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {new Date(event.date).toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Sport:</strong> {event.sport}
              </p>
              <p>
                <strong>Max Attendees:</strong> {event.maxAttendees}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {event.cancelled ? "Cancelled" : "Active"}
              </p>
              <a
                href={`/event/${event.id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Learn More
              </a>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
