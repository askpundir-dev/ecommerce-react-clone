import type { Dispatch, SetStateAction } from "react";
import type { Product } from "./productsType";

export interface CartItem {
  id: number;
  productId: string;
  product: Product;
  quantity: number;
  deliveryOptionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartContextType {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  loading: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  loadFetchedCart: () => Promise<void>;
}
