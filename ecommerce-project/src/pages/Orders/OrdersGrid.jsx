import OrderDetails from "./OrderDetails";

function OrdersGrid({ orders, set$Package }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderDetails order={order} key={order.id} set$Package={set$Package} />
      ))}
    </div>
  );
}

export default OrdersGrid;
