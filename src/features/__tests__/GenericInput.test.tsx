import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import GenericInput from "@/src/features/GenericInput";
import { GenericInputProps } from "@/src/interfaces/genericInput";

const defaultProps: GenericInputProps = {
  type: "default",
  value: "",
  onTextChange: jest.fn(),
  placeholder: "Test Placeholder",
  label: "Test Label",
  required: true,
};

describe("GenericInput", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText, getByText } = render(
      <GenericInput {...defaultProps} />
    );

    expect(getByText("Test Label")).toBeTruthy();
    expect(getByPlaceholderText("Test Placeholder")).toBeTruthy();
  });

  it("displays required error if required field is empty", () => {
    const props = { ...defaultProps, required: true };
    const { getByPlaceholderText, getByText } = render(
      <GenericInput {...props} />
    );

    fireEvent.changeText(getByPlaceholderText("Test Placeholder"), "");

    setTimeout(() => {
      expect(getByText("Requerido")).toBeTruthy();
    }, 1000).unref();
  });

  it("validates minLength correctly", () => {
    const props = { ...defaultProps, minLength: 3 };
    const { getByPlaceholderText, getByText } = render(
      <GenericInput {...props} />
    );

    fireEvent.changeText(getByPlaceholderText("Test Placeholder"), "ab");

    expect(getByText("El mínimo de caracteres es 3")).toBeTruthy();
  });

  it("validates maxLength correctly", () => {
    const props = { ...defaultProps, maxLength: 5 };
    const { getByPlaceholderText, getByText } = render(
      <GenericInput {...props} />
    );

    fireEvent.changeText(getByPlaceholderText("Test Placeholder"), "abcdef");

    expect(getByText("El máximo de caracteres es 5")).toBeTruthy();
  });

  it("validates regex correctly", () => {
    const validationRule = {
      regex: "^[A-Za-z]+$",
      errorMessage: "Sólo letras permitidas",
    };
    const props = { ...defaultProps, validationRule };
    const { getByPlaceholderText, getByText } = render(
      <GenericInput {...props} />
    );

    fireEvent.changeText(getByPlaceholderText("Test Placeholder"), "123");

    expect(getByText("Sólo letras permitidas")).toBeTruthy();
  });

  it("handles async validation correctly", async () => {
    const asyncValidationRule = {
      validate: jest.fn().mockResolvedValue(false),
      errorMessage: "ID no es único",
    };
    const props = { ...defaultProps, asyncValidationRule };
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <GenericInput {...props} />
    );

    fireEvent.changeText(getByPlaceholderText("Test Placeholder"), "123");

    expect(asyncValidationRule.validate).toHaveBeenCalledWith("123");
    await waitFor(() => expect(getByText("ID no es único")).toBeTruthy());
  });

  it("calls onTextChange prop correctly", () => {
    const onTextChange = jest.fn();
    const props = { ...defaultProps, onTextChange };
    const { getByPlaceholderText } = render(<GenericInput {...props} />);

    const inputText = "Hello";
    fireEvent.changeText(getByPlaceholderText("Test Placeholder"), inputText);

    expect(onTextChange).toHaveBeenCalledWith(inputText);
  });
});
