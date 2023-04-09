import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JoinChat from "./JoinChat";

const setup = (text) => {
  const utils = render(<JoinChat tasks={MyTasks} />);
  const input = screen.getByLabelText(text);
  return {
    input,
    ...utils,
  };
};

const MyTasks = [
  {
    id: "1",
    title: "Submit Roof Picture",
    due: "March 8, 2023",
    owner: "Manager",
    assignedTo: "Construction Worker",
    description: "placeholder",
    priority: "3",
    date: "2023-03-8",
    completed: "40",
  },
  {
    id: "1.5",
    title: "Submit Roof",
    due: "March 13, 2023",
    owner: "Manager",
    assignedTo: "Construction Worker",
    description: "placeholder",
    priority: "3",
    date: "2023-03-8",
    completed: "15",
  },
  {
    id: "5",
    title: "Begin truss supports",
    due: "March 12, 2023",
    owner: "Manager",
    assignedTo: "Construction Worker",
    description: "There is no light here",
    priority: "4",
    date: "2023-03-12",
    completed: "65",
  },
  {
    id: "2",
    title: "Install panels",
    due: "March 16, 2023",
    owner: "Manager",
    assignedTo: "Construction Worker",
    description: "Put panels in place",
    priority: "1",
    date: "2023-03-30",
    completed: "30",
  },
  {
    id: "3",
    title: "Connect wiring",
    due: "May 12, 2023",
    owner: "Manager",
    assignedTo: "Construction Worker",
    description: "Connect electrical wiring",
    priority: "2",
    date: "2023-03-31",
    completed: "90",
  },
];

test("check if button in document", () => {
  const { input } = setup("close-button");
  fireEvent.click(input);
  expect(input).toBeInTheDocument();
});

test("check if button changes on click", () => {
  const { input } = setup("close-button");
  fireEvent.click(input);
  expect(input).toHaveTextContent("Close Chat");
});

test("check if button changes on click twice", () => {
  const { input } = setup("close-button");
  fireEvent.click(input);
  fireEvent.click(input);
  expect(input).toHaveTextContent("Open Chat");
});

test("check if name prompt shows up", () => {
  render(<JoinChat tasks={MyTasks} />);
  const input1 = screen.getByLabelText("close-button");
  fireEvent.click(input1);
  const input2 = screen.getByLabelText("name-prompt");
  expect(input2).toBeInTheDocument();
});

test("check if name prompt can be used", () => {
  render(<JoinChat tasks={MyTasks} />);
  const input1 = screen.getByLabelText("close-button");
  fireEvent.click(input1);
  const input2 = screen.getByLabelText("name-prompt");
  fireEvent.change(input2, { target: { value: "test" } });
  expect(input2.value).toBe("test");
});

test("check if name prompt can be submitted", () => {
  render(<JoinChat tasks={MyTasks} />);
  const input1 = screen.getByLabelText("close-button");
  fireEvent.click(input1);
  const input2 = screen.getByLabelText("name-prompt");
  fireEvent.change(input2, { target: { value: "test" } });
  const form = screen.getByLabelText("name-form");
  fireEvent.submit(form);
  const input4 = screen.getByLabelText("task_chat3");
  expect(input4).toBeInTheDocument();
});
