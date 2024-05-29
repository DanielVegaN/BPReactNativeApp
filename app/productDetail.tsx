import { View } from "react-native";
import HeaderScreen from "@/src/features/HeaderScreen";
import ProductDetailsLayout from "@/src/components/ProductDetailsLayout";

const ProductDetail: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 0,
        padding: 0,
      }}
    >
      <HeaderScreen />
      <ProductDetailsLayout />
    </View>
  );
};

export default ProductDetail;
