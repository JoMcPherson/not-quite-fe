import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Event } from '../interfaces/Event';
import '../App.css';
import { fetchAuthSession } from "aws-amplify/auth";

interface MyEventsProps {
    user: any;
}

const MyEventsPage: React.FC<MyEventsProps> = ({ user }) => {
    const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
    const [signedUpEvents, setSignedUpEvents] = useState<Event[]>([]);

    useEffect(() => {


        const fetchCreatedEvents =
            async () => {
                const session = await fetchAuthSession();
                const token = session?.tokens?.idToken;
                try {
                    const response = await axios.get(
                        "http://localhost:8080/events/my_events",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                            },
                        });
                    setCreatedEvents(response.data);
                } catch (error) {
                    console.error('Error fetching created events:', error);
                }
            };

        const fetchSignedUpEvents = async () => {
            try {
                const response = await axios.get(`/events/attendedBy/${user.userId}`);
                setSignedUpEvents(response.data);
            } catch (error) {
                console.error('Error fetching signed up events:', error);
            }
        };

        fetchCreatedEvents();
        fetchSignedUpEvents();
    }, [user.userId]);

    return (
        <div className="my-events">
            <h1 className="text-center text-3xl font-bold my-8">My Events</h1>
            <div className="events-section">
                <h2 className="text-2xl font-bold mb-4">Created Events</h2>
                {createdEvents.length > 0 ? (
                    <div className="event-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {createdEvents.map((event) => (
                            <div
                                key={event.id}
                                className="event-card p-4 border rounded shadow"
                            >
                                <img
                                    src={event.image} // Ensure event.image is available or use a fallback image
                                    alt={event.title}
                                    className="mb-4 w-full h-48 object-cover rounded"
                                />
                                <h2 className="text-xl font-bold">{event.title}</h2>
                                <p>{event.description}</p>
                                <p>
                                    <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.city}, {event.state}, {event.zip}
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
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No events created yet.</p>
                )}
            </div>
            <div className="events-section">
                <h2 className="text-2xl font-bold mb-4">Signed Up Events</h2>
                {signedUpEvents.length > 0 ? (
                    <ul className="events-list">
                        {signedUpEvents.map(event => (
                            <li key={event.id} className="event-item">
                                <h3 className="event-title">{event.title}</h3>
                                <p className="event-date">Date: {new Date(event.date).toLocaleString()}</p>
                                <p className="event-location">
                                    Location: {event.city}, {event.state}, {event.zip}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No events signed up for yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyEventsPage;