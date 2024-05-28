import React from "react";
import { Product } from "../services/productServices";
import { ListRenderItemInfo, Text, View, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    fontWeight: "semibold",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "normal",
  },
});

const ProductElement = ({ item }: ListRenderItemInfo<Product>) => {
  return (
    <View style={styles.item} testID="product-item">
      <View style={styles.descriptionContainer} testID="description-container">
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>ID: {item.id}</Text>
      </View>
      <AntDesign name="right" size={24} color="black" testID="right-icon" />
    </View>
  );
};

export default ProductElement;
