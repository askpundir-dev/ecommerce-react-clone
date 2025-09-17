import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid.jsx";
import NoResults from "../../components/NoResults.jsx";
import "./homepage.css";

function HomePage({
  products,
  setProducts,
  allProducts,
  loading,
  cart,
  setCart,
}) {
  // if (loading) {
  //   return (
  //     <div className="loading-body-styles">
  //       <div className="spinner"></div>
  //       <p className="loading-text">Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <title>Home</title>
      <Header {...{ cart, products, setProducts, allProducts }} />
      {loading ? (
        <div className="loading-body-styles">
          <div className="spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <div className={products.length ? "home-page" : "no-results-container"}>
          {products.length ? (
            <ProductsGrid
              {...{ products, cart, setCart, setProducts, allProducts }}
            />
          ) : (
            <NoResults {...{ setProducts, allProducts }} />
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
