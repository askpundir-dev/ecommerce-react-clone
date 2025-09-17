import Product from "./Product.jsx";
import "./ProductContainer.css";

function ProductContainer({ products, setCart }) {
  return (
    <>
      {products.map((product) => (
        <Product {...{ product, setCart, products }} key={product.id} />
      ))}
    </>
  );
}

export default ProductContainer;
