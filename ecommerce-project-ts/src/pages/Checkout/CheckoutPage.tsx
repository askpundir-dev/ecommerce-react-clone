import { useState, useEffect } from "react";
import { Link } from "react-router";
import CheckoutHeader from "./CheckoutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";
import { fetchDeliveryOptions } from "../../api/api";
import "./CheckoutPage.css";
import { useProducts, useCart } from "../../context-provider/Context";
import Loading from "../../components/Loading";
import type { DeliveryOption } from "../../types/deliveryOptionsType";
function CheckoutPage() {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const { allProducts, setProducts, loadFetchedProducts } = useProducts();
  const { cart, setCart, loading } = useCart();
  useEffect(() => {
    fetchDeliveryOptions()
      .then((data) => {
        setDeliveryOptions(data);
      })
      .catch((er) => console.warn(er.message));
  }, []);
  // console.log(cart);

  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader {...{ cart, loadFetchedProducts }} />
      <Loading loading={loading} />
      {!loading && (
        <div className="checkout-page">
          {cart.length > 0 && (
            <div className="page-title">Review your order</div>
          )}

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
      )}
    </>
  );
}

export default CheckoutPage;
