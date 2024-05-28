import { Text, View, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    color: "#2c4071",
    marginLeft: 10,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 22,
    color: "#2c4071",
    fontWeight: "bold",
  },
});

const LogoTitle = () => {
  return (
    <View style={styles.container} testID="logo-title-container">
      <FontAwesome6 style={styles.icon} name="money-bills" />
      <Text style={styles.title} testID="logo-title">
        BANCO
      </Text>
    </View>
  );
};

export default LogoTitle;
