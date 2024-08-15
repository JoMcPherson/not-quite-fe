import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Event } from '../interfaces/Event';
import '../App.css';

interface MyEventsProps {
    user: any;
}

const MyEventsPage: React.FC<MyEventsProps> = ({ user }) => {
    const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
    const [signedUpEvents, setSignedUpEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchCreatedEvents = async () => {
            try {
                const response = await axios.get(`/events/createdBy/${user.userId}`);
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
                    <ul className="events-list">
                        {createdEvents.map(event => (
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
                    <p>No events created yet.</p>
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