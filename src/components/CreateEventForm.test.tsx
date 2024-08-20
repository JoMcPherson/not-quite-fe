import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as React from "react";
import { describe, it, expect } from "vitest";
import CreateEventForm from "./CreateEventForm";

const sports = ["soccer", "basketball", "volleyball"];

describe("CreateEventForm", () => {
  it("renders the form with input fields", () => {
    render(<CreateEventForm sports={sports} />);

    const createEventTitle = screen.getByText("Create New Event");
    expect(createEventTitle).toBeInTheDocument();

    const olympicLabel = screen.getByTestId("sport");
    expect(olympicLabel).toBeInTheDocument();
  });

  it("renders a dropdown with sports options", () => {
    render(<CreateEventForm sports={sports} />);

    const sportDropdown = screen.getByTestId("sport");
    expect(sportDropdown).toBeInTheDocument();
    expect(sportDropdown).toHaveValue("");

    fireEvent.change(sportDropdown, { target: { value: "soccer" } });
    expect(sportDropdown).toHaveValue("soccer");
  });

  it("shows the correct options in the dropdown", () => {
    render(<CreateEventForm sports={sports} />);

    const sportDropdown = screen.getByTestId("sport");
    expect(sportDropdown).toHaveTextContent("Select a sport");
    expect(sportDropdown).toHaveTextContent("soccer");
    expect(sportDropdown).toHaveTextContent("basketball");
    expect(sportDropdown).toHaveTextContent("volleyball");
  });
});
