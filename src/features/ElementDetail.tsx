import { View, Text, StyleSheet } from "react-native";
import { ElementDetailProps } from "../interfaces/elementDetail";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    marginBottom: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  value: {
    flex: 1,
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
  }
});

const ElementDetail: React.FC<ElementDetailProps> = ({ name, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default ElementDetail;
