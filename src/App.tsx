import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CreateEventForm from "./components/CreateEventForm";
import EditEventForm from "./components/EditEventForm";
import EventDetailPage from "./components/EventDetailPage";
import { sports } from "./assets/sports";
// to be replace with backend api calls
import { eventExamples } from "./assets/eventExamples";
import MainPage from "./components/MainPage";

function App() {
  const token = localStorage.getItem("token") || "1"; // Replace token from JWT

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage events={eventExamples} />} />
          <Route
            path="/create"
            element={<CreateEventForm sports={sports} token={token} />}
          />
          <Route
            path="/edit"
            element={
              <EditEventForm
                event={eventExamples[0]}
                sports={sports}
                token={token}
              />
            }
          />
          <Route
            path="/event/:id"
            element={<EventDetailPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
