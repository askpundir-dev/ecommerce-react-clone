import axios from "axios";
import { useState, useRef } from "react";
import "./ProductContainer.css";

function ProductContainer({ setCartQuantity, products, setCart }) {
  // Ref for storing timeouts per product
  const addToCartTimeouts = useRef({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const [showAddToCartMessage, setShowAddToCartMessage] = useState({});

  function addToCart(productId) {
    console.warn("Adding to cart:", productId);

    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    // console.log("Selected quantity in add to cart:",selectedQuantities[productId]||1);

    const selectedQuantity = selectedQuantities[productId] || 1;
    axios
      .post("http://localhost:3000/api/cart-items", {
        productId,
        quantity: selectedQuantity,
      })
      .then((response) => {
        console.log(response.data);
         const newCartItem = response.data; // backend should return the new/updated cart item

        setCartQuantity((prevQuantity) => prevQuantity + selectedQuantity);

       // ✅ Update cart in App state
      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.productId === productId);

        if (existingItem) {
          // if item already in cart, update its quantity
          return prevCart.map(item =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + selectedQuantity }
              : item
          );
        } else {
          // new product added
          return [...prevCart, newCartItem];
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
  function handelProductQuantityChange(e, productId) {
    if (!productId) return;
    const quantity = parseInt(e.target.value);
    setSelectedQuantities(() => {
      return { e, [productId]: quantity };
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

          <div className="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

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
