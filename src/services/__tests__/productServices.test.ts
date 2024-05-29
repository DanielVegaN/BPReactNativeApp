import { urlGetProducts } from "@/src/Types/FetcherTypes";
import { useDeleteProduct, useFetchProducts } from "../productServices";
import axios from "axios";
jest.mock("axios");

const mockResponse = {
  data: {
    data: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ],
  },
};

describe("useFetchProducts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return products data when API call is successful", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const { data, errorAxios } = await useFetchProducts();

    expect(data).toEqual(mockResponse.data.data);
    expect(errorAxios).toBeNull();
  });

  it("should return an empty array when API returns no data", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } });

    const { data, errorAxios } = await useFetchProducts();

    expect(data).toEqual([]);
    expect(errorAxios).toBeNull();
  });

  it("should return an error when API call fails", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const errorMessage = "Network Error";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { data, errorAxios } = await useFetchProducts();

    expect(data).toEqual([]);
    expect(errorAxios).toBeInstanceOf(Error);
    expect(errorAxios.message).toBe(errorMessage);
  });
});

describe("useDeleteProduct", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return response true when API call is successful", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.delete.mockResolvedValueOnce({});

    const { errorAxios, response } = await useDeleteProduct("1");

    expect(response).toBe(true);
    expect(errorAxios).toBeNull();
  });

  it("should return response false when API call fails", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const errorMessage = "Network Error";
    mockedAxios.delete.mockRejectedValueOnce(new Error(errorMessage));

    const { errorAxios, response } = await useDeleteProduct("1");

    expect(response).toBe(false);
    expect(errorAxios).toBeInstanceOf(Error);
    expect(errorAxios.message).toBe(errorMessage);
  });

  it("should call axios.delete with the correct URL", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const productId = "2";
    mockedAxios.delete.mockResolvedValueOnce({});

    await useDeleteProduct(productId);

    expect(mockedAxios.delete).toHaveBeenCalledWith(
      `${urlGetProducts}/${productId}`
    );
  });
});
