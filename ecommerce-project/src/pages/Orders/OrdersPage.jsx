import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import Header from "../../components/Header";
import OrdersGrid from "./OrdersGrid";
import "./OrdersPage.css";

function OrdersPage({
  cart,
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

        <OrdersGrid {...{ orders, set$Package }} />
      </div>
    </>
  );
}

export default OrdersPage;
