import { useState, useEffect } from "react";
import axios from "axios";
import CheckoutHeader from "../components/CheckoutHeader.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import PaymentSummary from "../components/PaymentSummary.jsx";
import "./CheckoutPage.css";

function CheckoutPage({
  cartQuantity,
  setCartQuantity,
  setCart,
  cart,
  loading,
}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      })
      .catch((er) => console.warn(er.message));
  }, []);
  console.log(cart);

  if (loading) {
    return (
      <div className="loading-body-styles">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader {...{ cart}} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          {cart.length > 0 ? (
            <OrderSummary
              {...{
                cart,
                setCart,
                cartQuantity,
                setCartQuantity,
                deliveryOptions,
              }}
            />
          ) : (
            <div className="empty-cart-message">Your cart is empty.</div>
          )}

          <PaymentSummary {...{ cartQuantity, cart, deliveryOptions }} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
