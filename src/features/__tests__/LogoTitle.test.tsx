import React from "react";
import { render } from "@testing-library/react-native";
import LogoTitle from "../LogoTitle";

describe("LogoTitle", () => {
  it("renders the container with correct styles", () => {
    const { getByTestId } = render(<LogoTitle />);
    const container = getByTestId("logo-title-container");
    expect(container).toBeTruthy();
  });

  it("renders the title with correct styles", () => {
    const { getByTestId } = render(<LogoTitle />);
    const title = getByTestId("logo-title");
    expect(title).toBeTruthy();
  });
});
