import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import HomePage from "./pages/HomePage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import "./App.css";
function App() {
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // USING AXIOS FOR data fetching no need of error handling here as axios has it inbuilt
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => {
        setAllProducts(response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  /*
// USING ASYNC AWAIT data fetching THIS ALSO NEEDS ERROR HANDLING
useEffect(() => {
async function loadData() {
const res = await fetch('http://localhost:3000/api/products');
const data = await res.json();
setProducts(data);
}
loadData();
}, []);
*/

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/cart-items")
      .then((response) => {
        setCart(response.data);

        const totalQuantity = response.data.reduce(
          (total, item) => total + item.quantity,
          0
        );
        setCartQuantity(totalQuantity);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  return (
    <Routes>
      <Route
        index
        element={
          <HomePage
            {...{
              cartQuantity,
              setCartQuantity,
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
        element={
          <CheckoutPage
            {...{ cart, setCart, allProducts, cartQuantity, setCartQuantity }}
          />
        }
      />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
