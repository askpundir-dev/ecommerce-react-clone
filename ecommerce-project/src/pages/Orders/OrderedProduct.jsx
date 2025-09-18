import dayjs from "dayjs";
import { Link } from "react-router";
import addToCart from "../../utils/addToCart";

/**
 * Renders a single product item within an order.
 * Displays product image, name, delivery date, quantity, and provides options to "Add to Cart" again or "Track package".
 *
 * @param {object} props - The component props.
 * @param {object} props.ordered - The ordered product object containing details like product info, quantity, and delivery time.
 * @param {Function} props.set$Package - State setter function to update the package details for the tracking page.
 * @param {number} props.orderTimeMs - The timestamp in milliseconds when the order was placed.
 * @param {Function} props.setCart - State setter function to update the cart state.
 * @param {Array<object>} props.products - The list of all available products.
 * @param {Function} props.fetchCart - Function to refetch the cart data from the server.
 * @returns {JSX.Element} A JSX fragment representing a single ordered product.
 */
function OrderedProduct({
  ordered,
  set$Package,
  orderTimeMs,
  setCart,
  products,
  fetchCart,
}) {
  return (
    <>
      <div className="product-image-container">
        <img src={ordered.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{ordered.product.name}</div>
        <div className="product-delivery-date">
          Arriving on: {dayjs(ordered.estimatedDeliveryTimeMs).format("MMMM D")}
        </div>
        <div className="product-quantity">Quantity: {ordered.quantity}</div>
        <button
          onClick={() => {
            console.log("Adding To Cart:", ordered.productId);
            addToCart({
              productId: ordered.productId,
              setCart,
              products,
              fetchCart,
            });
          }}
          className="buy-again-button button-primary"
        >
          <img className="buy-again-icon" src="images/icons/buy-again.png" />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <Link to="/tracking">
          <button
            onClick={() => {
              console.log("trackPackage:", ordered.productId);
              console.log(ordered);
              set$Package(() => {
                return {
                  productId: ordered.productId,
                  orderTimeMs,
                  name: ordered.product.name,
                  image: ordered.product.image,
                  quantity: ordered.quantity,
                  estimatedDeliveryTimeMs: ordered.estimatedDeliveryTimeMs,
                };
              });
            }}
            className="track-package-button button-secondary"
          >
            Track package
          </button>
        </Link>
      </div>
    </>
  );
}

export default OrderedProduct;