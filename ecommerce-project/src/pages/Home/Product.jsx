// import axios from "axios";
import { useState, useRef } from "react";
import { formatMoney } from "../../utils/money";
import addToCart from "../../utils/addToCart";
/**
 * Renders a single product card, displaying its image, name, rating, and price.
 * It also provides functionality to select a quantity and add the product to the cart.
 *
 * @param {object} props - The props for the Product component.
 * @param {object} props.product - The product object containing details like id, image, name, rating, and price.
 * @param {function} props.setCart - The state setter function to update the cart.
 * @param {Array<object>} props.products - An array of all available product objects.
 * @param {function} props.fetchCart - A function to refetch the cart data after an update.
 * @returns {JSX.Element} A JSX element representing a single product card.
 */
function Product({ product, setCart, products, fetchCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  let messageTimeoutId = useRef(null);

  function handelAddToCart(productId) {
    setShowAddedMessage(true);
    const added = addToCart({
      productId,
      quantity,
      setCart,
      products,
      fetchCart,
    });
    if (added) {
      // Reset quantity after adding
      setQuantity(1);

      //Clear Previous message timeout
      clearTimeout(messageTimeoutId.current);

      //show message
      setShowAddedMessage(true);

      //set timeout to hide message
      messageTimeoutId.current = setTimeout(() => {
        setShowAddedMessage(false);
      }, 1500);
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
          handelAddToCart(product.id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
