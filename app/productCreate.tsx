import ProductCreateLayout from "@/src/components/ProductCreateLayout";
import HeaderScreen from "@/src/features/HeaderScreen";
import React from "react";
import { View } from "react-native";

const ProductCreate = () => {
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
      <ProductCreateLayout />
    </View>
  );
};

export default ProductCreate;
