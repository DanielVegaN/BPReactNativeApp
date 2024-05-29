import axios from 'axios';
import { useFetchProducts, useDeleteProduct, useUpdateProduct, useValidateId } from '../../services/productServices';

import { urlGetProducts } from '../../Types/FetcherTypes';
import { Product } from '@/src/interfaces/product';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('productServices', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('useFetchProducts', () => {
    it('fetches products successfully', async () => {
      const products: Product[] = [{ id: '1', name: 'Test Product', description: 'Test Description', logo: 'Test Logo', date_release: '2023-01-01', date_revision: '2023-01-02' }];
      
      mockedAxios.get.mockResolvedValue({ data: { data: products } });

      const { data, errorAxios } = await useFetchProducts();

      expect(data).toEqual(products);
      expect(errorAxios).toBeNull();
      expect(mockedAxios.get).toHaveBeenCalledWith(urlGetProducts);
    });

    it('handles fetch products error', async () => {
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      const { data, errorAxios } = await useFetchProducts();

      expect(data).toEqual([]);
      expect(errorAxios).toBeInstanceOf(Error);
      expect(errorAxios.message).toBe(errorMessage);
    });
  });

  describe('useDeleteProduct', () => {
    it('deletes product successfully', async () => {
      mockedAxios.delete.mockResolvedValue({});

      const { errorAxios, response } = await useDeleteProduct('1');

      expect(response).toBe(true);
      expect(errorAxios).toBeNull();
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${urlGetProducts}/1`);
    });

    it('handles delete product error', async () => {
      const errorMessage = 'Delete Error';
      mockedAxios.delete.mockRejectedValue(new Error(errorMessage));

      const { errorAxios, response } = await useDeleteProduct('1');

      expect(response).toBe(false);
      expect(errorAxios).toBeInstanceOf(Error);
      expect(errorAxios.message).toBe(errorMessage);
    });
  });

  describe('useUpdateProduct', () => {
    it('updates product successfully', async () => {
      const product: Product = { id: '1', name: 'Updated Product', description: 'Updated Description', logo: 'Updated Logo', date_release: '2023-02-01', date_revision: '2023-02-02' };
      mockedAxios.request.mockResolvedValue({ data: product });

      const { errorAxios, response } = await useUpdateProduct(product);

      expect(response).toEqual(product);
      expect(errorAxios).toBeNull();
      expect(mockedAxios.request).toHaveBeenCalledWith(expect.objectContaining({
        method: 'put',
        url: `${urlGetProducts}/1`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(product),
      }));
    });

    it('handles update product error', async () => {
      const product: Product = { id: '1', name: 'Updated Product', description: 'Updated Description', logo: 'Updated Logo', date_release: '2023-02-01', date_revision: '2023-02-02' };
      const errorMessage = 'Update Error';
      mockedAxios.request.mockRejectedValue(new Error(errorMessage));

      const { errorAxios, response } = await useUpdateProduct(product);

      expect(response).toBe(false);
      expect(errorAxios).toBeInstanceOf(Error);
      expect(errorAxios.message).toBe(errorMessage);
    });
  });

  describe('useValidateId', () => {
    it('validates id successfully', async () => {
      mockedAxios.get.mockResolvedValue({});

      const isValid = await useValidateId('1');

      expect(isValid).toBe(true);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${urlGetProducts}/verification/1`);
    });

    it('handles validate id error', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Validation Error'));

      const isValid = await useValidateId('1');

      expect(isValid).toBe(false);
    });
  });
});