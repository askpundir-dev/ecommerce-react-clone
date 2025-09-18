import axios from "axios";
import { useState, useRef } from "react";
import { formatMoney } from "../../utils/money";
function Product({ product, setCart, products, fetchCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  let messageTimeoutId = useRef(null);

  async function addToCart(productId) {
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

      // Reset quantity after adding
      setQuantity(1);

      clearTimeout(messageTimeoutId.current);
      setShowAddedMessage(true);
      messageTimeoutId.current = setTimeout(() => {
        setShowAddedMessage(false);
      }, 1500);
    } catch (err) {
      console.error("Add to cart failed:", err.message);

      // ✅ Only refetch on error
      await fetchCart();
    }
  }

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value));
          }}
        >
          {[...Array(10).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
      >
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={() => {
          setShowAddedMessage(true);
          addToCart(product.id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
