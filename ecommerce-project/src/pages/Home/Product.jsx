import axios from "axios";
import { useState, useRef } from "react";
import { formatMoney } from "../../utils/money";
function Product({ product, setCart, products }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  let messageTimeoutId = useRef(null);

  //using promise .then to handle the promise response
  function addToCart(productId) {
    console.warn("Adding to cart:", productId);
    console.log(messageTimeoutId.current);
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    const selectedQuantity = quantity;
    axios
      .post("/api/cart-items", {
        productId,
        quantity: selectedQuantity,
      })
      .then((response) => {
        console.log(response.data);
        const newCartItem = response.data; // backend returns the new/updated cart item

        // ✅ Update cart in App state
        setCart((prevCart) => {
          const existingItem = prevCart.find(
            (item) => item.productId === newCartItem.productId
          );

          if (existingItem) {
            // if item already in cart, update its quantity

            return prevCart.map((item) =>
              item.productId === newCartItem.productId
                ? { ...item, quantity: newCartItem.quantity }
                : item
            );
          } else {
            // new product added
            const product = products.find(
              (product) => product.id === newCartItem.productId
            );
            return [...prevCart, { ...newCartItem, product: product }];
          }
        });

        // Reset quantity to 1 after adding to cart
        setQuantity(1);

        clearTimeout(messageTimeoutId.current); // Clear any existing timeout for this product

        setShowAddedMessage(true);
        messageTimeoutId.current = setTimeout(() => {
          setShowAddedMessage(false);
        }, 1500); // Hide message after 1.5 seconds

        console.log(messageTimeoutId);
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
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
