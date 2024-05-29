import React from "react";
import { FlatList, View } from "react-native";
import ProductElement from "./ProductElement";
import { Product } from "../interfaces/product";

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
