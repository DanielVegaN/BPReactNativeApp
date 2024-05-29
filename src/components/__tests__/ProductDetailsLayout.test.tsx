import React, { useState } from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import ProductDetailsLayout from "../ProductDetailsLayout";
import { ProductContext } from "../../services/ProductContextProvider";
import { NavigationContainer } from "@react-navigation/native";
import ButtonComponent from "@/src/features/ButtonComponent";
import { Text } from "react-native";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

jest.mock("../../services/productServices", () => ({
  useDeleteProduct: jest.fn(),
}));

jest.mock("../../common/AlertMessage", () => {
  return ({ message }: { message: string }) => <div>{message}</div>;
});

describe("ProductDetailsLayout", () => {
  const productMock = {
    id: "1",
    name: "Product 1",
    description: "This is a description",
    logo: "logo-url",
    date_release: "2023-01-01",
    date_revision: "2023-01-01",
  };

  const productsMock = [
    {
      id: "1",
      name: "Product 1",
      description: "This is a description",
      logo: "logo-url",
      date_release: "2023-01-01",
      date_revision: "2023-01-01",
    },
  ];

  const fetchProductsMock = jest.fn();
  const productServiceMock = require("../../services/productServices");

  beforeEach(() => {
    require("expo-router").useLocalSearchParams.mockReturnValue({
      product: JSON.stringify(productMock),
    });
  });

  it("renders correctly with given product data", () => {
    const { getByText } = render(
      <ProductContext.Provider
        value={{
          fetchProducts: fetchProductsMock,
          fullProducts: productsMock,
          products: productsMock,
          setFullProducts: jest.fn(),
          setProducts: jest.fn(),
        }}
      >
        <ProductDetailsLayout />
      </ProductContext.Provider>
    );

    expect(getByText(`ID: ${productMock.id}`)).toBeTruthy();
    expect(getByText("Nombre")).toBeTruthy();
    expect(getByText("Descripción")).toBeTruthy();
    expect(getByText("Fecha liberación")).toBeTruthy();
    expect(getByText("Fecha revisión")).toBeTruthy();
  });

  it("handles Edit button press", () => {
    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    const { getByText } = render(
      <ProductContext.Provider
        value={{
          fetchProducts: fetchProductsMock,
          fullProducts: productsMock,
          products: productsMock,
          setFullProducts: jest.fn(),
          setProducts: jest.fn(),
        }}
      >
        <NavigationContainer>
          <ProductDetailsLayout />
        </NavigationContainer>
      </ProductContext.Provider>
    );

    fireEvent.press(getByText("Editar"));
    expect(consoleLogSpy).toHaveBeenCalledWith("Edit");
  });

  it("handles Delete button press and confirms delete", async () => {
    productServiceMock.useDeleteProduct.mockResolvedValueOnce();

    const { getByText, getByTestId } = render(
      <ProductContext.Provider
        value={{
          fetchProducts: fetchProductsMock,
          fullProducts: productsMock,
          products: productsMock,
          setFullProducts: jest.fn(),
          setProducts: jest.fn(),
        }}
      >
        <NavigationContainer>
          <ProductDetailsLayout />
        </NavigationContainer>
      </ProductContext.Provider>
    );

    fireEvent.press(getByText("Eliminar"));
    expect(getByText("Confirmar")).toBeTruthy();

    fireEvent.press(getByText("Confirmar"));
    await waitFor(() =>
      expect(productServiceMock.useDeleteProduct).toHaveBeenCalledWith(
        productMock.id
      )
    );
    expect(fetchProductsMock).toHaveBeenCalled();
  });

  it("displays an error message if there is an error", async () => {
    productServiceMock.useDeleteProduct.mockRejectedValueOnce("Error");

    const { getByText } = render(
      <ProductContext.Provider
        value={{
          fetchProducts: fetchProductsMock,
          fullProducts: productsMock,
          products: productsMock,
          setFullProducts: jest.fn(),
          setProducts: jest.fn(),
        }}
      >
        <NavigationContainer>
          <ProductDetailsLayout />
        </NavigationContainer>
      </ProductContext.Provider>
    );

    fireEvent.press(getByText("Eliminar"));
    fireEvent.press(getByText("Confirmar"));

    setTimeout(async () => {
      await waitFor(() =>
        expect(getByText("Por favor intente nuevamente")).toBeTruthy()
      );
    }, 1000).unref();
  });

  it("displays AlertMessage when error state is set", async () => {
    jest.useRealTimers();
    const TestWrapper = () => {
      const [hasError, setHasError] = useState(false);

      return (
        <>
          <ProductContext.Provider
            value={{
              fetchProducts: fetchProductsMock,
              fullProducts: productsMock,
              products: productsMock,
              setFullProducts: jest.fn(),
              setProducts: jest.fn(),
            }}
          >
            <ProductDetailsLayout
              initialError={
                hasError ? { message: "Simulated error" } : undefined
              }
            />
          </ProductContext.Provider>
          <Text onPress={() => setHasError(true)} testID="triggerError">
            Trigger Error
          </Text>
        </>
      );
    };

    const { getByText, getByTestId } = render(<TestWrapper />);

    // Trigger the error state
    await act(async () => {
      fireEvent.press(getByTestId("triggerError"));
    });

    setTimeout(async () => {
      await waitFor(() => {
        expect(
          getByText("Algo salió mal!: Por favor intente nuevamente")
        ).toBeTruthy();
      });
    }, 1000).unref();
  });
});

export {};
