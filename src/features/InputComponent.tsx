import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { InputProps } from "../interfaces/input";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    padding: 10,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#c1c1c1",
    backgroundColor: "#fff",
    padding: 15,
  }
});

const InputComponent: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder
}) => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder={placeholder} />
    </View>
  );
};

export default InputComponent;
