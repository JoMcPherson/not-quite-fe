import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

interface EditEventFormProps {
  event: {
    id: number;
    title: string;
    location: string;
    description: string;
    date: string;
    sport: string;
    maxAttendees: number;
    created_at: string;
    last_updated: string;
    cancelled: boolean;
  };
  sports: string[];
  token: string;
}

const EditEventForm: React.FC<EditEventFormProps> = ({
  event,
  sports,
  token,
}) => {
  const [formData, setFormData] = useState({
    title: event.title,
    location: event.location,
    description: event.description,
    date: event.date,
    sport: event.sport,
    maxAttendees: event.maxAttendees,
    cancelled: event.cancelled,
  });

  useEffect(() => {
    setFormData({
      title: event.title,
      location: event.location,
      description: event.description,
      date: event.date,
      sport: event.sport,
      maxAttendees: event.maxAttendees,
      cancelled: event.cancelled,
    });
  }, [event]);

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

    const eventPayload = {
      ...formData,
      user_id: token,
      last_updated: new Date().toISOString(),
      created_at: event.created_at, // Maintain original created_at timestamp
    };
    console.log("event data:", eventPayload);
    try {
      const response = await axios.put(`/api/events/${event.id}`, eventPayload);
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
          <label htmlFor="location" className="input-label">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
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
