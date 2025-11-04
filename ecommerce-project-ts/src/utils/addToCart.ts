import axios from "axios";
import API_URL from "../env-config";
import type { Product } from "../types/productsType";
import type { CartItem } from "../types/cartType";
import type { Dispatch, SetStateAction } from "react";
interface addToCartProps {
  productId: string;
  quantity?: number;
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  products: Product[];
  loadFetchedCart: () => Promise<void>;
}

export default async function addToCart({
  productId,
  quantity = 1,
  setCart,
  products,
  loadFetchedCart,
}: addToCartProps): Promise<boolean> {
  console.warn("Adding to cart:", productId);

  if (!productId) {
    console.error("Product ID is missing");
    return false;
  }

  const selectedQuantity = quantity;

  try {
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
        return [...prevCart, { ...newCartItem, product: product ?? null }];
      }
    });
    return true;
  } catch (err) {
    console.error("Add to cart failed:", (err as Error).message);

    // ✅ Only refetch on error
    await loadFetchedCart();
    return false;
  }
}
