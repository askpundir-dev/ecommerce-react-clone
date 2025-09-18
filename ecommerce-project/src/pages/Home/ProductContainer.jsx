import Product from "./Product.jsx";
import "./ProductContainer.css";

function ProductContainer({ products, setCart,fetchCart }) {
  return (
    <>
      {products.map((product) => (
        <Product {...{ product, setCart, products }} key={product.id} fetchCart={fetchCart} />
      ))}
    </>
  );
}

export default ProductContainer;
