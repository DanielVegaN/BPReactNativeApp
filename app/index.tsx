import { View } from "react-native";
import HeaderScreen from "@/src/features/HeaderScreen";
import ProductLayout from "@/src/components/ProductLayout";
import SearchBarLayout from "@/src/components/SearchBarLayout";

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
      <SearchBarLayout />
      <ProductLayout />
    </View>
  );
}
