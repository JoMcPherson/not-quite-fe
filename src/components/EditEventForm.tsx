import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../App.css";
import { Event } from "../interfaces/Event";

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

    const eventPayload: Omit<Event, "id"> = {
      ...formData,
      cognitoUserId: user.userId,
      lastUpdated: new Date().toISOString(), // Set lastUpdated to the current date/time
    };

    try {
      const response = await axios.put(`/events/${eventId}`, eventPayload);
      console.log("Event updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
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
