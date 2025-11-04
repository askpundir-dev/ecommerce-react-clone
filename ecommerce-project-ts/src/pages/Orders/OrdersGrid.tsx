import { memo, type Dispatch, type SetStateAction } from "react";
import OrderDetails from "./OrderDetails";
import type { Order } from "../../types/ordersType";
import type { Package } from "../../types/packageType";

interface OrdersGridProps {
  orders: Order[];
  set$Package: Dispatch<SetStateAction<Package | null>>;
}

const OrdersGrid = memo(({ orders, set$Package }: OrdersGridProps) => {
  console.log(orders);

  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderDetails order={order} key={order.id} set$Package={set$Package} />
      ))}
    </div>
  );
});

export default OrdersGrid;
