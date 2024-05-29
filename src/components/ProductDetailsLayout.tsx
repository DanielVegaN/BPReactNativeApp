import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../interfaces/product";
import ElementDetail from "../features/ElementDetail";
import LogoDetail from "../features/LogoDetail";
import ButtonComponent from "../features/ButtonComponent";
import PopupComponent from "../features/PopupComponent";
import { useDeleteProduct } from "../services/productServices";

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  container: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    borderColor: "#000",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  containerElements: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "semibold",
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    width: "100%",
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
  buttonDelete: {
    backgroundColor: "#d60806",
  },
  buttonTextEdit: {
    color: "#0f265c",
  },
  buttonTextDelete: {
    color: "#fff",
  },
  buttonConfirm: {
    backgroundColor: "#ffdd02",
  },
});

const ProductDetailsLayout = () => {
  const { product } = useLocalSearchParams();
  const [productJson, setProductJson] = useState<Product>();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setProductJson(JSON.parse(product as string));
    }
  }, [product]);

  const handleEdit = () => {
    console.log("Edit");
  };

  const handlePopUp = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleDelete = async () => {
    if (productJson) {
      try {
        await useDeleteProduct(productJson.id);
        setIsPopupVisible(!isPopupVisible);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    productJson && (
      <View style={styles.topContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>ID: {productJson.id}</Text>
          <Text style={styles.subtitle}>Información extra</Text>
          <View style={styles.containerElements}>
            <ElementDetail name={"Nombre"} value={productJson.name} />
            <ElementDetail
              name={"Descripción"}
              value={productJson.description}
            />
            <LogoDetail name={"Logo"} value={productJson.logo} />
            <ElementDetail
              name={"Fecha liberación"}
              value={productJson.date_release}
            />
            <ElementDetail
              name={"Fecha revisión"}
              value={productJson.date_revision}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonComponent
            text={"Editar"}
            onPress={handleEdit}
            styles={{
              button: [styles.button, styles.buttonEdit],
              text: [styles.buttonText, styles.buttonTextEdit],
            }}
          />
          <ButtonComponent
            text={"Eliminar"}
            onPress={handlePopUp}
            styles={{
              button: [styles.button, styles.buttonDelete],
              text: [styles.buttonText, styles.buttonTextDelete],
            }}
          />
        </View>
        <PopupComponent
          isVisible={isPopupVisible}
          onHide={handlePopUp}
          onDelete={handleDelete}
          styles={{
            button: {
              confirm: [styles.button, styles.buttonConfirm],
              cancel: [styles.button, styles.buttonEdit],
            },
            text: {
              confirm: [styles.buttonText, styles.buttonTextEdit],
              cancel: [styles.buttonText, styles.buttonTextEdit],
            },
          }}
          product={productJson}
        />
      </View>
    )
  );
};

export default ProductDetailsLayout;
