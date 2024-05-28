import React from "react";
import { render, waitFor, screen, act } from "@testing-library/react-native";
import ProductLayout from "../ProductLayout";
import * as productServices from "../../services/productServices";

jest.mock("../../services/productServices", () => ({
  useFetchProducts: jest.fn(),
}));

jest.mock("../../common/AlertMessage", () => jest.fn(() => null));
jest.mock("../../common/ProductList", () => jest.fn(() => null));

describe("ProductLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    (productServices.useFetchProducts as jest.Mock).mockResolvedValue({
      data: [],
      errorAxios: null,
    });

    const { getByText } = render(<ProductLayout />);
    expect(getByText("Loading...")).toBeTruthy();
    await waitFor(() => expect(getByText("Loading...")).not.toBeNull());

    expect(productServices.useFetchProducts).toHaveBeenCalled();
  });

  it("renders alert when error state change", async () => {
    (productServices.useFetchProducts as jest.Mock).mockResolvedValue({
      data: [],
      errorAxios: "Test Error",
    });

    const { getByText } = render(<ProductLayout />);
    expect(getByText("Loading...")).toBeTruthy();
    await waitFor(() => expect(getByText("Loading...")).not.toBeNull());
    setTimeout(async () => {
      await waitFor(() => {
        expect(getByText("Por favor intente nuevamente")).toBeTruthy();
      });
      await waitFor(() => expect(getByText("Algo salió mal!")).toBeTruthy());
    }, 1000).unref();

    expect(productServices.useFetchProducts).toHaveBeenCalled();
  });

  it("renders products after fetching data", async () => {
    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    (productServices.useFetchProducts as jest.Mock).mockResolvedValue({
      data: products,
      errorAxios: null,
    });

    const { getByText } = render(<ProductLayout />);
    expect(getByText("Loading...")).toBeTruthy();
    await waitFor(() => expect(getByText("Loading...")).not.toBeNull());
    setTimeout(async () => {
      await waitFor(() => {
        expect(getByText("Product 1")).toBeTruthy();
        expect(getByText("Product 2")).toBeTruthy();
      });
    }, 1000).unref();
  });
});
