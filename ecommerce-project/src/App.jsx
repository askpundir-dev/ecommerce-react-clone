import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import axios from "axios";
import HomePage from "./pages/Home/HomePage.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx";
import OrdersPage from "./pages/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
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
  const [loading, setLoading] = useState(true);
  // USING AXIOS FOR data fetching no need of error handling here as axios has it inbuilt
useEffect(() => {
  setLoading(true);

  Promise.all([
    axios.get("/api/products"),
    axios.get("/api/cart-items?expand=product")
  ])
    .then(([productsRes, cartRes]) => {
      setAllProducts(productsRes.data);
      setProducts(productsRes.data);
      setCart(cartRes.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
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
        element={
          <CheckoutPage
            {...{  cart, setCart, loading }}
          />
        }
      />
      <Route path="orders" element={<OrdersPage {...{ cart }} />} />
      <Route path="tracking" element={<TrackingPage {...{cart}} />} />
    </Routes>
  );
}

export default App;
