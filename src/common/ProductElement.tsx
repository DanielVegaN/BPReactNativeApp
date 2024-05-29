import {
  ListRenderItemInfo,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Product } from "../interfaces/product";
import { Link } from "expo-router";

const styles = StyleSheet.create({
  link: {
    flex: 1,
    width: "100%",
    marginBottom: 5,
  },
  item: {
    width: "100%",
    flex: 1,
    padding: 20,
    flexDirection: "row",
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
    <Link
      href={{
        pathname: "/productDetail",
        params: { product: JSON.stringify(item) },
      }}
      style={styles.link}
    >
      <View style={styles.item} testID="product-item">
        <View
          style={styles.descriptionContainer}
          testID="description-container"
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>ID: {item.id}</Text>
        </View>
        <AntDesign name="right" size={24} color="black" testID="right-icon" />
      </View>
    </Link>
  );
};

export default ProductElement;
