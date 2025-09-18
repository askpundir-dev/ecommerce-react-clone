import { Link } from "react-router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Header from "../../components/Header";
import "./TrackingPage.css";

function TrackingPage({
  cart,
  products,
  setProducts,
  allProducts,
  $Package,
  fetchCart,
  fetchProducts,
}) {
  const [status, setStatus] = useState(null);

  const progressMap = {
    Processing: "8%",
    Shipped: "50%",
    "Out For Delivery": "75%",
    Delivered: "100%",
  };

  function findStatus() {
    const estimatedTimeMs = $Package.estimatedDeliveryTimeMs; // total estimated time in ms
    const timeNowMs = Date.now();
    const orderCreatedAtMs = $Package.orderTimeMs;

    const elapsed = timeNowMs - orderCreatedAtMs;

    // Divide total time into 3 equal phases
    const phase1End = estimatedTimeMs / 3;
    const phase2End = (2 * estimatedTimeMs) / 3;
    const phase3End = estimatedTimeMs;

    let status;
    if (elapsed < phase1End) {
      status = "Processing"; // 1st third
    } else if (elapsed < phase2End) {
      status = "Shipped"; // 2nd third
    } else if (elapsed < phase3End) {
      status = "Out For Delivery"; // 3rd third
    } else {
      status = "Delivered";
    }

    setStatus(status);
  }

  useEffect(() => {
    if ($Package) {
      findStatus();
    }
  });

  document.title = "Order Tracking";
  return (
    <>
      <Header
        {...{
          cart,
          products,
          setProducts,
          allProducts,
          fetchCart,
          fetchProducts,
        }}
      />

      {!$Package ? (
        <div className="no-tracking-info">
          <div>No tracking information available.</div>
          <Link to="/orders" className="back-to-orders-link link-primary">
            View all orders
          </Link>
        </div>
      ) : (
        <div className="tracking-page">
          <div className="order-tracking">
            <Link to="/orders" className="back-to-orders-link link-primary">
              View all orders
            </Link>

            <div className="delivery-date">
              Arriving on{" "}
              {dayjs($Package.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
            </div>

            <div className="product-info">{$Package.name}</div>

            <div className="product-info">Quantity: {$Package.quantity}</div>

            <img className="product-image" src={$Package.image} />

            <div className="progress-labels-container">
              <div
                className={`progress-label ${
                  status === "Processing" ? "current-status" : ""
                }`}
              >
                Preparing
              </div>
              <div
                className={`progress-label ${
                  status === "Shipped" ? "current-status" : ""
                }`}
              >
                Shipped
              </div>
              <div
                className={`progress-label ${
                  status === "Delivered" ? "current-status" : ""
                }`}
              >
                Delivered
              </div>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: progressMap[status] || "0%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrackingPage;
