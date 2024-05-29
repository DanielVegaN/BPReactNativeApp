import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "../interfaces/button";

const ButtonComponent: React.FC<ButtonProps> = ({ styles, onPress, text }) => {
  return (
    <TouchableOpacity testID="button-component" style={[...styles.button]} onPress={() => onPress()}>
      <Text style={[...styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
