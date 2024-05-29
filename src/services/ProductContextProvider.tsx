import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Product } from "../interfaces/product";
import { useFetchProducts } from "./productServices";

interface ProductContextValue {
  products: Product[];
  setProducts: (products: Product[]) => void;
  fullProducts: Product[];
  setFullProducts: (products: Product[]) => void;
  fetchProducts: () => void;
}

const initialState: ProductContextValue = {
  products: [],
  setProducts: () => {},
  fullProducts: [],
  setFullProducts: () => {},
  fetchProducts: () => {},
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext<ProductContextValue>(initialState);

const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [fullProducts, setFullProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data } = await useFetchProducts();
    setProducts(data);
    setFullProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts, fetchProducts, fullProducts, setFullProducts }} data-testID="product-context">
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
