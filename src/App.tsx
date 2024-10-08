import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateEventForm from "./components/CreateEventForm";
import EditEventForm from "./components/EditEventForm";
import { sports } from "./assets/sports";
import { Event } from "./interfaces/Event";
import MainPage from "./components/MainPage";
import { useEffect, useState } from "react";
import axios from "axios";
import EventDetailPage from "./components/EventDetailPage";
import MyEventsPage from "./components/MyEventsPage";
import MyAuthenticator from "./components/MyAuthenticator";

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(`${API_BASE_URL}/events`);
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MyAuthenticator>
      {({ user }) => (
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route
                path="/"
                element={<MainPage user={user} events={events} />}
              />
              <Route
                path="/create"
                element={<CreateEventForm sports={sports} />}
              />
              <Route
                path="/edit/:eventId"
                element={
                  <EditEventForm user={user} events={events} sports={sports} />
                }
              />
              <Route
                path="/events/:eventId"
                element={<EventDetailPage events={events} />}
              />
              <Route path="/my_events" element={<MyEventsPage user={user} />} />
            </Routes>
          </div>
        </Router>
      )}
    </MyAuthenticator>
  );
}

export default App;
