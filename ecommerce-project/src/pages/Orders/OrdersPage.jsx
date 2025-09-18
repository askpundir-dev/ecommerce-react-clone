import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Header from "../../components/Header";
import OrdersGrid from "./OrdersGrid";
import "./OrdersPage.css";

/**
 * Renders the Orders page, which displays a list of the user's past orders.
 * @param {object} props - The component props.
 * @param {Array} props.cart - The user's current shopping cart.
 * @param {Function} props.setCart - Function to update the cart state.
 * @param {Array} props.products - The list of products currently displayed.
 * @param {Function} props.setProducts - Function to update the products state.
 * @param {Array} props.allProducts - The complete list of all available products.
 * @param {Function} props.set$Package - Function to set a package for reordering.
 * @param {Function} props.fetchCart - Function to refetch the cart data from the server.
 * @param {Function} props.fetchProducts - Function to refetch the product data from the server.
 * @returns {JSX.Element} The OrdersPage component.
 */
function OrdersPage({
  cart,
  setCart,
  products,
  setProducts,
  allProducts,
  set$Package,
  fetchCart,
  fetchProducts,
}) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header
        {...{
          cart,
          products,
          setProducts,
          allProducts,
          fetchCart,
          fetchProducts,
        }}
      />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid
          {...{ orders, set$Package, setCart, products, fetchCart }}
        />
      </div>
    </>
  );
}

export default OrdersPage;
