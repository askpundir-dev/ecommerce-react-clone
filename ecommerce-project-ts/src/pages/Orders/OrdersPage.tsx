import Header from "../../components/Header";
import OrdersGrid from "./OrdersGrid";
import { useOrders } from "../../context-provider/Context";
import "./OrdersPage.css";
import type { Dispatch, SetStateAction } from "react";
import type { Package } from "../../types/packageType";

interface OrdersPageProps {
  set$Package: Dispatch<SetStateAction<Package | null>>;
}

function OrdersPage({ set$Package }: OrdersPageProps) {
  const { orders } = useOrders();

  return (
    <>
      <title>Orders</title>
      <Header />

      {orders.length && (
        <div className="orders-page">
          <div className="page-title">Your Orders</div>

          <OrdersGrid {...{ orders, set$Package }} />
        </div>
      )}
    </>
  );
}

export default OrdersPage;
