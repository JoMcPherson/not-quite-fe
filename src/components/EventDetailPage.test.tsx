import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetailPage from "./EventDetailPage";
import { describe, it, expect } from "vitest";
//eslint-disable-next-line
import * as React from "react";

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
  city: "City Name",
  state: "State Name",
  zip: "12345",
  street: "Street Name",
};

const events = [event];

describe("EventDetailPage", () => {
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

  it("renders buttons for signUp", async () => {
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
    const signUpButton = await screen.findByTestId("signUp");
    expect(signUpButton).toBeInTheDocument();
  });
});
