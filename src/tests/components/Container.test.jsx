import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Container } from "../../components/Container";

describe("Cart", () => {
  it("renders heading", () => {
    render(<Container />);
    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
