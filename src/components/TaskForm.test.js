import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./TaskForm";

test("check if task form renders", () => {
  render(<TaskForm></TaskForm>);
  const input = screen.getByTestId("task-form");
  expect(input).toBeInTheDocument();
});

test("check if there is a submit button", () => {
  render(<TaskForm></TaskForm>);
  const input = screen.getByTestId("task-submit-btn");
  expect(input).toBeInTheDocument();
});

test("non-manager user cannot assign task", () => {
  render(<TaskForm></TaskForm>);
  const input = screen.getByTestId("task-submit-btn");
  fireEvent.click(input);
  const msg = screen.getByTestId("auth-msg");
  expect(msg).toBeInTheDocument();
});
