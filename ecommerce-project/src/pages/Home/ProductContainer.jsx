import axios from "axios";
import { useState, useRef } from "react";
import { formatMoney } from "../../utils/money";
import "./ProductContainer.css";

/**
 * Renders a container for a list of products, allowing users to view and add them to the cart.
 * @param {object} props - The component props.
 * @param {Function} props.setCartQuantity - A state setter function to update the total quantity of items in the cart.
 * @param {Array<object>} props.products - An array of product objects to be displayed.
 * @param {Function} props.setCart - A state setter function to update the array of cart items.
 * @returns {JSX.Element} A JSX fragment containing the rendered list of products.
 */
function ProductContainer({ products, setCart, cart }) {
  // Ref for storing timeouts per product
  const addToCartTimeouts = useRef({});
  const [selectedQuantities, setSelectedQuantities] = useState({});
  console.log(selectedQuantities);
  console.log(cart);

  const [showAddToCartMessage, setShowAddToCartMessage] = useState({});

  //using promise .then to handle the promise response
  function addToCart(productId) {
    console.warn("Adding to cart:", productId);

    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    // console.log("Selected quantity in add to cart:",selectedQuantities[productId]||1);

    const selectedQuantity = selectedQuantities[productId] || 1;
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
        setSelectedQuantities(() => {
          return { ...selectedQuantities, [productId]: 1 };
        });

        clearTimeout(addToCartTimeouts.current[productId]); // Clear any existing timeout for this product

        setShowAddToCartMessage((prev) => {
          return { ...prev, [productId]: true };
        });

        console.log(addToCartTimeouts);
        addToCartTimeouts.current[productId] = setTimeout(() => {
          setShowAddToCartMessage((prev) => {
            return { ...prev, [productId]: false };
          });
        }, 1500); // Hide message after 1.5 seconds
      })
      .catch((err) => {
        console.log(err.message);
        return;
      });
  }

  //i don't understand this part of the code
  function handelProductQuantityChange(e, productId) {
    if (!productId) return;
    const quantity = parseInt(e.target.value);
    setSelectedQuantities(() => {
      return {[productId]: quantity };
    });
  }

  return (
    <>
      {products.map((product) => (
        <div className="product-container" key={product.id}>
          <div className="product-image-container">
            <img className="product-image" src={product.image} />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

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
              value={selectedQuantities[product.id] || 1}
              onChange={(e) => {
                handelProductQuantityChange(e, product.id);
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
            style={{ opacity: showAddToCartMessage[product.id] ? 1 : 0 }}
          >
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button
            className="add-to-cart-button button-primary"
            onClick={() => {
              addToCart(product.id);
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </>
  );
}

export default ProductContainer;
