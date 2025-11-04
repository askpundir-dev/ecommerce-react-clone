import { useState, useRef } from "react";
import { useCart } from "../../context-provider/Context";
import { formatMoney } from "../../utils/money";
import addToCart from "../../utils/addToCart";
import type { Product } from "../../types/productsType";

interface ProductProps {
  product: Product;
  products: Product[];
}

export default function Product({ product, products }: ProductProps) {
  const { setCart, loadFetchedCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const messageTimeoutId = useRef<number | undefined>(undefined);

  async function handleAddToCart(productId: string) {
    const added = await addToCart({
      productId,
      quantity,
      setCart,
      products,
      loadFetchedCart,
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
        <img className="product-image" src={product.image} alt={product.name} />
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
          handleAddToCart(product.id);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
