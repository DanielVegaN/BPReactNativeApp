import React, { useContext, useEffect } from "react";
import { Text } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import ProductProvider, {
  ProductContext,
} from "../../services/ProductContextProvider";
import { useFetchProducts } from "../../services/productServices";
import { Product } from "../../interfaces/product";

jest.mock("../../services/productServices", () => ({
  useFetchProducts: jest.fn(),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    logo: "logo1.png",
    date_release: "2024-01-01",
    date_revision: "2024-06-01",
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description 2",
    logo: "logo2.png",
    date_release: "2024-01-02",
    date_revision: "2024-06-02",
  },
];

describe("ProductProvider", () => {
  beforeEach(() => {
    (useFetchProducts as jest.Mock).mockResolvedValue({ data: mockProducts });
  });

  it("provides products context to its children", async () => {
    const TestComponent = () => {
      const { products, fullProducts } = useContext(ProductContext);

      return (
        <>
          <Text testID="products-length">{products.length}</Text>
          <Text testID="full-products-length">{fullProducts.length}</Text>
        </>
      );
    };

    const { getByTestId } = render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    await waitFor(() => {
      expect(getByTestId("products-length").props.children).toBe(2);
      expect(getByTestId("full-products-length").props.children).toBe(2);
    });
  });

  it("fetches and sets products on mount", async () => {
    const { getByTestId } = render(
      <ProductProvider>
        <Text testID="products-length" />
      </ProductProvider>
    );

    await waitFor(() => {
      setTimeout(() => {
        expect(useFetchProducts).toHaveBeenCalled();
        expect(getByTestId("products-length").props.children).toBe(2);
      }, 1000).unref();
    });
  });

  it("updates products correctly", async () => {
    const TestComponent = () => {
      const { products, setProducts } = useContext(ProductContext);

      useEffect(() => {
        setProducts([mockProducts[0]]);
      }, [setProducts]);

      return <Text testID="products-length">{products.length}</Text>;
    };

    const { getByTestId } = render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    await waitFor(() => {
      expect(getByTestId("products-length").props.children).toBe(1);
    });
  });
});
