import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Song from "./Song.jsx";

test("renders correctly with valid input", () => {
  render(<Song title="Billie Jean" artist="Michael Jackson" year={1983} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Billie Jean");
  const paragraphs = screen.getAllByText(/./, { selector: "p" });
  expect(paragraphs[0]).toHaveTextContent("Michael Jackson");
  expect(paragraphs[1]).toHaveTextContent("1983");
});

test("renders correctly with missing or invalid props", () => {
  render(<Song title="Song Only" />);
  expect(screen.getByRole("heading")).toHaveTextContent("Song Only");
  const paragraphs = screen.getAllByText("", { selector: "p" });
  expect(paragraphs[0]).toHaveTextContent(""); // artist
  expect(paragraphs[1]).toHaveTextContent(""); // year
});

test("renders correctly when year is a string", () => {
  render(<Song title="Test Song" artist="Test Artist" year="not-a-number" />);
  const paragraphs = screen.getAllByText(/./, { selector: "p" });
  expect(paragraphs[1]).toHaveTextContent("not-a-number");
});