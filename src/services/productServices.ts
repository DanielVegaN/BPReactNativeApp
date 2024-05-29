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

export const useUpdateProduct = async (product: Product) => {
  let errorAxios: any = null;
  try {
    let data = JSON.stringify(product);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${urlGetProducts}/${product.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return { errorAxios, response: response.data };
  } catch (error) {
    const errorAxios = error;
    return { errorAxios, response: false };
  }
};

export const useCreateProduct = async (product: Product) => {
  let errorAxios: any = null;
  try {
    let data = JSON.stringify(product);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${urlGetProducts}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    return { errorAxios, response: response.data };
  } catch (error) {
    const errorAxios = error;
    return { errorAxios, response: false };
  }
};

export const useValidateId = async (id: string): Promise<boolean> => {
  try {
    const response = await axios.get(`${urlGetProducts}/verification/${id}`);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
