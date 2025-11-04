import type { Dispatch, SetStateAction } from "react";
import type { Product } from "./productsType";

export interface OrderedProductType {
  estimatedDeliveryTimeMs: number;
  product: Product;
  productId: string;
  quantity: number;
}

export interface Order {
  createdAt: string;
  id: string;
  orderTimeMs: number;
  products: OrderedProductType[];
  totalCostCents: number;
  updatedAt: string;
}

export interface OrdersContextType {
  orders: Array<Order>;
  setOrders: Dispatch<SetStateAction<Array<Order>>>;
  loadFetchedOrders: () => Promise<void>;
}
