import { Link } from "react-router";
import "./CheckoutHeader.css";

/**
 * Renders the header component for the checkout page.
 * It displays the logo, a checkout status with the number of items, and a security icon.
 * @param {object} props - The component props.
 * @param {number} props.cartQuantity - The total number of items in the shopping cart.
 * @returns {JSX.Element} The rendered checkout header component.
 */
function CheckoutHeader({cart}) {
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
             {cart.reduce((total,curr)=>total+curr.quantity,0)}
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