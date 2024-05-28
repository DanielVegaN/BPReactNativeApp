import React, { useState } from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

const AlertMessage = ({
  message,
  title,
}: {
  message: string;
  title: string;
}) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <Modal testID="modal" onRequestClose={() => setIsVisible(false)} visible={isVisible}>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text style={{ marginBottom: 10 }}>{message}</Text>
        <Button onPress={() => setIsVisible(false)} title={"Entendido"} />
      </View>
    </Modal>
  );
};

export default AlertMessage;
