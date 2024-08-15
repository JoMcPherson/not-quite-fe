import React, { useState } from "react";
import axios from "axios";
import { Event } from "../interfaces/Event";
import "../styles/createEvent.css";
import "../App.css";

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

  const [showSuccessBanner, setShowSuccessBanner] = useState<Boolean>(false);
  const [createdEventId, setCreatedEventId] = useState<Number>(0);

  const successBanner = (
    <div
      className="flex items-center p-4 mb-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
      role="alert"
    >
      {/* SVG and Success Message */}
    </div>
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    type: string,
    defaultValue: any
  ) => {
    if (e.target.value === "") {
      if (type === "text") {
        e.target.type = "text";
      } else {
        setFormData({ ...formData, [e.target.name]: defaultValue });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagepath = formData.sport.toLowerCase().replace(/ /g, "_");

    const eventPayload = {
      ...formData,
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

  const renderInput = (
    name: keyof typeof formData,
    type: string,
    placeholder: string,
    defaultValue: any = ""
  ) => (
    <input
      type={type}
      name={name}
      id={name}
      value={formData[name] === defaultValue ? "" : formData[name]}
      placeholder={placeholder}
      onFocus={(e) => type === "datetime-local" && (e.target.type = "datetime-local")}
      onBlur={(e) => handleBlur(e, type === "datetime-local" ? "text" : "", defaultValue)}
      onChange={handleChange}
      className="input-field"
      required
    />
  );

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
          {renderInput("title", "text", "Event Name")}
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
          {renderInput("date", "text", "Select date and time")}
        </div>
        <div className="mb-4">
          {renderInput("maxAttendees", "number", "Max attendees", 0)}
        </div>
        <div className="address">
          <div className="mb-4">
            {renderInput("state", "text", "State")}
          </div>
          <div className="mb-4">
            {renderInput("city", "text", "City")}
          </div>
          <div className="mb-4">
            {renderInput("zip", "text", "Zip")}
          </div>
        </div>
        <div className="mb-4 street">
          {renderInput("street", "text", "Street")}
        </div>
        <button type="submit" className="submit-button">
          Create Event
        </button>
      </form>
    </>
  );
};

export default CreateEventForm;