import axios from "axios";
import {useEffect,useState } from 'react';
import "./ProductContainer.css";


function ProductContainer() {
  const [products, setProducts] = useState([]);
  // USING AXIOS FOR data fetching no need of error handling here as axios has it inbuilt
useEffect(()=>{
  
axios.get("http://localhost:3000/api/products")
    .then((response) => {
      setProducts(response.data)
    })
  .catch(error=>{
    console.error("Error fetching data:",error);
  }) 
},[]);

/*
// USING ASYNC AWAIT data fetching THIS ALSO NEEDS ERROR HANDLING
useEffect(() => {
  async function loadData() {
    const res = await fetch('http://localhost:3000/api/products');
    const data = await res.json();
    setProducts(data);
  }
  loadData();
}, []);
*/
  


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
