import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import HomePage from "./pages/Home/HomePage.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import TrackingPage from "./pages/Tracking/TrackingPage.jsx";
import "./App.css";
/**
 * The main application component.
 * It manages the application's state, fetches initial data for products and cart,
 * and sets up the routing for different pages.
 * @returns {JSX.Element} The rendered application with its routes.
 */
function App() {
  const [cart, setCart] = useState([]);

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);

  const loading = loadingProducts || loadingCart;
  // USING AXIOS FOR data fetching no need of error handling here as axios has it inbuilt
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setAllProducts(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart-items?expand=product");
        setCart(response.data);
      } catch (error) {
        setLoadingCart(false);
        console.log(error.message);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            {...{
              cart,
              setCart,
              products,
              setProducts,
              allProducts,
              loading,
            }}
          />
        }
      />
      <Route
        path="checkout"
        element={<CheckoutPage {...{ cart, setCart, loading,allProducts,setProducts }} />}
      />
      <Route
        path="orders"
        element={
          <OrdersPage {...{ cart, products, setProducts, allProducts }} />
        }
      />
      <Route
        path="tracking"
        element={
          <TrackingPage {...{ cart, products, setProducts, allProducts }} />
        }
      />
    </Routes>
  );
}

export default App;
