import React from "react";
import { render } from "@testing-library/react-native";
import ProductEdit from "../../productEdit/[id]";

jest.mock("@/src/features/HeaderScreen", () => "HeaderScreen");
jest.mock("@/src/components/ProductEditLayout", () => "ProductEditLayout");

describe("ProductEdit", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(<ProductEdit />);

    const mainView = getByTestId("product-edit-view");
    expect(mainView).toBeTruthy();
  });

  it("renders HeaderScreen and ProductEditLayout components correctly", () => {
    const { getByTestId } = render(<ProductEdit />);

    const headerScreen = getByTestId("HeaderScreen");
    expect(headerScreen).toBeTruthy();

    const productEditLayout = getByTestId("ProductEditLayout");
    expect(productEditLayout).toBeTruthy();
  });
});
