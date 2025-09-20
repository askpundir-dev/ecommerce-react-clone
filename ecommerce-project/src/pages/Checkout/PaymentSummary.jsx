import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { /*calculateCartSummary*/ formatMoney } from "../../utils/money";
import { fetchPaymentSummary, postOrdersRequest } from "../../api/api.js";
import { useOrders } from "../../context-provider/Context.js";
import styles from "./PaymentSummary.module.css";
function PaymentSummary({ cart, setCart }) {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const { loadFetchedOrders } = useOrders();
  useEffect(() => {
    fetchPaymentSummary()
      .then((data) => {
        setPaymentSummary(data);
      })
      .catch((err) => console.warn(err.message));
  }, [cart]);
  const navigate = useNavigate();

  if (!paymentSummary) {
    return null;
  }

  // console.log(paymentSummary);
  const {
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents,
  } = paymentSummary;
  //console.log(totalItems);

  function placeOrder() {
    console.log("placing-order");

    postOrdersRequest().then(() => {
      loadFetchedOrders();
      navigate("/orders");
      setTimeout(() => {
        setCart([]);
      }, 1);
    });
  }

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div className="payment-summary-row">
        <div>Items ({totalItems}):</div>
        <div className="payment-summary-money">
          {formatMoney(productCostCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          {formatMoney(shippingCostCents)}
        </div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          {formatMoney(totalCostBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">{formatMoney(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">
          {formatMoney(totalCostCents)}
        </div>
      </div>

      <button
        className={`place-order-button button-primary ${
          totalItems === 0 ? `${styles["disabled-place-order-btn"]}` : ""
        }`}
        disabled={totalItems === 0}
        onClick={placeOrder}
      >
        Place your order
      </button>
    </div>
  );
}

export default PaymentSummary;
