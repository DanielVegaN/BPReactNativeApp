import { urlGetProducts } from "../Types/FetcherTypes";
import axios from "axios";

export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

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
