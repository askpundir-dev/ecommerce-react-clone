import Header from "../components/Header";
import ProductContainer from '../components/ProductContainer.jsx'
import './homepage.css';


function HomePage() {
  return (
    <>
      <Header />

      <div className="home-page">
        <div className="products-grid">         
          <ProductContainer />
        </div>
      </div>
    </>
  );
}

export default HomePage;
