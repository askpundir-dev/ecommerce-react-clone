import { Link } from "react-router";
import "./CheckoutHeader.css";

function CheckoutHeader({cartQuantity}) {
return (
  <>
    <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/amazon-logo.png" />
              <img className="mobile-logo" src="images/amazon-mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link to="/" className="return-to-home-link" >
             {cartQuantity}
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
}

export default CheckoutHeader;