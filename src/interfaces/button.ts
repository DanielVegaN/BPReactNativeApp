import { StyleSheet } from "react-native";

export interface ButtonProps {
  styles: {
    button: object[],
    text: object[]
  };
  onPress: () => void;
  text: string;
}