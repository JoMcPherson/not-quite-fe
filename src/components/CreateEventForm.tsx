import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Event } from "../interfaces/Event";

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
    location: "",
    description: "",
    date: "",
    sport: "",
    maxAttendees: 0,
  });

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

    const eventPayload = {
      ...formData,
      cognitoUserid: user.userId,
      image: `/images/${formData.sport.toLowerCase()}.jpeg`,
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
    } catch (error) {
      console.error("Error creating event:", error, eventPayload);
    }
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-8">Create New Event</h1>
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
        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </>
  );
};

export default CreateEventForm;
