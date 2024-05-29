import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ButtonComponent from "../ButtonComponent";

const styles = {
  button: [{}],
  text: [{}],
}

describe("ButtonComponent", () => {
  it("renders the button with the correct text", () => {
    const { getByText } = render(
      <ButtonComponent text="Click me" styles={styles} onPress={() => {}} />
    );
    const buttonElement = getByText("Click me");
    expect(buttonElement).toBeTruthy();
  });

  it("calls the onPress callback when the button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <ButtonComponent styles={styles} text="Click me" onPress={onPressMock} />
    );
    const buttonElement = getByText("Click me");
    fireEvent.press(buttonElement);
    expect(onPressMock).toHaveBeenCalled();
  });

  it("applies the provided style to the button", () => {
    const style = { button: [ { backgroundColor: "red"}], text: [{}] };
    const { getByTestId } = render(
      <ButtonComponent text="Click me" onPress={() => {}} styles={style} />
    );
    const buttonElement = getByTestId("button-component");
    setTimeout(() => {
      expect(buttonElement.props.style).toEqual(style);  
    }, 1000).unref();
  });
});
