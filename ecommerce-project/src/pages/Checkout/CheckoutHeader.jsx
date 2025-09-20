import { memo } from "react";
import { Link } from "react-router";
import "./CheckoutHeader.css";

const CheckoutHeader = memo(({ cart, loadFetchedProducts }) => {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link
              to="/"
              onClick={() => {
                console.log("setting All Products..");
                loadFetchedProducts().then(() => console.log("success2"));
              }}
            >
              <img className="logo" src="images/amazon-logo.png" />
              <img
                className="mobile-logo"
                src="images/amazon-mobile-logo.png"
              />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link
              to="/"
              className="return-to-home-link"
              onClick={() => {
                console.log("setting All Products..");
                loadFetchedProducts().then(() => console.log("success2"));
              }}
            >
              {cart.reduce((total, curr) => total + curr.quantity, 0)}
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>
    </>
  );
});

export default CheckoutHeader;
