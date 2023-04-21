import { render, screen } from "@testing-library/react";
import StripeContainer from "./StripeContainer";

test("check if there is button to send payment", () => {
    render(<StripeContainer/>);
    const input = screen.getByText("Pay");
    expect(input).toBeInTheDocument();
  });

test("check if there is title", () => {
    render(<StripeContainer/>);
    const input = screen.getByText("Enter bank card info:");
    expect(input).toBeInTheDocument();
  });