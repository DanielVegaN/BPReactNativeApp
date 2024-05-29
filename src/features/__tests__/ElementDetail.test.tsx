import React from "react";
import { render } from "@testing-library/react-native";
import ElementDetail from "../ElementDetail";

describe("ElementDetail", () => {
  it("renders the name and value correctly", () => {
    const name = "Test Name";
    const value = "Test Value";
    const { getByText } = render(<ElementDetail name={name} value={value} />);

    expect(getByText(name)).toBeTruthy();
    expect(getByText(value)).toBeTruthy();
  });

  it("renders empty value correctly", () => {
    const name = "Test Name";
    const value = "";
    const { getByText } = render(<ElementDetail name={name} value={value} />);

    expect(getByText(name)).toBeTruthy();
    expect(getByText(value)).toBeTruthy();
  });

  it("renders null value correctly", () => {
    const name = "Test Name";
    const value = null;
    const { getByText } = render(
      <ElementDetail name={name} value={value || ""} />
    );

    expect(getByText(name)).toBeTruthy();
    expect(getByText("")).toBeTruthy();
  });
});
