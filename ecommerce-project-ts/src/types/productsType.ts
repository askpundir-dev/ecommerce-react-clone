import type { SetStateAction, Dispatch } from "react";

export interface Product {
  createdAt: string;
  id: string;
  image: string;
  keywords: Array<string>;
  name: string;
  priceCents: number;
  rating: { stars: number; count: number };
  updatedAt: string;
  type?: string;
}

export interface ProductsContextType {
  products: Array<Product>; // syntax 1
  setProducts: Dispatch<SetStateAction<Array<Product>>>;
  allProducts: Product[]; //syntax 2
  loading: boolean;
  setLoadingProducts: Dispatch<SetStateAction<boolean>>;
  loadFetchedProducts: () => Promise<void>;
}
