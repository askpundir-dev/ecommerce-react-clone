import ProductContainer from "./ProductContainer";
import './ProductsGrid.css'
function ProductsGrid({ products, cart, setCart }) {
  return (
    <div className="products-grid">
      <ProductContainer products={products} cart={cart} setCart={setCart} />
    </div>
  );
}

export default ProductsGrid;
