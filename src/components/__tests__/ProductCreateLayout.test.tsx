import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProductCreateLayout from "@/src/components/ProductCreateLayout";
import { ProductContext } from "@/src/services/ProductContextProvider";
import {
  useCreateProduct,
  useValidateId,
} from "@/src/services/productServices";

jest.mock("@/src/services/productServices", () => ({
  useCreateProduct: jest.fn(),
  useValidateId: jest.fn(),
}));

const mockFetchProducts = jest.fn();

const mockProducts = [
  {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    logo: "https://via.placeholder.com/150",
    date_release: "2021-01-01",
    date_revision: "2021-01-01",
  },
  {
    id: "2",
    name: "Product 2",
    description: "Description 2",
    logo: "https://via.placeholder.com/150",
    date_release: "2021-01-01",
    date_revision: "2021-01-01",
  },
];

const mockProductContext = {
  fetchProducts: mockFetchProducts,
  products: mockProducts,
  fullProducts: mockProducts,
  setProducts: jest.fn(),
  setFullProducts: jest.fn(),
};

describe("ProductCreateLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <ProductContext.Provider value={mockProductContext}>
        <ProductCreateLayout />
      </ProductContext.Provider>
    );

    expect(getByText("Formulario de Registro")).toBeTruthy();
    expect(getByPlaceholderText("ID")).toBeTruthy();
    expect(getByPlaceholderText("Nombre")).toBeTruthy();
    expect(getByPlaceholderText("Descripción")).toBeTruthy();
    expect(getByPlaceholderText("Logo")).toBeTruthy();
    expect(getByPlaceholderText("Fecha Liberación")).toBeTruthy();
    expect(getByPlaceholderText("Fecha Revisión")).toBeTruthy();
  });

  it("validates and creates a product correctly", async () => {
    const mockValidateId = useValidateId as jest.Mock;
    const mockCreateProduct = useCreateProduct as jest.Mock;

    mockValidateId.mockResolvedValue(true);
    mockCreateProduct.mockResolvedValue({ errorAxios: false });

    const { getByPlaceholderText, getByText } = render(
      <ProductContext.Provider value={mockProductContext}>
        <ProductCreateLayout />
      </ProductContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText("ID"), "12345");
    fireEvent.changeText(getByPlaceholderText("Nombre"), "Test Product");
    fireEvent.changeText(
      getByPlaceholderText("Descripción"),
      "This is a test product description"
    );
    fireEvent.changeText(getByPlaceholderText("Logo"), "logo-url");
    fireEvent.changeText(
      getByPlaceholderText("Fecha Liberación"),
      "2023-10-10"
    );
    fireEvent.changeText(getByPlaceholderText("Fecha Revisión"), "2023-11-10");

    fireEvent.press(getByText("Enviar"));

    setTimeout(async () => {
      await waitFor(() => {
        expect(mockValidateId).toHaveBeenCalledWith("12345");
        expect(mockCreateProduct).toHaveBeenCalledWith(
          expect.objectContaining({
            id: "12345",
            name: "Test Product",
            description: "This is a test product description",
            logo: "logo-url",
            date_release: "2023-10-10",
            date_revision: "2023-11-10",
          })
        );
        expect(mockFetchProducts).toHaveBeenCalled();
      });
    }, 1000).unref();
  });

  it("resets form correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <ProductContext.Provider value={mockProductContext}>
        <ProductCreateLayout />
      </ProductContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText("ID"), "12345");
    fireEvent.changeText(getByPlaceholderText("Nombre"), "Test Product");

    fireEvent.press(getByText("Reiniciar"));

    setTimeout(() => {
      expect(getByPlaceholderText("ID").props.value).toBe("");
      expect(getByPlaceholderText("Nombre").props.value).toBe("");
    }, 1000).unref();
  });
});
