import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import GenericInput from "../features/GenericInput";
import { useContext, useEffect, useState } from "react";
import { useUpdateProduct, useValidateId } from "../services/productServices";
import { AsyncValidationRule } from "../interfaces/genericInput";
import { ProductContext } from "../services/ProductContextProvider";
import ButtonComponent from "../features/ButtonComponent";
import { Product } from "../interfaces/product";

const ProductEditLayout = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { fullProducts, fetchProducts } = useContext(ProductContext);
  const navigation = useNavigation();
  const [idProduct, setIdProduct] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [dateRelease, setDateRelease] = useState<string>("");
  const [dateRevision, setDateRevision] = useState<string>("");
  const [errors, setErrors] = useState();

  useEffect(() => {
    if (fullProducts && id) {
      const productEdit = fullProducts.find((item) => item.id === id);
      if (productEdit) {
        setIdProduct(productEdit.id);
        setName(productEdit.name);
        setDescription(productEdit.description);
        setLogo(productEdit.logo);
        setDateRelease(productEdit.date_release);
        setDateRevision(productEdit.date_revision);
      } else {
        navigation.navigate("index" as never);
      }
    }
  }, [fullProducts, id]);

  const validationId = async (id: string) => {
    return await useValidateId(id);
  };

  const asyncValidationObject: AsyncValidationRule = {
    validate: validationId,
    errorMessage: "ID no es único",
  };

  const handleEdit = async () => {
    const productEdit: Product = {
      id: idProduct,
      date_release: dateRelease,
      date_revision: dateRevision,
      description: description,
      logo: logo,
      name: name,
    };
    try {
      const response = await useUpdateProduct(productEdit);
      if(!response.errorAxios){
        fetchProducts();
        navigation.navigate("index" as never);
      }
    } catch (error) {
      setErrors(error as any);
    }
  };

  return (
    <View style={styles.containerLayout}>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Formulario de Registro</Text>
        <GenericInput
          label="ID"
          onTextChange={setIdProduct}
          required
          value={idProduct}
          maxLength={10}
          minLength={3}
          asyncValidationRule={asyncValidationObject}
          placeholder="ID"
        />
        <GenericInput
          label="Nombre"
          onTextChange={setName}
          required
          value={name}
          maxLength={100}
          minLength={5}
          placeholder="Nombre"
        />
        <GenericInput
          label="Descripción"
          onTextChange={setDescription}
          required
          value={description}
          maxLength={10}
          minLength={200}
          placeholder="Descripción"
        />
        <GenericInput
          label="Logo"
          onTextChange={setLogo}
          required
          value={logo}
          placeholder="Logo"
        />
        <GenericInput
          label="Fecha Liberación"
          onTextChange={setDateRelease}
          required
          value={dateRelease}
          placeholder="Fecha Liberación"
        />
        <GenericInput
          label="Fecha Revisión"
          onTextChange={setDateRevision}
          required
          value={dateRevision}
          placeholder="Fecha Revisión"
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent
          text={"Editar"}
          onPress={() => handleEdit()}
          styles={{
            button: [styles.button, styles.buttonConfirm],
            text: [styles.buttonText, styles.buttonTextEdit],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLayout: {
    justifyContent: "space-between",
    flexDirection: "column",
  },
  containerForm: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
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
  buttonTextEdit: {
    color: "#0f265c",
  },
  buttonConfirm: {
    backgroundColor: "#ffdd02",
  },
});

export default ProductEditLayout;
