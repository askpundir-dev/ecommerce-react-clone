import axios from "axios";
import API_URL from "../env-config";

export default async function addToCart({
  productId,
  quantity = 1,
  setCart,
  products,
  loadFetchedCart,
  setAddToCartLoading,
}) {
  console.warn("Adding to cart:", productId);

  if (!productId) {
    console.error("Product ID is missing");
    return;
  }

  const selectedQuantity = quantity;

  try {
    
    setAddToCartLoading(true);
    const response = await axios.post(`${API_URL}/cart-items`, {
      productId,
      quantity: selectedQuantity,
    });

    const newCartItem = response.data; // backend returns the new/updated cart item

    // ✅ Optimistic update
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === newCartItem.productId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === newCartItem.productId
            ? { ...item, quantity: newCartItem.quantity }
            : item
        );
      } else {
        const product = products.find(
          (product) => product.id === newCartItem.productId
        );
        return [...prevCart, { ...newCartItem, product }];
      }
    });
  } catch (err) {
    console.error("Add to cart failed:", err.message);

    // ✅ Only refetch on error
    await loadFetchedCart();
  }
  return 1;
}
