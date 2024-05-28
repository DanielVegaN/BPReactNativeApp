import { View } from "react-native";
import HeaderScreen from "@/src/features/HeaderScreen";
import ProductLayout from "@/src/components/ProductLayout";

export default function Products() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderScreen />
      <ProductLayout />
    </View>
  );
}
