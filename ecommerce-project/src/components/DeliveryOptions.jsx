import axios from "axios";
import { getDeliveryDate } from "../utils/deliveryTime";

/**
 * Renders a list of delivery options for a specific cart item.
 * Allows the user to select a delivery option, which updates the cart state.
 *
 * @param {object} props - The component props.
 * @param {Function} props.setCart - The state setter function to update the cart.
 * @param {object} props.cartItem - The specific item in the cart for which to display delivery options.
 * @param {Array<object>} props.deliveryOption - An array of available delivery option objects.
 * @returns {JSX.Element} A JSX fragment containing the rendered list of delivery options as radio buttons.
 */
function DeliveryOptions({ setCart, cartItem, deliveryOption }) {
  return (
    <>
      {deliveryOption.map((option) => {
        return (
          <div className="delivery-option" key={option.id}>
            <input
              type="radio"
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`} // group by product
              checked={cartItem.deliveryOptionId === option.id}
              onChange={() => {
                // ✅ update parent cart state
                setCart((prev) =>
                  prev.map((item) =>
                    item.productId === cartItem.productId
                      ? { ...item, deliveryOptionId: option.id }
                      : item
                  )
                );
                axios
                  .put(`/api/cart-items/${cartItem.productId}`, {
                    deliveryOptionId: option.id,
                  })
                  .then((response) => console.log(response.data));
              }}
            />
            <div>
              <div className="delivery-option-date">
                {getDeliveryDate(option.deliveryDays)}
              </div>
              <div className="delivery-option-price">
                {option.priceCents === 0
                  ? "Free Shipping"
                  : `${(option.priceCents / 100).toFixed(2)} - Shipping`}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DeliveryOptions;
