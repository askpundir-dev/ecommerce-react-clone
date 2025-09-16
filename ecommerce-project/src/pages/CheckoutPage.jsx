import { useState,useEffect } from "react";
import axios from "axios";
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
  const [deliveryOption, setDeliveryOption] = useState([]);

  useEffect(() => {
    axios.get("/api/delivery-options").then((response) => {
      setDeliveryOption(response.data);
    }).catch(er=>console.warn(er.message));
  }, []);

  
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
              setCartQuantity,
              deliveryOption 
            }
          }
          />
          <PaymentSummary {...{ cartQuantity,cart,deliveryOption,}} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
