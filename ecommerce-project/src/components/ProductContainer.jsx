import './ProductContainer.css';

import products from '../../data/products.js';
function ProductContainer() {

const product=products.map((product) => {
console.log(product);

  return(
    <>
    <div className="product-container" key={crypto.randomUUID()}>
            <div className="product-image-container">
              <img
                className="product-image"
                src={product.image}
              />
            </div>

            <div className="product-name limit-text-to-2-lines">
            {product.name}
            </div>

            <div className="product-rating-container">
              <img
                className="product-rating-stars"
                src={`../public/images/ratings/rating-${product.rating.stars*10}.png`}
              />
              <div className="product-rating-count link-primary">{product.rating.count}</div>
            </div>

            <div className="product-price">${product.priceCents}</div>

            <div className="product-quantity-container">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
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
    
    </>
  );
  
  
  
})
console.log(product);
return product
}





export default ProductContainer;