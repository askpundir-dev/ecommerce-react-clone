import ProductContainer from "./ProductContainer";
import './ProductsGrid.css'

/**
 * Renders a grid layout for displaying products.
 * @param {object} props - The component props.
 * @param {Array<object>} props.products - An array of product objects to display.
 * @param {Array<object>} props.cart - The current state of the shopping cart.
 * @param {Function} props.setCart - Function to update the shopping cart state.
 * @param {Function} props.fetchCart - Function to refetch the cart data.
 * @returns {JSX.Element} A component that displays products in a grid.
 */
function ProductsGrid({ products, cart, setCart,fetchCart }) {
  return (
    <div className="products-grid">
      <ProductContainer products={products} cart={cart} setCart={setCart} fetchCart={fetchCart} />
    </div>
  );
}

export default ProductsGrid;