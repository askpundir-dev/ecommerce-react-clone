import axios from "axios";
import { getDeliveryDate } from "../utils/deliveryTime";

function DeliveryOptions({ setCart, cartItem,deliveryOption }) {
 

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
                axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`,{
                 deliveryOptionId:option.id, 
                }).then(response=>console.log(response.data)
                )
              }}
            />
            <div>
              <div className="delivery-option-date">
                {getDeliveryDate(option.deliveryDays)}
              </div>
              <div className="delivery-option-price">
                {option.priceCents === 0
                  ? "Free Shipping"
                  : `$${(option.priceCents / 100).toFixed(2)} - Shipping`}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default DeliveryOptions;
