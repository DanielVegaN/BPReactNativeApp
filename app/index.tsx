import { StyleSheet, View } from "react-native";
import HeaderScreen from "@/src/features/HeaderScreen";
import ProductLayout from "@/src/components/ProductLayout";
import SearchBarLayout from "@/src/components/SearchBarLayout";
import ButtonComponent from "@/src/features/ButtonComponent";
import { useNavigation } from "expo-router";

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    padding: 10
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    width: "100%",
    color: "#0f265c",
    fontSize: 16,
    textAlign: "center",
  },
  buttonEdit: {
    backgroundColor: "#e9ecf3",
  },
  buttonTextEdit: {
    color: "#0f265c",
  },
  buttonConfirm: {
    backgroundColor: "#ffdd02",
  },
});

export default function Products() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderScreen />
      <SearchBarLayout />
      <ProductLayout />
      <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={() => navigation.navigate("productCreate" as never)}
          styles={{
            button: [styles.button, styles.buttonConfirm],
            text: [styles.buttonText, styles.buttonTextEdit],
          }}
          text="Agregar"
        />
      </View>
    </View>
  );
}
