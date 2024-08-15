import React, { useState } from "react";
import axios from "axios";
import { Event } from "../interfaces/Event";
import '../styles/createEvent.css';
import "../App.css";

interface EventFormProps {
  user: any;
  sports: string[];
}

const CreateEventForm: React.FC<EventFormProps> = ({ user, sports }) => {
  const [formData, setFormData] = useState<
    Omit<Event, "id" | "createdAt" | "lastUpdated" | "cancelled">
  >({
    title: "",
    cognitoUserId: user.userId,
    image: "",
    state: "",
    city: "",
    zip: "",
    street: "",
    description: "",
    date: "",
    sport: "",
    maxAttendees: 0,
  });

  const [showSuccessBanner, setShowSuccessBanner] = useState<Boolean>(false);
  const [createdEventId, setCreatedEventId] = useState<Number>(0);

  const successBanner = (
    <div
      className="flex items-center p-4 mb-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span className="sr-only">Info</span>
      <div className="flex items-center ml-3">
        <span className="font-medium text-center">
          Event Created Successfully!
          <br />
          <a href={`/events/${createdEventId}`}>
            Click here to see your event.
          </a>
        </span>
      </div>
      <div className="ml-3">
        <button
          onClick={() => setShowSuccessBanner(false)}
          type="button"
          className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
          data-dismiss-target="#alert-additional-content-3"
          aria-label="Close"
        >
          Dismiss
        </button>
      </div>
    </div>
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagepath = formData.sport.toLowerCase().replace(/ /g, "_"); // Removed the extra closing brace

    const eventPayload = {
      ...formData,
      cognitoUserid: user.userId,
      image: `/images/${imagepath}.jpeg`,
      created_at: new Date().toISOString(),
      last_updated: new Date().toISOString(),
      cancelled: false,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/events",
        eventPayload
      );
      console.log("Event created successfully:", response.data);
      setCreatedEventId(response.data.id);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 10000);
      setFormData({
        title: "",
        cognitoUserId: "test",
        image: "",
        state: "",
        city: "",
        zip: "",
        street: "",
        description: "",
        date: "",
        sport: "",
        maxAttendees: 0,
      });
    } catch (error) {
      console.error("Error creating event:", error, eventPayload);
    }
  };

  return (
    <>
      {showSuccessBanner ? successBanner : <></>}
      <h1 className="text-center text-3xl font-bold my-8">Create New Event</h1>
      <form onSubmit={handleSubmit} className="basic-form">
        <div className="mb-4 flex-field">
          <select
            name="sport"
            id="sport"
            value={formData.sport}
            onChange={handleChange}
            className="input-field select-field"
            required
          >
            <option value="" disabled className="placeholder-option">
              Select a sport
            </option>
            {sports.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            placeholder="Event Name"
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            name="description"
            id="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            className="input-field"
            required
            rows={3}
          />
        </div>
        <div className="mb-4">
          <input
            type="datetime-local"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            inputMode="numeric"
            name="maxAttendees"
            id="maxAttendees"
            value={formData.maxAttendees}
            placeholder="Max attendees"
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="address">
          <div className="mb-4">
            <input
              type="text"
              name="state"
              id="state"
              value={formData.state}
              placeholder="State"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              placeholder="City"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="zip"
              id="zip"
              value={formData.zip}
              placeholder="Zip"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>
        <div className="mb-4 street">
          <input
            type="text"
            name="street"
            id="street"
            value={formData.street}
            placeholder="Street"
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form >
    </>
  );
};

export default CreateEventForm;
