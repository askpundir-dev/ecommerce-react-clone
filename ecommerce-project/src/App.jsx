import { useState } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import TrackingPage from "./pages/Tracking/TrackingPage.jsx";
import "./App.css";

function App() {
  const [$Package, set$Package] = useState(null);

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage set$Package={set$Package} />} />
      <Route path="tracking" element={<TrackingPage $Package={$Package} />} />
    </Routes>
  );
}

export default App;
