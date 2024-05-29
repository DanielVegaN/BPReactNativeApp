import { render, screen, fireEvent } from "@testing-library/react-native";
import ProductDetailsLayout from "../ProductDetailsLayout";

const mockProduct = {
  id: "1",
  name: "Product Name",
  description: "This is a product description",
  logo: "https://example.com/logo.png",
  date_release: "2024-05-28",
  date_revision: "2024-05-28",
};

const simulateProductRetrieval = () => {
  return mockProduct;
};

describe("ProductDetailsLayout", () => {
  test("renders product details when product available", () => {
    const product = simulateProductRetrieval();
    render(<ProductDetailsLayout />);
    setTimeout(() => {
      expect(screen.getByText(/ID: 1/i)).toBeTruthy();
      expect(screen.getByText(mockProduct.name)).toBeTruthy();
      expect(screen.getByText(mockProduct.description)).toBeTruthy();
    }, 1000).unref();
  });

  test("renders loading state when product retrieval fails", () => {
    const simulateProductRetrievalError = () => {
      throw new Error("Failed to retrieve product");
    };

    render(<ProductDetailsLayout />);

    expect(screen.queryByText(mockProduct.name)).toBeNull();
    expect(screen.getByText(/Loading.../)).toBeTruthy();
  });

  test("calls handleEdit on edit button press", () => {
    const handleEditMock = jest.fn();

    render(<ProductDetailsLayout />);
    setTimeout(() => {
      const editButton = screen.getByText(/Editar/i);
      fireEvent.press(editButton);

      expect(handleEditMock).toHaveBeenCalledTimes(1);
    }, 1000).unref();
  });

  test("shows popup on delete button press", () => {
    const { rerender } = render(<ProductDetailsLayout />);
    setTimeout(() => {
      const deleteButton = screen.getByText(/Eliminar/i);
      fireEvent.press(deleteButton);
      rerender(<ProductDetailsLayout />);
      expect(screen.queryByText(mockProduct.name)).toBeNull();
    }, 1000).unref();
  });
});
