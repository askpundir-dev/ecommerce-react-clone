import { useEffect, useState } from "react";
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
  async function loadFetchedProducts() {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading data:", error.message);
    } finally {
      setLoadingProducts(false);
      console.log("success1");
    }
  }
  useEffect(() => {
    loadFetchedProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        allProducts,
        setAllProducts,
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

  async function loadFetchedCart() {
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      console.error("Error loading data:", error.message);
    } finally {
      setLoadingCart(false);
    }
  }

  useEffect(() => {
    loadFetchedCart();
  }, []);

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

  async function loadFetchedOrders() {
    try {
      const data = await fetchOrders();
      setOrders(data);
      console.log("Order Placed Successfully!");
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    loadFetchedOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, setOrders, loadFetchedOrders }}>
      {children}
    </OrdersContext.Provider>
  );
}
