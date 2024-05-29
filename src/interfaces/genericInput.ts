import { KeyboardTypeOptions } from "react-native";

export interface ValidationRule {
  regex: string;
  errorMessage: string;
}

export interface AsyncValidationRule {
  validate: (text: string) => Promise<boolean>;
  errorMessage: string;
}

export interface GenericInputProps {
  type?: KeyboardTypeOptions;
  validationRule?: ValidationRule;
  asyncValidationRule?: AsyncValidationRule;
  placeholder?: string;
  value: string;
  onTextChange: (text: string) => void;
  minLength?: number;
  maxLength?: number;
  label: string;
  required: boolean;
}