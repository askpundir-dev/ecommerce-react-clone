import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import OrderedProduct from "./OrderedProduct";

/**
 * Renders the details of a single order, including header information and a list of products in that order.
 * @param {object} props - The component props.
 * @param {object} props.order - The order object containing details like ID, order time, total cost, and products.
 * @param {Function} props.set$Package - State setter function to update the package information for tracking.
 * @param {Function} props.setCart - State setter function to update the cart state.
 * @param {Array<object>} props.products - An array of all available product objects.
 * @param {Function} props.fetchCart - Function to refetch the cart data.
 * @returns {JSX.Element} The JSX element representing a single order's details.
 */
function OrderDetails({ order, set$Package, setCart, products, fetchCart }) {
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
            setCart={setCart}
            products={products}
            fetchCart={fetchCart}
          />
        ))}
      </div>
    </div>
  );
}

export default OrderDetails;
