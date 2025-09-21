import {memo} from "react";
import OrderDetails from "./OrderDetails";

const OrdersGrid =memo(({ orders, set$Package })=>{

  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderDetails order={order} key={order.id} set$Package={set$Package} />
      ))}
    </div>
  );

});

export default OrdersGrid;


