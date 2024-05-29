import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputComponent from "../InputComponent";
import { InputProps } from "../../interfaces/input";

describe('InputComponent', () => {
  it('renders correctly with given props', () => {
    const props: InputProps = {
      value: 'test',
      onChangeText: jest.fn(),
      placeholder: 'Enter text'
    };

    const { getByPlaceholderText, getByDisplayValue } = render(<InputComponent {...props} />);

    expect(getByPlaceholderText('Enter text')).toBeTruthy();
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const onChangeTextMock = jest.fn();
    const props: InputProps = {
      value: '',
      onChangeText: onChangeTextMock,
      placeholder: 'Enter text'
    };

    const { getByPlaceholderText } = render(<InputComponent {...props} />);
    const input = getByPlaceholderText('Enter text');

    fireEvent.changeText(input, 'new text');
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });
});