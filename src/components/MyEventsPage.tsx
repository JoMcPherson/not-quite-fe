import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Event } from '../interfaces/Event';
import '../App.css';
import { fetchAuthSession } from "aws-amplify/auth";
import EventCard from './EventCard';

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
            const session = await fetchAuthSession();
            const token = session?.tokens?.idToken;
            try {
                const response = await axios.get(
                    `http://localhost:8080/user/${user.userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                        },
                    }
                );
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
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No events created yet.</p>
                )}
            </div>
            <div className="events-section">
                <h2 className="text-2xl font-bold mb-4">Signed up Events</h2>
                {signedUpEvents.length > 0 ? (
                    <div className="event-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {signedUpEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No events signed up for yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyEventsPage;