import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Podcast from "./Podcast.jsx";

describe("Podcast component", () => {
  it("renders correctly with valid input", () => {
    const validProps = {
      title: "The Daily",
      episode: "Episode 123",
      season: "Season 3",
      creator: "The New York Times",
    };

    render(<Podcast {...validProps} />);

    expect(screen.getByText(validProps.title)).toBeInTheDocument();
    expect(
      screen.getByText(
        `Season: ${validProps.season} Episode: ${validProps.episode}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText(validProps.creator)).toBeInTheDocument();
  });

  it("renders correctly with missing props", () => {
    const missingProps = { title: "Episode Only" };
    render(<Podcast {...missingProps} />);

    expect(screen.getByText("Episode Only")).toBeInTheDocument();
    expect(screen.getByText("", { selector: "p" })).toBeInTheDocument();
  });
});

it("renders correctly when season is missing", () => {
    const props = { title: "No Season Podcast", episode: "Ep 1", creator: "Creator A" };
    render(<Podcast {...props} />);
    expect(screen.getByText("No Season Podcast")).toBeInTheDocument();
    expect(screen.getByText("Episode: Ep 1")).toBeInTheDocument();
    expect(screen.getByText("Creator A")).toBeInTheDocument();
  });

  it("renders correctly when episode is missing", () => {
    const props = { title: "No Episode Podcast", season: "Season 2", creator: "Creator B" };
    render(<Podcast {...props} />);
    expect(screen.getByText("No Episode Podcast")).toBeInTheDocument();
    // Since episode is undefined, finalTitle should show "Season: Season 2 Episode: undefined"
    expect(screen.getByText("Season: Season 2 Episode: undefined")).toBeInTheDocument();
    expect(screen.getByText("Creator B")).toBeInTheDocument();
  });