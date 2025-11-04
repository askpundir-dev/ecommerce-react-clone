import "./Loading.css";

function Loading({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <div className="loading-body-styles">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
}

export default Loading;
