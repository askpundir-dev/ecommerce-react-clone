import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./OrderSummary.css";

function OrderSummary({
  cart,
  setCart,
  allProducts,
  cartQuantity,
  setCartQuantity,
}) {
  const quantityInputRef = useRef({});
  const [isPressed, setIsPressed] = useState({});

console.log(cart);

  function deleteCartItem(productId) {
    axios
      .delete(`http://localhost:3000/api/cart-items/${productId}`)
      .then(() => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));

        let deleteCount;
        cart.forEach((item) => {
          if (item.productId === productId) deleteCount = item.quantity;
        });
        console.log(deleteCount);
        setCartQuantity((prev) => prev - deleteCount);

        console.log("Deleted:", productId);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  }

  function updateCartItem(productId) {
    console.log("updating", productId);
    setIsPressed({ [productId]: true });
  }
  function saveCartItem(productId, cartItem) {
    console.log("saving");
    const rawValue = parseInt(quantityInputRef.current[productId].value, 10);
    if (!rawValue || rawValue < 1 || Number.isNaN(rawValue)) {
      quantityInputRef.current[productId].focus();
      console.warn("Invalid Value!");
      return;
    }
    const quantityChange = rawValue;
    console.log(quantityChange);

    if (quantityChange === cartItem.quantity) {
      console.log("Quantity unchanged");
      setIsPressed({ [productId]: false });
      return;
    }
    axios
      .put(`http://localhost:3000/api/cart-items/${productId}`, {
        quantity: quantityChange,
      })
      .then((response) => {
        console.log(response.data);

        // update cartQuantity correctly
        setCartQuantity((prev) => prev - cartItem.quantity + quantityChange);

        // update the cart itself
        setCart((prev) =>
          prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: quantityChange }
              : item
          )
        );

        setIsPressed({ [productId]: false });
      });
  }

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        const matchingProduct = allProducts.find(
          (product) => product.id === cartItem.productId
        );
        // console.log(matchingProduct);

        return (
          <div className="cart-item-container" key={cartItem.productId}>
            <div className="delivery-date">Delivery date: Tuesday, June 21</div>

            <div className="cart-item-details-grid">
              <img className="product-image" src={matchingProduct.image} />

              <div className="cart-item-details">
                <div className="product-name">{matchingProduct.name}</div>
                <div className="product-price">
                  ${(matchingProduct.priceCents / 100).toFixed(2)}
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
                      // onChange={(e) => {
                      //   const inputVal = e.target.value;
                      //   setInputValue((prev) => {
                      //     return { ...prev, [cartItem.productId]: inputVal };
                      //   });

                      // }}
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
                <div className="delivery-option">
                  <input
                    type="radio"
                    checked
                    className="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div className="delivery-option-date">Tuesday, June 21</div>
                    <div className="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div className="delivery-option">
                  <input
                    type="radio"
                    className="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div className="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div className="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div className="delivery-option">
                  <input
                    type="radio"
                    className="delivery-option-input"
                    name="delivery-option-1"
                  />
                  <div>
                    <div className="delivery-option-date">Monday, June 13</div>
                    <div className="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderSummary;
