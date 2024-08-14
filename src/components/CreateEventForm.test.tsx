import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CreateEventForm from "./CreateEventForm";

const user = { userId: "1234" };
const sports = ["soccer", "basketball", "volleyball"];

describe("CreateEventForm", () => {
  it("renders a form with input fields", async () => {
    render(<CreateEventForm user={user} sports={sports} />);
    const olympicElement = await screen.findByText("Olympic Sport");
    expect(olympicElement).toBeInTheDocument();
    const createEvent = await screen.findByText("Create New Event");
    expect(createEvent).toBeInTheDocument();
  });
});
