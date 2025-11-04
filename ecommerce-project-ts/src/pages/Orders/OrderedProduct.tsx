import dayjs from "dayjs";
import { Link } from "react-router";
import addToCart from "../../utils/addToCart";
import type { Dispatch, SetStateAction } from "react";
import { useCart, useProducts } from "../../context-provider/Context";
// import type { Product } from "../../types/productsType";
import type { Package } from "../../types/packageType";
import type { OrderedProductType } from "../../types/ordersType";

interface OrderedProductProps {
  ordered: OrderedProductType;
  set$Package: Dispatch<SetStateAction<Package | null>>;
  orderTimeMs: number;
}

function OrderedProduct({
  ordered,
  set$Package,
  orderTimeMs,
}: OrderedProductProps) {
  const { setCart, loadFetchedCart } = useCart();
  const { products } = useProducts();
  return (
    <>
      <div className="product-image-container">
        <img src={ordered.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{ordered.product.name}</div>
        <div className="product-delivery-date">
          Arriving on: {dayjs(ordered.estimatedDeliveryTimeMs).format("MMMM D")}
        </div>
        <div className="product-quantity">Quantity: {ordered.quantity}</div>
        <button
          onClick={() => {
            console.log("Adding To Cart:", ordered.productId);
            addToCart({
              productId: ordered.productId,
              setCart,
              products,
              loadFetchedCart,
            });
          }}
          className="buy-again-button button-primary"
        >
          <img className="buy-again-icon" src="images/icons/buy-again.png" />
          <span className="buy-again-message">Add to Cart</span>
        </button>
      </div>

      <div className="product-actions">
        <Link to="/tracking">
          <button
            onClick={() => {
              console.log("trackPackage:", ordered.productId);
              console.log(ordered);
              set$Package(() => {
                return {
                  productId: ordered.productId,
                  orderTimeMs,
                  name: ordered.product.name,
                  image: ordered.product.image,
                  quantity: ordered.quantity,
                  estimatedDeliveryTimeMs: ordered.estimatedDeliveryTimeMs,
                };
              });
            }}
            className="track-package-button button-secondary"
          >
            Track package
          </button>
        </Link>
      </div>
    </>
  );
}

export default OrderedProduct;
