import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateEventForm from "./components/CreateEventForm";
import EditEventForm from "./components/EditEventForm";
import { sports } from "./assets/sports";
import { Event } from "./interfaces/Event";
// to be replace with backend api calls
import { eventExamples } from "./assets/eventExamples";
import MainPage from "./components/MainPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const token = localStorage.getItem("token") || "1"; // Replace token from JWT
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          "http://localhost:8080/events"
        );
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
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage events={events} />} />
          <Route
            path="/create"
            element={<CreateEventForm sports={sports} token={token} />}
          />
          <Route
            path="/edit/:eventId"
            element={
              <EditEventForm events={events} sports={sports} token={token} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
