import Header from "../../components/Header";
import OrdersGrid from "./OrdersGrid";

import { useOrders } from "../../context-provider/Context.js";
import "./OrdersPage.css";

function OrdersPage({ set$Package }) {
  const { orders } = useOrders();

  return (
    <>
      <title>Orders</title>
      <Header />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid {...{ orders, set$Package }} />
      </div>
    </>
  );
}

export default OrdersPage;
