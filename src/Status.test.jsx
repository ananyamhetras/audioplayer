import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Status from "./Status.jsx";

describe("Status component", () => {
  it("renders nothing when no track is selected", () => {
    const { container } = render(<Status tracks={[]} currentIndex={null} isPlaying={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders 'Playing' with current track title", () => {
    const tracks = [{ title: "Track 1" }];
    render(<Status tracks={tracks} currentIndex={0} isPlaying={true} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Playing: Track 1");
  });

  it("renders 'Paused' when paused", () => {
    const tracks = [{ title: "Track 2" }];
    render(<Status tracks={tracks} currentIndex={0} isPlaying={false} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Paused");
  });
});