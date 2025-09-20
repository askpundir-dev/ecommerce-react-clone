import { Link } from "react-router";
import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import Header from "../../components/Header";
import "./TrackingPage.css";

function TrackingPage({ $Package }) {
  const [status, setStatus] = useState(null);

  // ...existing code...

  const [percent, setPercent] = useState(0);
  console.log(percent);
  
  const findStatus = useCallback(() => {
    const deliveryEndMs = $Package.estimatedDeliveryTimeMs; // delivery timestamp
    const orderCreatedAtMs = $Package.orderTimeMs; // order placed timestamp
    const timeNowMs = Date.now();

    const totalDuration = deliveryEndMs - orderCreatedAtMs;
    const elapsed = timeNowMs - orderCreatedAtMs;

    // Divide total duration into 3 equal phases
    const phase1End = totalDuration / 3;
    const phase2End = (2 * totalDuration) / 3;
    const phase3End = totalDuration;

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

    const percent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    setPercent(3+percent);
    console.log(percent);

    setStatus(status);
  }, [$Package]);

  useEffect(() => {
    if ($Package) {
      findStatus();
      const interval = setInterval(() => {
        findStatus();
      }, 5000); // update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [$Package, findStatus]);

  return (
    <>
      <title>Tracking</title>
      <Header />

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
                  status === "Out For Delivery" ? "current-status" : ""
                }`}
              >
                Out For Delivery
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
                style={{ width: `${percent}%`}}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrackingPage;
