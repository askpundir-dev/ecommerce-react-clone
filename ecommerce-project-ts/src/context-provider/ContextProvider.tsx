import { useEffect, useState, useCallback, type ReactNode } from "react";
import { ProductsContext, CartContext, OrdersContext } from "./Context";
import { fetchProducts, fetchCart, fetchOrders } from "../api/api";
import type { Product } from "../types/productsType";
import type { CartItem } from "../types/cartType";
import type { Order } from "../types/ordersType";
export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ProductsProvider>
      <CartProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [allProducts, setAllProducts] = useState<Array<Product>>([]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const loadFetchedProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error loading data:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setLoadingProducts(false);
      console.log("Products Loaded Successfully!");
    }
  }, []);

  useEffect(() => {
    loadFetchedProducts();
  }, [loadFetchedProducts]);

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        products,
        setProducts,
        loading: loadingProducts,
        setLoadingProducts,
        loadFetchedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Array<CartItem>>([]);
  console.log(cart);

  const [loadingCart, setLoadingCart] = useState(true);

  const loadFetchedCart = useCallback(async () => {
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("Error loading data:", (error as Error).message);
    } finally {
      setLoadingCart(false);
      console.log("Cart Loaded Successfully!");
    }
  }, []);

  useEffect(() => {
    loadFetchedCart();
  }, [loadFetchedCart]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, loading: loadingCart, loadFetchedCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Array<Order>>([]);

  const loadFetchedOrders = useCallback(async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error loading data:", (err as Error).message);
    } finally {
      console.log("Order Loaded Successfully!");
    }
  }, []);

  useEffect(() => {
    loadFetchedOrders();
  }, [loadFetchedOrders]);

  return (
    <OrdersContext.Provider value={{ orders, setOrders, loadFetchedOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}

// function getErrorMessage(error: unknown): string {
//   return error instanceof Error ? error.message : String(error);
// }

// // Then use:
// } catch (error) {
//   console.error("Error loading data:", getErrorMessage(error));
// }
