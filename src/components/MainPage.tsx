import React, { useState } from "react";
import { Event } from "../interfaces/Event";
import "../styles/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

interface MainPageProps {
  user: any;
  events: Event[];
}

const MainPage: React.FC<MainPageProps> = ({ events }) => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSport(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    const sport = typeof event.sport === "string" ? event.sport.trim() : "";
    const city = typeof event.city === "string" ? event.city.trim() : "";
    const state = typeof event.state === "string" ? event.state : "";
    const searchLower = searchTerm.toLowerCase();

    const matchesSport = selectedSport === "" || sport === selectedSport;
    const matchesCity = selectedCity === "" || city === selectedCity;
    const matchesState = selectedState === "" || state === selectedState;
    const matchesSearchTerm =
      searchTerm === "" ||
      sport.toLowerCase().includes(searchLower) ||
      state.toLowerCase().includes(searchLower) ||
      city.toLowerCase().includes(searchLower);

    const matchesDateRange =
      (!startDate || eventDate >= startDate) &&
      (!endDate || eventDate <= endDate);

    return (
      matchesSport &&
      matchesCity &&
      matchesState &&
      matchesSearchTerm &&
      matchesDateRange
    );
  });

  const uniqueSports = Array.from(new Set(events.map((event) => event.sport)));
  const uniqueCities = Array.from(new Set(events.map((event) => event.city)));
  const uniqueStates = Array.from(new Set(events.map((event) => event.state)));

  return (
    <div className="main-page">
      <h1 className="text-center text-3xl font-bold my-8 headline">
        Olympic Events
      </h1>
      <div className="filter-section mb-8 p-4 bg-blue-100 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="sport" className="text-sm font-medium mb-1">
            Filter by Sport:
          </label>
          <select
            name="sport"
            id="sport"
            value={selectedSport}
            onChange={handleSportChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Sports</option>
            {uniqueSports.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="state" className="text-sm font-medium mb-1">
            Filter by State:
          </label>
          <select
            name="state"
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All States</option>
            {uniqueStates.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="city" className="text-sm font-medium mb-1">
            Filter by City:
          </label>
          <select
            name="city"
            id="city"
            value={selectedCity}
            onChange={handleCityChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Cities</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-sm font-medium mb-1">
            Start Date:
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-sm font-medium mb-1">
            End Date:
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col">
          <label htmlFor="default-search" className="text-sm font-medium mb-1">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
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
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
                <strong>State:</strong> {event.state}
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
