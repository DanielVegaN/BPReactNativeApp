import React, { useEffect, useState } from "react";
import { useFetchProducts } from "../services/productServices";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import ProductList from "../common/ProductList";
import AlertMessage from "../common/AlertMessage";
import { Product } from "../interfaces/product";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#000",
  },
});

const ProductLayout: React.FC = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, errorAxios } = await useFetchProducts();
      if (errorAxios) {
        setError(errorAxios);
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View testID="loading">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <AlertMessage
        message="Por favor intente nuevamente"
        title="Algo salió mal!"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProductList products={products} />
    </SafeAreaView>
  );
};

export default ProductLayout;
