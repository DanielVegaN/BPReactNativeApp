import { Product } from "../interfaces/product";
import { urlGetProducts } from "../Types/FetcherTypes";
import axios from "axios";

export const useFetchProducts = async () => {
  let data: Product[] | [] = [];
  let errorAxios: any = null;

  try {
    const response = await axios.get(urlGetProducts);
    data = response.data.data;
  } catch (errorCatch) {
    errorAxios = errorCatch;
  }
  return { data, errorAxios };
};

export const useDeleteProduct = async (id: string) => {
  let errorAxios: any = null;
  try {
    await axios.delete(`${urlGetProducts}/${id}`);
    return { errorAxios, response: true };
  } catch (error) {
    const errorAxios = error;
    return { errorAxios, response: false };
  }
};
