import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetailPage from "./EventDetailPage";
import axios from "axios";

const event = {
  id: 1,
  cognitoUserId: "1234",
  title: "gymnastics at the gymnasium",
  location: "gymnasium",
  image: "/images/gymnasium.jpeg",
  description: "fun",
  date: "2024-09-15T14:30:00",
  sport: "soccer",
  maxAttendees: 30,
  createdAt: "2024-08-01T10:00:00Z",
  lastUpdated: "2024-08-05T15:00:00Z",
  cancelled: false,
};

const events = [event];
jest.mock("axios");
const mockDelete = jest.fn();
axios.delete = mockDelete;

describe("EventDetail", () => {
  it("renders a form with description and spots left", async () => {
    render(
      <MemoryRouter initialEntries={["/events/1"]}>
        <Routes>
          <Route
            path="events/:eventId"
            element={<EventDetailPage events={events} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const spotsElement = await screen.findByText(/spots/i);
    expect(spotsElement).toBeInTheDocument();
    const title = await screen.findByText("gymnastics at the gymnasium");
    expect(title).toBeInTheDocument();
  });

  it("renders buttons for delete", async () => {
    render(
      <MemoryRouter initialEntries={["/events/1"]}>
        <Routes>
          <Route
            path="events/:eventId"
            element={<EventDetailPage events={events} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const deleteButton = await screen.findByText(/Delete/i);

    expect(deleteButton).toBeInTheDocument();
    deleteButton.click();
    expect(mockDelete).toHaveBeenCalled();
  });
});
