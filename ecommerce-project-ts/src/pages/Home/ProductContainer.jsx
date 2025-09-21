import { useProducts } from "../../context-provider/Context";
import Product from "./Product";
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
