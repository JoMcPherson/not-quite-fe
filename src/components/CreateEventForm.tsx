import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Event } from "../interfaces/Event";
import { fetchAuthSession } from "aws-amplify/auth";
import "../styles/createEvent.css";

interface EventFormProps {
  sports: string[];
}

const CreateEventForm: React.FC<EventFormProps> = ({ sports }) => {
  const [formData, setFormData] = useState<
    Omit<
      Event,
      "id" | "createdAt" | "lastUpdated" | "cancelled" | "cognitoUserId"
    >
  >({
    title: "",
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

  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [createdEventId, setCreatedEventId] = useState<number>(0);

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

    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;

    const imagepath = formData.sport.toLowerCase().replace(/ /g, "_");
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const eventPayload = {
      ...formData,
      image: `/images/${imagepath}.jpeg`,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      cancelled: false,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/events`,
        eventPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setCreatedEventId(response.data.id);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 10000);
      setFormData({
        title: "",

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
      console.error("Error creating event:", error);
    }
  };

  return (
    <>
      {showSuccessBanner && successBanner}
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
            type="text"
            name="date"
            id="date"
            value={formData.date === "" ? "" : formData.date}
            placeholder="Select date and time"
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.type = "text";
              }
            }}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="maxAttendees"
            id="maxAttendees"
            value={formData.maxAttendees === 0 ? "" : formData.maxAttendees}
            placeholder="Max attendees"
            onChange={handleChange}
            className="input-field"
            required
            onBlur={(e) => {
              if (e.target.value === "") {
                setFormData({ ...formData, maxAttendees: 0 });
              }
            }}
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
      </form>
    </>
  );
};

export default CreateEventForm;
