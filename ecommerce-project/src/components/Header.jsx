import { Link, useNavigate } from "react-router";
import { useRef} from "react";
import searchProducts from "../utils/searchProducts.js";
import "./Header.css";
import { useProducts, useCart } from "../context-provider/Context.js";

function Header() {
  const headerInputBoxRef = useRef(null);
  const { cart, loadFetchedCart } = useCart();
  const { products, setProducts, allProducts, loadFetchedProducts } =
    useProducts();
  const navigate = useNavigate();

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link
            to="/"
            className="header-link"
            onClick={() => {
              loadFetchedProducts();
            }}
          >
            <img className="logo" src="images/amazon-logo-white.png" />
            <img
              className="mobile-logo"
              src="images/amazon-mobile-logo-white.png"
            />
          </Link>
        </div>

        <div className="middle-section">
          <input
            ref={headerInputBoxRef}
            className="search-bar"
            type="text"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/");
                searchProducts({
                  products,
                  headerInputBoxRef,
                  allProducts,
                  setProducts,
                });
                e.target.blur();
              }
            }}
          />

          <button
            className="search-button"
            onClick={() => {
              navigate("/");
              searchProducts({
                products,
                headerInputBoxRef,
                allProducts,
                setProducts,
              });
            }}
          >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link to="/orders" className="orders-link header-link">
            <span className="orders-text">Orders</span>
          </Link>

          <Link
            to="/checkout"
            className="cart-link header-link"
            onClick={loadFetchedCart}
          >
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">
              {cart.reduce((acc, cur) => (acc += cur.quantity), 0)}
            </div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default Header;
