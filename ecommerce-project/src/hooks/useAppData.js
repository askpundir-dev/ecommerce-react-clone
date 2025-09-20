import { useState, useCallback } from "react";
import { fetchProducts, fetchCart, fetchOrders } from "../api/api";

function useAppData() {
  // Products
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const loadFetchedProducts = useCallback(async () => {
    setLoadingProducts(true);
    setProductsError(null);
    try {
      const data = await fetchProducts();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      setProductsError(error.message);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Cart
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [cartError, setCartError] = useState(null);

  const loadFetchedCart = useCallback(async () => {
    setLoadingCart(true);
    setCartError(null);
    try {
      const data = await fetchCart();
      setCart(data);
    } catch (error) {
      setCartError(error.message);
    } finally {
      setLoadingCart(false);
    }
  }, []);

  // Orders
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const loadFetchedOrders = useCallback(async () => {
    setLoadingOrders(true);
    setOrdersError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      setOrdersError(error.message);
    } finally {
      setLoadingOrders(false);
    }
  }, []);

  return {
    // Products
    allProducts,
    setAllProducts,
    products,
    setProducts,
    loadingProducts,
    productsError,
    loadFetchedProducts,
    // Cart
    cart,
    setCart,
    loadingCart,
    cartError,
    loadFetchedCart,
    // Orders
    orders,
    setOrders,
    loadingOrders,
    ordersError,
    loadFetchedOrders,
  };
}
