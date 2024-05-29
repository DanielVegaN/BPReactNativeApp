import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ButtonComponent from "./ButtonComponent";
import { Product } from "../interfaces/product";

interface PopupProps {
  isVisible: boolean;
  onHide: () => void;
  onDelete: () => void;
  styles: {
    button: { confirm: object[]; cancel: object[] };
    text: { confirm: object[]; cancel: object[] };
  };
  product: Product;
}

const stylesPopup = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popup: {
    position: "absolute",
    width: "100%",
    height: "50%",
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  message: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 60,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});

const PopupComponent: React.FC<PopupProps> = ({
  isVisible,
  onHide,
  onDelete,
  styles: { button, text },
  product,
}) => {
  const animatedValue = useState(new Animated.Value(0))[0];
  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isVisible ? 1 : 0,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  if (!isVisible) return null;

  return (
    <View style={stylesPopup.container} testID="popupContainer">
      <Animated.View
        style={[stylesPopup.overlay, { opacity: animatedValue }]}
      />
      <Animated.View
        style={[stylesPopup.popup, { transform: [{ translateY }] }]}
      >
        <TouchableOpacity onPress={onHide} style={stylesPopup.closeButton}>
          <Entypo name="cross" size={24} color="black" />
        </TouchableOpacity>
        <Text testID="message" style={stylesPopup.message}>
          ¿Está seguro de eliminar el producto {product.name}?
        </Text>
        <View style={stylesPopup.buttonContainer}>
          <ButtonComponent
            text={"Confirmar"}
            onPress={onDelete}
            styles={{
              button: button.confirm,
              text: text.confirm,
            }}
          />
          <ButtonComponent
            text={"Cancelar"}
            onPress={onHide}
            styles={{
              button: button.cancel,
              text: text.cancel,
            }}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default PopupComponent;
