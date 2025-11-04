import type { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import  OrderedProduct from "./OrderedProduct";
import type { Order } from "../../types/ordersType";
import type { Package } from "../../types/packageType";

interface OrderDetailsProps {
  order: Order;
  set$Package: Dispatch<SetStateAction<Package | null>>;
}

function OrderDetails({ order, set$Package }: OrderDetailsProps) {
  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>{formatMoney(order.totalCostCents)}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{order.id}</div>
        </div>
      </div>

      <div className="order-details-grid">
        {order.products.map((ordered) => (
          <OrderedProduct
            ordered={ordered}
            key={ordered.productId}
            set$Package={set$Package}
            orderTimeMs={order.orderTimeMs}
          />
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
