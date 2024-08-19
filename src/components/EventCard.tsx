import React from "react";
import { Event } from "../interfaces/Event";

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="event-card p-4 border rounded shadow">
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
                <strong>Status:</strong> {event.cancelled ? "Cancelled" : "Active"}
            </p>
            <a
                href={`/events/${event.id}`}
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Learn More
            </a>
        </div>
    );
};

export default EventCard;