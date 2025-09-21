import axios from "axios";
import API_URL from "../env-config";

export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchCart = async () => {
  const response = await axios.get(`${API_URL}/cart-items?expand=product`);
  return response.data;
};

export const fetchDeliveryOptions = async () => {
  const response = await axios.get(
    `${API_URL}/delivery-options?expand=estimatedDeliveryTime`
  );
  return response.data;
};

export const sendDeleteRequest = async (productId) => {
  const response = await axios.delete(`${API_URL}/cart-items/${productId}`);
  return response.data;
};

export const sendUpdateCartReq = async (productId, quantityChange = 0) => {
  const response = await axios.put(`${API_URL}/cart-items/${productId}`, {
    quantity: quantityChange,
  });
  return response.data;
};

export const fetchPaymentSummary = async () => {
  const response = await axios.get(`${API_URL}/payment-summary`);
  return response.data;
};

export const postOrdersRequest = async () => {
  const response = await axios.post(`${API_URL}/orders`);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`${API_URL}/orders?expand=products`);
  return response.data;
};

export const sendDeliveryOptnUpdtReq = async (cartItemId, optionId) => {
  const response = await axios.put(`${API_URL}/cart-items/${cartItemId}`, {
    deliveryOptionId: optionId,
  });
  return response.data;
};

