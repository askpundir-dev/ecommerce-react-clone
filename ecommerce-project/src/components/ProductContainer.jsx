import axios from "axios";
import "./ProductContainer.css";

// import products from '../../data/products.js';

async function fetchProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return data;
}

function ProductContainer() {
 axios.get("http://localhost:3000/api/products")
    .then((response) => {
      console.log(response.data); 
    })
   

  const product = products.map((product) => {
    return (
      <div className="product-container" key={product.id}>
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

        <div className="product-price">
          ${(product.priceCents / 100).toFixed(2)}
        </div>

        <div className="product-quantity-container">
          <select>
            {[...Array(10).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="product-spacer"></div>

        <div className="added-to-cart">
          <img src="images/icons/checkmark.png" />
          Added
        </div>

        <button className="add-to-cart-button button-primary">
          Add to Cart
        </button>
      </div>
    );
  });

  return product;
}

export default ProductContainer;
