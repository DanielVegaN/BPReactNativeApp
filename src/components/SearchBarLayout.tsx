import { useContext } from "react";
import { debounce } from "lodash";
import { ProductContext } from "../services/ProductContextProvider";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import InputComponent from "../features/InputComponent";

const SearchBarLayout = () => {
  const { fullProducts, setProducts } = useContext(ProductContext);

  const debouncedHandleChangeValue = debounce((search: string) => {
    const filteredProducts = fullProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setProducts(filteredProducts);
  }, 500);

  return (
    <View
      style={{
        width: "100%",
        marginTop: 10,
        borderRadius: 10,
        borderColor: "#000",
      }}
    >
      <InputComponent placeholder="Search..." onChangeText={debouncedHandleChangeValue} />
    </View>
  );
};

export default SearchBarLayout;
