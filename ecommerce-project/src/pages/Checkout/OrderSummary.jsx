import { useState, useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money.js";
import DeliveryOptions from "./DeliveryOptions.jsx";
import updateCartItemInState from "../../utils/updateCartItemQuantity.js";
import "./OrderSummary.css";

/**
 * Renders the order summary section of the checkout page.
 * It displays each item in the cart, providing functionality to update quantity,
 * delete items, and select delivery options.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.cart - An array of objects, where each object represents an item in the cart.
 * @param {Function} props.setCart - The state setter function to update the cart.
 * @param {Array<object>} props.deliveryOptions - An array of available delivery option objects.
 * @returns {JSX.Element} A React component that renders the list of cart items and their details.
 */
function OrderSummary({ cart, setCart, deliveryOptions }) {
  const quantityInputRef = useRef({});
  const [isPressed, setIsPressed] = useState({});
  function deleteCartItem(productId) {
    axios
      .delete(`/api/cart-items/${productId}`)
      .then((response) => {
        console.log(response.data);

        setCart((prev) => prev.filter((item) => item.productId !== productId));
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  }

  function updateCartItem(productId) {
    //console.log("updating", productId);
    setIsPressed({ [productId]: true });
  }

  function saveCartItem(productId, cartItem) {
    //console.log("saving");
    const rawValue = parseInt(quantityInputRef.current[productId].value, 10);
    if (!rawValue || rawValue < 1 || Number.isNaN(rawValue)) {
      quantityInputRef.current[productId].focus();
      console.warn("Invalid Value!");
      return;
    }
    const quantityChange = rawValue;
    //console.log(quantityChange);

    if (quantityChange === cartItem.quantity) {
      //console.log("Quantity unchanged");
      setIsPressed({ [productId]: false });
      return;
    }
    axios
      .put(`/api/cart-items/${productId}`, {
        quantity: quantityChange,
      })
      .then((response) => {
        console.log(response.data);

        const updatedItem = response.data;
        setCart((prev) => updateCartItemInState(prev, updatedItem));

        setIsPressed({ [productId]: false });
      })
      .catch((err) => console.error("Error updating cart:", err));
  }

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const optionId = cartItem.deliveryOptionId;
          const matchingOption = deliveryOptions.find(
            (option) => option.id === optionId
          );
          if (!matchingOption) {
            return null; //skip render until data is ready
          }
          const deliveryDate = dayjs(
            matchingOption.estimatedDeliveryTimeMs
          ).format("D MMMM, dddd");

          return (
            <div className="cart-item-container" key={cartItem.productId}>
              <div className="delivery-date">Delivery date: {deliveryDate}</div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:
                      <span
                        className={`quantity-label ${
                          isPressed[cartItem.productId] ? "js-hidden" : ""
                        }`}
                      >
                        {" "}
                        {cartItem.quantity}
                      </span>
                      <input
                        type="number"
                        className={`quantity-input js-quantity-input ${
                          isPressed[cartItem.productId]
                            ? "js-display-save-and-input"
                            : ""
                        }`}
                        ref={(el) =>
                          (quantityInputRef.current[cartItem.productId] = el)
                        }
                        defaultValue={cartItem.quantity}
                      />
                    </span>
                    <span
                      className={`update-quantity-link link-primary ${
                        isPressed[cartItem.productId] ? "js-hidden" : ""
                      }`}
                      onClick={() => {
                        updateCartItem(cartItem.productId);
                      }}
                    >
                      Update
                    </span>
                    <span
                      className={`save-quantity-link link-primary js-save ${
                        isPressed[cartItem.productId]
                          ? "js-display-save-and-input"
                          : ""
                      }`}
                      onClick={() => {
                        saveCartItem(cartItem.productId, cartItem);
                      }}
                    >
                      Save
                    </span>
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={() => {
                        deleteCartItem(cartItem.productId);
                      }}
                    >
                      Delete
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  <DeliveryOptions
                    {...{ setCart, cartItem, deliveryOptions }}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default OrderSummary;
