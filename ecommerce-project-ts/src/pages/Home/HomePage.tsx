import { useProducts } from "../../context-provider/Context";
import Header from "../../components/Header";
import ProductsGrid from "./ProductsGrid";
import NoResults from "../../components/NoResults";
import Loading from "../../components/Loading";
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
