import { useEffect, useState, useCallback } from "react";
import { ProductsContext, CartContext, OrdersContext } from "./Context";
import { fetchProducts, fetchCart, fetchOrders } from "../api/api";

export function AppProvider({ children }) {
  return (
    <ProductsProvider>
      <CartProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

export function ProductsProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const loadFetchedProducts = useCallback(async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading data:", error.message);
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

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const [loadingCart, setLoadingCart] = useState(true);

  const loadFetchedCart = useCallback(async () => {
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("Error loading data:", error.message);
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

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const loadFetchedOrders = useCallback(async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.log(err.message);
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
