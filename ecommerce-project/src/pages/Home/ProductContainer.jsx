import { useProducts } from "../../context-provider/Context.js";
import Product from "./Product.jsx";
import "./ProductContainer.css";

function ProductContainer() {
  const  {products} = useProducts();
  return (
    <>
      {products.map((product) => (
        <Product {...{ product, products }} key={product.id} />
      ))}
    </>
  );
}

export default ProductContainer;
