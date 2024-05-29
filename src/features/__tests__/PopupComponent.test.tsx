import { render, screen, fireEvent } from "@testing-library/react-native";
import PopupComponent from "../PopupComponent"; 
import { Product } from "../../interfaces/product"; 

const mockProduct: Product = {
  id: "1",
  name: "Product Name",
  description: "This is a product description",
  logo: "https://example.com/logo.png",
  date_release: "2024-05-28",
  date_revision: "2024-05-28",
};

describe("PopupComponent", () => {
  test("renders popup with product name when visible", () => {
    render(
      <PopupComponent
        isVisible={true}
        product={mockProduct}
        onHide={jest.fn()}
        onDelete={jest.fn()}
        styles={{
          button: { confirm: [], cancel: [] },
          text: { confirm: [], cancel: [] },
        }}
      />
    );

    expect(
      `¿Está seguro de eliminar el producto ${mockProduct.name}?`
    ).toBeTruthy();
  });

  test("hides popup on close button press", async () => {
    const onHideMock = jest.fn();
    render(
      <PopupComponent
        isVisible={true}
        product={mockProduct}
        onHide={onHideMock}
        onDelete={jest.fn()}
        styles={{
          button: { confirm: [], cancel: [] },
          text: { confirm: [], cancel: [] },
        }}
      />
    );

    const closeButton = await screen.findAllByTestId("button-component");
    fireEvent.press(closeButton[1]);

    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  test("calls onDelete on confirm button press", () => {
    const onDeleteMock = jest.fn();
    render(
      <PopupComponent
        isVisible={true}
        product={mockProduct}
        onHide={jest.fn()}
        onDelete={onDeleteMock}
        styles={{
          button: { confirm: [], cancel: [] },
          text: { confirm: [], cancel: [] },
        }}
      />
    );

    const confirmButton = screen.getByText("Confirmar");
    fireEvent.press(confirmButton);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });

  test("animates popup on show", () => {
    render(
      <PopupComponent
        isVisible={true}
        product={mockProduct}
        onHide={jest.fn()}
        onDelete={jest.fn()}
        styles={{
          button: { confirm: [], cancel: [] },
          text: { confirm: [], cancel: [] },
        }}
      />
    );

    jest.advanceTimersByTime(100);
    jest.advanceTimersByTime(500);

    const popup = screen.getByTestId("popupContainer");

    setTimeout(() => {
      expect(popup.props.style).toEqual({
        opacity: 1,
        transform: [{ translateY: 0 }],
      });  
    }, 1000).unref();    
  });
});
