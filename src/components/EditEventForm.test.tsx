import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EditEventForm from "./EditEventForm";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as React from "react";

const user = { userId: "1234" };
const sports = ["soccer", "basketball", "volleyball"];
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
  city: "City Name", // Add these fields
  state: "State Name", // Add these fields
  zip: "12345", // Add these fields
  street: "Street Name", // Add these fields
};

const events = [event];

describe("EditEventForm", () => {
  it("renders a form with prepopulated input fields", async () => {
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route
            path="edit/:eventId"
            element={
              <EditEventForm user={user} sports={sports} events={events} />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    const editEvent = await screen.findByText("Edit Event");
    expect(editEvent).toBeInTheDocument();
    const olympicElement = await screen.findByText("Olympic Sport");
    expect(olympicElement).toBeInTheDocument();
    const title = await screen.findByLabelText("Title");
    expect(title).toHaveValue("gymnastics at the gymnasium");
  });

  it("renders a dropdown of sports", async () => {
    render(<EditEventForm user={user} sports={sports} events={events} />);
    const sportDropdown = await screen.findByLabelText("Olympic Sport");
    expect(sportDropdown).toBeInTheDocument();
    expect(sportDropdown).toHaveValue("");
    expect(sportDropdown).toHaveTextContent("Select a sport");
    sportDropdown.click();
    expect(sportDropdown).toHaveTextContent("soccer");
  });
});
