import CheckoutHeader from "../components/CheckoutHeader.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import PaymentSummary from "../components/PaymentSummary.jsx";
import "./CheckoutPage.css";
function CheckoutPage({
  cart,
  setCart,
  allProducts,
  cartQuantity,
  setCartQuantity,
}) {
  document.title = "Checkout";
  return (
    <>
      <CheckoutHeader {...{ cartQuantity }} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
          {
        ...{ 
              cart, 
              setCart, 
              allProducts, 
              cartQuantity, 
              setCartQuantity 
            }
          }
          />
          <PaymentSummary {...{ cartQuantity }} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
