import { render, screen } from "@testing-library/react-native";
import LogoDetail from "../LogoDetail";
import { ElementDetailProps } from "../../interfaces/elementDetail";

const mockProductData: ElementDetailProps = {
  name: "Logo",
  value: "https://example.com/logo.png",
};

describe("LogoDetail", () => {
  test("renders logo details with name and image", () => {
    render(<LogoDetail {...mockProductData} />);
    expect(screen.getByText(mockProductData.name)).toBeTruthy();
    const logoImage = screen.getByTestId("logo-image");
    expect(logoImage).toBeTruthy();
  });

  test("renders appropriate image source based on value prop", () => {
    const { queryByTestId } = render(<LogoDetail {...mockProductData} />);
    const logoImage = queryByTestId("logo-image");
    if (logoImage) {
      expect(logoImage.props.source.uri).toBe(mockProductData.value);
    }
    expect(logoImage).toBeTruthy();
  });
});
