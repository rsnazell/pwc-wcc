import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Location from "./Location";

const mockProps = {
  location: "Darwin",
  setLocation: jest.fn(),
  setCoordinates: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("<Location />", () => {
  it("renders an input element with label and aria-role", () => {
    render(<Location {...mockProps} />);

    expect(screen.getByLabelText("Location")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("sets the location on form submission", async () => {
    render(<Location {...mockProps} />);
    expect(mockProps.setLocation).not.toHaveBeenCalled();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "Wagga Wagga");
    expect(input).toHaveValue("Wagga Wagga");
    fireEvent.submit((input as any).closest("form"));
    expect(mockProps.setLocation).toHaveBeenLastCalledWith("Wagga Wagga");
  });

  it("clears the location and coordinates on input change", async () => {
    render(<Location {...mockProps} />);
    expect(mockProps.setLocation).not.toHaveBeenCalled();
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "a");
    expect(mockProps.setLocation).toHaveBeenCalledWith("");
    expect(mockProps.setCoordinates).toHaveBeenCalledWith(null);
  });
});
