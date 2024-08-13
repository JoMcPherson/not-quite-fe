import React, { useState } from "react";
import { Event } from "../interfaces/Event";
interface MainPageProps {
  user: any;
  events: Event[];
}

const MainPage: React.FC<MainPageProps> = ({ user, events }) => {
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

      <div className="filter-section mb-8">
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
        >
          <option value="">All Locations</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
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
                href={`/events/${event.id}`}
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
