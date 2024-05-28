import { useFetchProducts } from "../productServices";
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
