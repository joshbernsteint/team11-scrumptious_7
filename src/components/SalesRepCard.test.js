import { SalesRepCard } from "./SalesRepCard";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

test("check if renders SalesRepCard component", () => {
  render(
    <Router>
      <SalesRepCard />
    </Router>
  );
  const linkElement = screen.getByText("Sales Rep Homepage");
  expect(linkElement).toBeInTheDocument();
});

test("check if renders General Purpose button", () => {
  render(
    <Router>
      <SalesRepCard />
    </Router>
  );
  const linkElement = screen.getByText("General Purpose link");
  expect(linkElement).toBeInTheDocument();
});

test("check if renders Specific Country button", () => {
  render(
    <Router>
      <SalesRepCard />
    </Router>
  );
  const linkElement = screen.getByText("Specific Country/Region");
  expect(linkElement).toBeInTheDocument();
});

test("check if renders region page", () => {
  render(
    <Router>
      <SalesRepCard />
    </Router>
  );
  const button = screen.getByText("Specific Country/Region");
  fireEvent.click(button);
  const linkElement = screen.getByText("Choose a specific page");
  expect(linkElement).toBeInTheDocument();
});

test("check if USA button exists", () => {
  render(
    <Router>
      <SalesRepCard />
    </Router>
  );
  const button = screen.getByText("Specific Country/Region");
  fireEvent.click(button);
  const linkElement = screen.getByText("USA");
  expect(linkElement).toBeInTheDocument();
});
