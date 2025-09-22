import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { sendDeliveryOptnUpdtReq } from "../../api/api";

function DeliveryOptions({ setCart, cartItem, deliveryOptions }) {
  return deliveryOptions.map((option) => {
    return (
      <div className="delivery-option" key={option.id}>
        <input
          type="radio"
          className="delivery-option-input"
          name={`delivery-option-${cartItem.productId}`} // group by product
          checked={cartItem.deliveryOptionId === option.id}
          onChange={async () => {
            try {
              await sendDeliveryOptnUpdtReq(cartItem.productId, option.id);
              setCart((prev) =>
                prev.map((item) =>
                  item.productId === cartItem.productId
                    ? { ...item, deliveryOptionId: option.id }
                    : item
                )
              );
            } catch (error) {
              console.error(error);
            }
          }}
        />
        <div>
          <div className="delivery-option-date">
            {dayjs(option.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>
          <div className="delivery-option-price">
            {option.priceCents > 0
              ? `${formatMoney(option.priceCents)} - Shipping`
              : "Free Shipping"}
          </div>
        </div>
      </div>
    );
  });
}

export default DeliveryOptions;
