import React from "react";
import { render } from "@testing-library/react-native";
import ProductElement from "../ProductElement";

const mockProduct = {
  id: "1",
  name: "Test Product",
  description: "Test Description",
  logo: "https://via.placeholder.com/150",
  date_release: "2021-01-01",
  date_revision: "2021-01-01",
};

test("renders product name correctly", () => {
  const { getByText } = render(
    <ProductElement
      item={mockProduct}
      index={0}
      separators={{
        highlight: function (): void {
          throw new Error("Function not implemented.");
        },
        unhighlight: function (): void {
          throw new Error("Function not implemented.");
        },
        updateProps: function (
          select: "leading" | "trailing",
          newProps: any
        ): void {
          throw new Error("Function not implemented.");
        },
      }}
    />
  );
  const nameElement = getByText("Test Product");
  expect(nameElement).toBeTruthy();
});

test("renders product ID correctly", () => {
  const { getByText } = render(
    <ProductElement
      item={mockProduct}
      index={0}
      separators={{
        highlight: function (): void {
          throw new Error("Function not implemented.");
        },
        unhighlight: function (): void {
          throw new Error("Function not implemented.");
        },
        updateProps: function (
          select: "leading" | "trailing",
          newProps: any
        ): void {
          throw new Error("Function not implemented.");
        },
      }}
    />
  );
  const idElement = getByText("ID: 1");
  expect(idElement).toBeTruthy();
});

test("renders right arrow icon", () => {
  const { getByTestId } = render(
    <ProductElement
      item={mockProduct}
      index={0}
      separators={{
        highlight: function (): void {
          throw new Error("Function not implemented.");
        },
        unhighlight: function (): void {
          throw new Error("Function not implemented.");
        },
        updateProps: function (
          select: "leading" | "trailing",
          newProps: any
        ): void {
          throw new Error("Function not implemented.");
        },
      }}
    />
  );
  const iconElement = getByTestId("right-icon");
  expect(iconElement).toBeTruthy();
});

test("renders with correct styles", () => {
  const { getByTestId } = render(
    <ProductElement
      item={mockProduct}
      index={0}
      separators={{
        highlight: function (): void {
          throw new Error("Function not implemented.");
        },
        unhighlight: function (): void {
          throw new Error("Function not implemented.");
        },
        updateProps: function (
          select: "leading" | "trailing",
          newProps: any
        ): void {
          throw new Error("Function not implemented.");
        },
      }}
    />
  );
  const itemElement = getByTestId("product-item");
  const descriptionElement = getByTestId("description-container");
  expect(itemElement).toBeTruthy();
  expect(descriptionElement).toBeTruthy();
});
