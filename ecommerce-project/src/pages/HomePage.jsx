import Header from "../components/Header";
import ProductContainer from "../components/ProductContainer.jsx";
import NoResults from "../components/NoResults.jsx";
import "./homepage.css";

function HomePage({
  cartQuantity,
  setCartQuantity,
  products,
  setProducts,
  allProducts,
  loading,
  setCart,
}) {
  document.title = "Home";

 //if i dont want to show loading
  // if (loading) { 
  //   return null;
  // }

  if (loading) {
    return (
      <div className="loading-body-styles">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  //shorthand syntax method  for passing props
  return (
    <>
      <Header {...{ cartQuantity, products, setProducts, allProducts }} />

      <div className="home-page">
        <div className={`products-grid ${!products.length ? "is-empty" : ""}`}>
          {products.length ? (
            <ProductContainer
              setCartQuantity={setCartQuantity}
              products={products}
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
