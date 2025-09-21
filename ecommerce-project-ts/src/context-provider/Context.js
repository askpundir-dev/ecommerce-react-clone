import { createContext, useContext } from "react";

export const ProductsContext = createContext();

export function useProducts() {
  return useContext(ProductsContext);
}

export const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export const OrdersContext = createContext();

export function useOrders() {
  return useContext(OrdersContext);
}
