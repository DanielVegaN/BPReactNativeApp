import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ProductContext } from "../../services/ProductContextProvider";
import SearchBarLayout from "../../components/SearchBarLayout"; // Adjust the path as necessary
import { debounce } from "lodash";
import { Product } from "../../interfaces/product";

// Mock lodash debounce
jest.mock("lodash", () => ({
  debounce: jest.fn((fn) => fn),
}));

describe("SearchBarLayout", () => {
  const mockSetProducts = jest.fn();
  const fullProducts: Product[] = [
    {
      id: "1",
      name: "Test Product 1",
      description: "Description 1",
      logo: "logo1.png",
      date_release: "2024-01-01",
      date_revision: "2024-06-01",
    },
    {
      id: "2",
      name: "Test Product 2",
      description: "Description 2",
      logo: "logo2.png",
      date_release: "2024-01-02",
      date_revision: "2024-06-02",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <ProductContext.Provider
        value={{
          fullProducts,
          setProducts: mockSetProducts,
          fetchProducts: jest.fn(),
          products: fullProducts,
          setFullProducts: mockSetProducts,
        }}
      >
        <SearchBarLayout />
      </ProductContext.Provider>
    );

    expect(getByPlaceholderText("Search...")).toBeTruthy();
  });

  it("filters products correctly on text input", async () => {
    const { getByPlaceholderText } = render(
      <ProductContext.Provider
        value={{
          fullProducts,
          setProducts: mockSetProducts,
          fetchProducts: jest.fn(),
          products: fullProducts,
          setFullProducts: mockSetProducts,
        }}
      >
        <SearchBarLayout />
      </ProductContext.Provider>
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.changeText(input, "Test Product 1");

    await waitFor(() => {
      expect(mockSetProducts).toHaveBeenCalledWith([
        {
          id: "1",
          name: "Test Product 1",
          description: "Description 1",
          logo: "logo1.png",
          date_release: "2024-01-01",
          date_revision: "2024-06-01",
        },
      ]);
    });
  });

  it("calls debounce function when input changes", () => {
    const debouncedFn = jest.fn();
    (debounce as jest.Mock).mockImplementation((fn) => debouncedFn);

    const { getByPlaceholderText } = render(
      <ProductContext.Provider
        value={{
          fullProducts,
          setProducts: mockSetProducts,
          fetchProducts: jest.fn(),
          products: fullProducts,
          setFullProducts: mockSetProducts,
        }}
      >
        <SearchBarLayout />
      </ProductContext.Provider>
    );

    const input = getByPlaceholderText("Search...");
    fireEvent.changeText(input, "Test");

    expect(debouncedFn).toHaveBeenCalled();
  });
});
