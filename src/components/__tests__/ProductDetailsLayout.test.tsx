import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import ProductDetailsLayout from "../ProductDetailsLayout"
import { ProductContext } from '../../services/ProductContextProvider';
import { useDeleteProduct } from '../../services/productServices';
import { Product } from '@/src/interfaces/product';


jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('../../services/productServices', () => ({
  useDeleteProduct: jest.fn(),
}));

const mockFetchProducts = jest.fn();
const mockNavigate = jest.fn();

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'Test Logo',
  date_release: '2023-01-01',
  date_revision: '2023-01-02',
};

describe('ProductDetailsLayout', () => {
  beforeEach(() => {
    (useLocalSearchParams as jest.Mock).mockReturnValue({ product: JSON.stringify(mockProduct) });
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
    jest.spyOn(React, 'useContext').mockReturnValue({ fetchProducts: mockFetchProducts });
  });

  it('renders correctly with product details', () => {
    const { getByText } = render(<ProductDetailsLayout />);

    expect(getByText(`ID: ${mockProduct.id}`)).toBeTruthy();
    expect(getByText('Información extra')).toBeTruthy();
    expect(getByText(mockProduct.name)).toBeTruthy();
    expect(getByText(mockProduct.description)).toBeTruthy();
    expect(getByText(mockProduct.date_release)).toBeTruthy();
    expect(getByText(mockProduct.date_revision)).toBeTruthy();
  });

  it('navigates to edit screen on edit button press', () => {
    const { getByText } = render(<ProductDetailsLayout />);

    fireEvent.press(getByText('Editar'));

    expect(mockNavigate).toHaveBeenCalledWith('productEdit/[id]', { id: mockProduct.id });
  });

  it('shows / hides popup component on delete button press', () => {
    const { getByText, queryByText } = render(<ProductDetailsLayout />);

    fireEvent.press(getByText('Eliminar'));

    expect(queryByText(`¿Está seguro de eliminar el producto Test Product?`)).toBeTruthy();

    fireEvent.press(getByText('Cancelar'));

    expect(queryByText('¿Está seguro de eliminar el producto Test Product?')).toBeFalsy();
  });

  it('handles deletion successfully', async () => {
    (useDeleteProduct as jest.Mock).mockResolvedValueOnce({});
    const { getByText } = render(<ProductDetailsLayout />);

    fireEvent.press(getByText('Eliminar'));
    fireEvent.press(getByText('Confirmar'));

    await waitFor(() => {
      expect(useDeleteProduct).toHaveBeenCalledWith(mockProduct.id);
      expect(mockFetchProducts).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('index');
    });
  });

  it('shows error message if deletion fails', async () => {
    const errorMessage = 'Error deleting product';
    (useDeleteProduct as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    const { getByText } = render(<ProductDetailsLayout />);

    fireEvent.press(getByText('Eliminar'));
    fireEvent.press(getByText('Confirmar'));

    await waitFor(() => {
      expect(getByText('Por favor intente nuevamente')).toBeTruthy();
      expect(getByText('Algo salió mal!')).toBeTruthy();
    });
  });
});