import React from "react";
import { render } from "@testing-library/react-native";
import ProductList from "../ProductList";

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

test("renders empty view when no products", () => {
  const { queryByTestId } = render(<ProductList products={[]} />);
  const flatListElement = queryByTestId("product-list");
  expect(flatListElement).toBeNull();
});

test("renders FlatList when products exist", () => {
  const { getByTestId } = render(<ProductList products={mockProducts} />);
  const flatListElement = getByTestId("product-list");
  expect(flatListElement).toBeTruthy();
});

test("renders correct number of products", () => {
  const { getAllByTestId } = render(<ProductList products={mockProducts} />);
  const productElements = getAllByTestId("product-item");
  expect(productElements).toHaveLength(mockProducts.length);
});

test("renders product details correctly", () => {
  const { getByText } = render(<ProductList products={mockProducts} />);
  const product1Name = getByText("Product 1");
  const product2Name = getByText("Product 2");
  expect(product1Name).toBeTruthy();
  expect(product2Name).toBeTruthy();
});
