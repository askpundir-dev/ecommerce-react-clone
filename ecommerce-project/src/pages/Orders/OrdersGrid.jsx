import OrderDetails from "./OrderDetails";

/**
 * Renders a grid of orders, displaying each order's details.
 * @param {object} props - The component props.
 * @param {Array<object>} props.orders - An array of order objects to be displayed.
 * @param {Function} props.set$Package - State setter function for the package.
 * @param {Function} props.setCart - State setter function for the cart.
 * @param {Array<object>} props.products - An array of all available product objects.
 * @param {Function} props.fetchCart - Function to refetch cart data.
 * @returns {JSX.Element} A component that renders a grid of `OrderDetails`.
 */
function OrdersGrid({ orders, set$Package, setCart, products, fetchCart }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => (
        <OrderDetails
          order={order}
          key={order.id}
          set$Package={set$Package}
          setCart={setCart}
          products={products}
          fetchCart={fetchCart}
        />
      ))}
    </div>
  );
}

export default OrdersGrid;
