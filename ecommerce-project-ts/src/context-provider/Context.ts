import { createContext } from "react";
import { useSafeContext } from "./useSafeContext";
import type { ProductsContextType } from "../types/productsType";
import type { CartContextType } from "../types/cartType";
import type { OrdersContextType } from "../types/ordersType";

export const ProductsContext = createContext<ProductsContextType | null>(null);

export function useProducts() {
  return useSafeContext(ProductsContext, "useProducts", "ProductsProvider");
}

export const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  return useSafeContext(CartContext, "useCart", "CartProvider");
}

export const OrdersContext = createContext<OrdersContextType | null>(null);

export function useOrders() {
  return useSafeContext(OrdersContext, "useOrders", "OrdersProvider");
}

/*

// more better approach

import { createContext } from "react";
import { useSafeContext } from "./useSafeContext";

export function createSafeContext<T>(
  hookName: string,
  providerName: string
) {
  const Context = createContext<T | null>(null);
  const useHook = () => useSafeContext(Context, hookName, providerName);
  return [Context, useHook] as const;
}

// Then your file becomes ultra-sleek:

import { createSafeContext } from "./createSafeContext";
import type { ProductsContextType } from "../types/productsType";
import type { CartContextType } from "../types/cartType";
import type { OrdersContextType } from "../types/ordersType";

export const [ProductsContext, useProducts] = createSafeContext<ProductsContextType>(
  "useProducts",
  "ProductsProvider"
);
export const [CartContext, useCart] = createSafeContext<CartContextType>(
  "useCart",
  "CartProvider"
);
export const [OrdersContext, useOrders] = createSafeContext<OrdersContextType>(
  "useOrders",
  "OrdersProvider"
);


*/
