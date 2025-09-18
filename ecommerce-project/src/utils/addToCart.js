import axios from "axios";


async function addToCart({productId,quantity=1, setCart, products,fetchCart}) {
    console.warn("Adding to cart:", productId);

    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    const selectedQuantity = quantity;

    try {
      const response = await axios.post("/api/cart-items", {
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
      await fetchCart();
    }
  return 1;
  }

  export default addToCart;