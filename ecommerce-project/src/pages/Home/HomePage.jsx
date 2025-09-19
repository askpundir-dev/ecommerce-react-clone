import { useProducts } from "../../context-provider/Context.js";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid.jsx";
import NoResults from "../../components/NoResults.jsx";
import Loading from "../../components/Loading.jsx";
import "./homepage.css";

function HomePage() {
  const { loading, loadFetchedProducts, products } = useProducts();
  return (
    <>
      <title>Home</title>
      <Header />

      <Loading loading={loading} />

      {!loading && (
        <div className={products.length ? "home-page" : "no-results-container"}>
          {products.length ? (
            <ProductsGrid />
          ) : (
            <NoResults {...{ loadFetchedProducts }} />
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
