import { render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";

test("check if message button in document", () => {
  render(<ChatBox />);
  const input = screen.getByLabelText("message-btn");
  expect(input).toBeInTheDocument();
});
