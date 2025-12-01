import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home page", () => {
  it("renders the heading and refresh button", () => {
    render(<Home />);
    expect(screen.getByText(/Simple Next.js App/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /refresh/i })
    ).toBeInTheDocument();
  });
});
