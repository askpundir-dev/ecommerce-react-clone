import Product from "./Product.jsx";
import "./ProductContainer.css";

/**
 * Renders a container that displays a list of products.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.products - An array of product objects to be rendered.
 * @param {Function} props.setCart - A function to update the cart state.
 * @param {Function} props.fetchCart - A function to refetch the cart data.
 * @returns {JSX.Element} A React fragment containing a list of `Product` components.
 */
function ProductContainer({ products, setCart, fetchCart }) {
  return (
    <>
      {products.map((product) => (
        <Product
          {...{ product, setCart, products }}
          key={product.id}
          fetchCart={fetchCart}
        />
      ))}
    </>
  );
}

export default ProductContainer;
