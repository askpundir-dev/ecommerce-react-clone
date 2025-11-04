import "./NoResults.css";

function NoResults({
  loadFetchedProducts,
}: {
  loadFetchedProducts: () => Promise<void>;
}) {
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
        <button className="no-results-btn" onClick={loadFetchedProducts}>
          Go back to all products
        </button>
      </div>
    </>
  );
}

export default NoResults;
