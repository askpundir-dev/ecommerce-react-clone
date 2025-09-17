import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import CheckoutHeader from "./CheckoutHeader.jsx";
import OrderSummary from "./OrderSummary.jsx";
import PaymentSummary from "./PaymentSummary.jsx";
import "./CheckoutPage.css";

function CheckoutPage({ cart, setCart, loading, allProducts, setProducts }) {
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
      <CheckoutHeader {...{ cart }} />

      <div className="checkout-page">
        {cart.length > 0 && <div className="page-title">Review your order</div>}

        <div className="checkout-grid">
          {cart.length > 0 ? (
            <OrderSummary
              {...{
                cart,
                setCart,
                deliveryOptions,
              }}
            />
          ) : (
            <div className="empty-cart-message-container">
              <div className="empty-cart-message">Your cart is empty.</div>
              <Link
                to="/"
                className="browse-products-btn"
                onClick={() => {
                  console.log("setting All Products..");
                  setProducts(allProducts);
                }}
              >
                Browse Products
              </Link>
            </div>
          )}

          <PaymentSummary {...{ cart, deliveryOptions, setCart }} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
