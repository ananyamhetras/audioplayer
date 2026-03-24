import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Playlist from "./Playlist.jsx";

// Mock fetch so we don't call the real server
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { title: "Song A", artist: "Artist A", year: 2020 },
          { title: "Podcast B", episode: "Ep 1", creator: "Creator B" }
        ])
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Playlist component", () => {
  it("fetches and displays tracks", async () => {
    render(<Playlist />);
    expect(await screen.findByText("Song A")).toBeInTheDocument();
    expect(await screen.findByText("Podcast B")).toBeInTheDocument();
  });

  it("updates status on double-click", async () => {
    render(<Playlist />);
    const song = await screen.findByText("Song A");
    fireEvent.doubleClick(song);
    
    await waitFor(() => {
      expect(screen.getByText("Playing: Song A")).toBeInTheDocument();
    });
  });
    

  it("handles Play/Pause button toggle", async () => {
    render(<Playlist />);
    const song = await screen.findByText("Song A");
    fireEvent.doubleClick(song);
    const button = screen.getByText("Pause");
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Play")).toBeInTheDocument();
    });
  });


  it("handles Next and Prev buttons looping", async () => {
    render(<Playlist />);
    const nextButton = screen.getByText("Next");
    const prevButton = screen.getByText("Prev");
    
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByText("Song A")).toBeInTheDocument();
    });
    
    fireEvent.click(prevButton);
    await waitFor(() => {
      expect(screen.getByText("Podcast B")).toBeInTheDocument();
    });
  });
});