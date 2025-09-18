import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid.jsx";
import NoResults from "../../components/NoResults.jsx";
import "./homepage.css";

/**
 * Renders the home page of the application.
 * This component displays a header, a grid of products, and handles loading and no-results states.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.products - The array of products to display. This can be a filtered list.
 * @param {Function} props.setProducts - The state setter function to update the list of displayed products.
 * @param {Array<object>} props.allProducts - The complete, unfiltered list of all products.
 * @param {boolean} props.loading - A flag to indicate if the product data is currently being loaded.
 * @param {Array<object>} props.cart - The array of items currently in the shopping cart.
 * @param {Function} props.setCart - The state setter function to update the cart.
 * @returns {JSX.Element} The rendered home page component.
 */
function HomePage({
  products,
  setProducts,
  allProducts,
  loading,
  cart,
  setCart,
  fetchCart,
  fetchProducts
  }) 
{  
  return (
    <>
      <title>Home</title>
      <Header {...{ cart, products, setProducts, allProducts, fetchCart,fetchProducts }} />
      {
      loading ? 
      (
        <div className="loading-body-styles">
          <div className="spinner"></div>
          <p className="loading-text">
            Loading...
          </p>
        </div>
      ) : (
        <div className={products.length ? "home-page" : "no-results-container"}>
          {
          products.length ? 
          (
            <ProductsGrid
              {...{ products, cart, setCart, setProducts, allProducts,fetchCart }}
            />
          ) : (
            <NoResults {...{ setProducts, allProducts }} />
              )
          }
        </div>
          )
      }
    </>
  );
}

export default HomePage;
