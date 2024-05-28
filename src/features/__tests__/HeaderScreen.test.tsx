import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AlertMessage from "../../common/AlertMessage";

describe("AlertMessage", () => {
  it("renders with the given message and title, and hides the modal on button press", async () => {
    const { getByText, queryByText, getByTestId } = render(
      <AlertMessage message="Test Message" title="Test Title" />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Message")).toBeTruthy();

    const button = getByText("Entendido");
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryByText("Test Title")).toBeNull();
      expect(queryByText("Test Message")).toBeNull();
    });
  });

  it("closes the modal when onRequestClose is triggered", async () => {
    const { getByText, queryByText, getByTestId } = render(
      <AlertMessage message="Test Message" title="Test Title" />
    );

    expect(getByText("Test Title")).toBeTruthy();
    expect(getByText("Test Message")).toBeTruthy();

    fireEvent(getByTestId("modal"), "requestClose");

    await waitFor(() => {
      expect(queryByText("Test Title")).toBeNull();
      expect(queryByText("Test Message")).toBeNull();
    });
  });
});
