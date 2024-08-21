import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Event } from "../interfaces/Event";
import "../App.css";
import { fetchAuthSession } from "aws-amplify/auth";

interface EditEventFormProps {
  user: any;
  events: Event[];
  sports: string[];
}

const EditEventForm: React.FC<EditEventFormProps> = ({
  user,
  events,
  sports,
}) => {
  const { eventId } = useParams<{ eventId: string }>();
  const [formData, setFormData] = useState<Omit<Event, "id" | "lastUpdated">>({
    title: "",
    cognitoUserId: user.userId,
    street: "",
    state: "",
    city: "",
    zip: "",
    description: "",
    date: "",
    sport: "",
    maxAttendees: 0,
    cancelled: false,
    image: "",
    createdAt: "", // Keep track of createdAt
  });

  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [updatedEventId, setUpdatedEventId] = useState<number>(0);

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
          Event Updated Successfully!
          <br />
          <a href={`/events/${updatedEventId}`}>
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


  useEffect(() => {
    if (eventId) {
      const selectedEvent = events.find(
        (event) => event.id === parseInt(eventId)
      );

      if (selectedEvent) {
        setFormData({
          title: selectedEvent.title,
          cognitoUserId: selectedEvent.cognitoUserId,
          street: selectedEvent.street,
          state: selectedEvent.state,
          city: selectedEvent.city,
          zip: selectedEvent.zip,
          description: selectedEvent.description,
          date: selectedEvent.date,
          sport: selectedEvent.sport,
          maxAttendees: selectedEvent.maxAttendees,
          cancelled: selectedEvent.cancelled,
          image: selectedEvent.image,
          createdAt: selectedEvent.createdAt, // Preserve createdAt
        });
      }
    }
  }, [eventId, events]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;

    const eventPayload: Omit<Event, "id"> = {
      ...formData,
      cognitoUserId: user.userId,
      lastUpdated: new Date().toISOString(), // Set lastUpdated to the current date/time
    };
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.put(
        `${API_BASE_URL}/events/${eventId}`,
        eventPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setUpdatedEventId(response.data.id);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 10000);
      console.log("Event updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      {showSuccessBanner && successBanner}
      <h1 className="text-center text-3xl font-bold my-8">Edit Event</h1>
      <form onSubmit={handleSubmit} className="basic-form">
        <div className="mb-4">
          <label htmlFor="sport" className="input-label">
            Olympic Sport
          </label>
          <select
            name="sport"
            id="sport"
            value={formData.sport}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="" disabled>
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
          <label htmlFor="title" className="input-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="input-label">
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="input-label">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zip" className="input-label">
            Zip
          </label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={formData.zip}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="input-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="input-field"
            required
            rows={3}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="input-label">
            Date
          </label>
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
          <label htmlFor="maxAttendees" className="input-label">
            Max Attendees
          </label>
          <input
            type="number"
            name="maxAttendees"
            id="maxAttendees"
            value={formData.maxAttendees}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cancelled" className="input-label">
            Cancelled
          </label>
          <input
            type="checkbox"
            name="cancelled"
            id="cancelled"
            checked={formData.cancelled}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Update Event
        </button>
      </form>
    </>
  );
};

export default EditEventForm;
