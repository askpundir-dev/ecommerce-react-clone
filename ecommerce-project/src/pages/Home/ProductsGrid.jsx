import ProductContainer from "./ProductContainer";
import './ProductsGrid.css'
function ProductsGrid({ products, cart, setCart,fetchCart }) {
  return (
    <div className="products-grid">
      <ProductContainer products={products} cart={cart} setCart={setCart} fetchCart={fetchCart} />
    </div>
  );
}

export default ProductsGrid;
