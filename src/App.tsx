import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateEventForm from "./components/CreateEventForm";
import EditEventForm from "./components/EditEventForm";
import { sports } from "./assets/sports";

function App() {
  const token = localStorage.getItem("token") || "1"; // Replace token from JWT
  const eventExample = {
    id: 1,
    title: "Olympic Swimming Championship",
    location: "London Aquatic Centre",
    description:
      "A thrilling swimming competition featuring top athletes from around the world.",
    date: "2024-09-15T14:30:00",
    sport: "Swimming",
    created_at: "2024-08-01T10:00:00Z",
    last_updated: "2024-08-05T15:00:00Z",
    cancelled: false,
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/create"
            element={<CreateEventForm sports={sports} token={token} />}
          />
          <Route
            path="/edit"
            element={
              <EditEventForm
                event={eventExample}
                sports={sports}
                token={token}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
