import {
  useState,
  useRef,
  memo,
  type Dispatch,
  type SetStateAction,
} from "react";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import DeliveryOptions from "./DeliveryOptions";
import updateCartItemInState from "../../utils/updateCartItemQuantity";
import { sendDeleteRequest, sendUpdateCartReq } from "../../api/api";
import type { CartItem } from "../../types/cartType";
import "./OrderSummary.css";
import type { DeliveryOption } from "../../types/deliveryOptionsType";

interface OrderSummaryProps {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  deliveryOptions: DeliveryOption[];
}

// ✅ Type for our `isPressed` state
type IsPressedState = Record<string, boolean>;

// ✅ Type-safe reference object (stores input elements per productId)
type QuantityInputRefs = Record<string, HTMLInputElement | null>;

const OrderSummary = memo(
  ({ cart, setCart, deliveryOptions }: OrderSummaryProps) => {
    const quantityInputRef = useRef<QuantityInputRefs>({});
    const [isPressed, setIsPressed] = useState<IsPressedState>({});

    // ✅ DELETE cart item
    function deleteCartItem(productId: string) {
      sendDeleteRequest(productId)
        .then(() => {
          // console.log(data);
          setCart((prev) =>
            prev.filter((item) => item.productId !== productId)
          );
        })
        .catch((error) => {
          console.error("Error deleting:", error);
        });
    }

    // ✅ When update clicked
    function updateCartItem(productId: string) {
      setIsPressed({ [productId]: true });
    }

    // ✅ Save updated quantity
    function saveCartItem(productId: string, cartItem: CartItem) {
      const inputElement = quantityInputRef.current[productId];
      if (!inputElement) return;

      const processedValue = parseInt(inputElement.value, 10);
      if (
        !processedValue ||
        processedValue < 1 ||
        Number.isNaN(processedValue)
      ) {
        inputElement.focus();
        console.warn("Invalid Value!");
        return;
      }

      if (processedValue === cartItem.quantity) {
        //console.log("Quantity unchanged");
        setIsPressed({ [productId]: false });
        return;
      }
      sendUpdateCartReq(productId, processedValue)
        .then((data) => {
          // console.log(data);

          const updatedItem = data;
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
                <div className="delivery-date">
                  Delivery date: {deliveryDate}
                </div>

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
                          ref={(el) => {
                            quantityInputRef.current[cartItem.productId] = el;
                          }}
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
);

export default OrderSummary;
