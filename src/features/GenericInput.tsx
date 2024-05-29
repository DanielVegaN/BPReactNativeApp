import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { GenericInputProps } from "../interfaces/genericInput";


const GenericInput: React.FC<GenericInputProps> = ({
  type = "default",
  validationRule,
  asyncValidationRule,
  placeholder,
  value,
  onTextChange,
  minLength,
  maxLength,
  label,
  required,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleTextChange = async (text: string) => {
    setInputValue(text);
    if (required && text === "") {
      setError("Requerido");
    }

    if (minLength && text.length < minLength) {
      setError(`El mínimo de caracteres es ${minLength}`);
      return;
    }

    if (maxLength && text.length > maxLength) {
      setError(`El máximo de caracteres es ${maxLength}`);
      return;
    }

    if (validationRule) {
      const isValid = new RegExp(validationRule.regex).test(text);
      if (!isValid) {
        setError(validationRule.errorMessage);
        return;
      }
    }

    if (asyncValidationRule) {
      setIsLoading(true);
      const isValid = await asyncValidationRule.validate(text);
      setIsLoading(false);
      if (!isValid) {
        setError(asyncValidationRule.errorMessage);
        return;
      }
    }
    setError(null);

    onTextChange(text);
  };

  const getInputStyles = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.input];
    if (error) {
      baseStyles.push(styles.invalidInput);
    }
    return baseStyles;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={getInputStyles()}
        placeholder={placeholder}
        value={inputValue}
        onChangeText={(e) => handleTextChange(e)}
        keyboardType={type}
        maxLength={maxLength}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="red" />
      ) : (
        error && <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500"
  },
  input: {
    borderColor: "#c1c1c1",
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    height: 50
  },
  invalidInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default GenericInput;
