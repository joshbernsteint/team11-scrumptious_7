import { render, screen, fireEvent } from "@testing-library/react";
import { useRef } from "react"
import PermissionForm from "./PermissionForm";

test("check if there is button to send email", () => {
    render(<PermissionForm/>);
    const input = screen.getByText("Send Email");
    expect(input).toBeInTheDocument();
  });

  test("check if there is sender section", () => {
    render(<PermissionForm/>);
    const input = screen.getByText("Sender:");
    expect(input).toBeInTheDocument();
  });

  test("check if there is receiver section", () => {
    render(<PermissionForm/>);
    const input = screen.getByText("Receiver:");
    expect(input).toBeInTheDocument();
  });

  test("check if there is message section", () => {
    render(<PermissionForm/>);
    const input = screen.getByText("Message:");
    expect(input).toBeInTheDocument();
  });

  test("check if there is reply to section", () => {
    render(<PermissionForm/>);
    const input = screen.getByText("Reply To:");
    expect(input).toBeInTheDocument();
  });