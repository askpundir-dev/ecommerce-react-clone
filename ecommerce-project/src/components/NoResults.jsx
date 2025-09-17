import "./NoResults.css";

function NoResults({ setProducts, allProducts }) {
  return (
    <>
      <div className="no-results">
        <img
          src="images/no-results.jpg"
          alt="No results"
          className="no-results-img"
        />
        <p className="no-results-text">
          Sorry, we don't have this product in our inventory yet.
        </p>
        <button
          className="no-results-btn"
          onClick={() => {
            // window.location.href = "/";
            setProducts(allProducts);
          }}
        >
          Go back to all products
        </button>
      </div>
    </>
  );
}

export default NoResults;
