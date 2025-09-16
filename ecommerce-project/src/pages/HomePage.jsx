import Header from "../components/Header";
import ProductContainer from "../components/ProductContainer.jsx";
import NoResults from "../components/NoResults.jsx";
import "./homepage.css";

/**
 * Renders the main home page of the e-commerce application.
 * It displays a header, a grid of products, and handles loading and no-results states.
 *
 * @param {object} props - The component props.
 * @param {Array<object>} props.products - The array of products to be displayed (potentially filtered).
 * @param {function} props.setProducts - Function to update the `products` state, used for filtering/searching.
 * @param {Array<object>} props.allProducts - The complete, unfiltered list of all available products.
 * @param {boolean} props.loading - A boolean flag indicating if the product data is currently being fetched.
 * @param {function} props.setCart - Function to update the cart's contents.
 * @returns {JSX.Element} The JSX for the home page, which includes a header and a product container. It shows a loading indicator while data is being fetched or a "No Results" component if the products list is empty.
 */
function HomePage({ products, setProducts, allProducts, loading, cart,setCart }) {
 

  //if i don't want to show loading
  // if (loading) {
  //   return null;
  // }

  if (loading) {
    return (
      <div className="loading-body-styles">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  //shorthand syntax method  for passing props
  return (
    <>
    <title>Home</title>
      <Header {...{ cart, products, setProducts, allProducts }} />

      <div className="home-page">
        <div className={`products-grid ${!products.length ? "is-empty" : ""}`}>
          {products.length ? (
            <ProductContainer
              products={products}
              cart={cart}
              setCart={setCart}
            />
          ) : (
            <NoResults {...{ setProducts, allProducts }} />
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
