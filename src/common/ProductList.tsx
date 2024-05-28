import React from "react";
import { Product } from "../services/productServices";
import { FlatList, View } from "react-native";
import ProductElement from "./ProductElement";

const ProductList: React.FC<{ products: Product[] | [] }> = ({ products }) => {
  return products.length === 0 ? (
    <View />
  ) : (
    <FlatList testID="product-list"
      style={{ flex: 1 }}
      data={products}
      renderItem={ProductElement}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ProductList;
