import type { Product } from "../types/productsType";
import type { RefObject, Dispatch, SetStateAction } from "react";

interface SearchProductsParams {
  headerInputBoxRef: RefObject<HTMLInputElement | null>;
  allProducts: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

function searchProducts({
  headerInputBoxRef,
  allProducts,
  setProducts,
}: SearchProductsParams): void {
  const value = headerInputBoxRef.current?.value?.trim().toLowerCase();

  if (!value) {
    setProducts(allProducts);
    console.log("returning...");
    return;
  }

  const searchedProducts = allProducts.filter((product) => {
    const nameMatches = product.name.toLowerCase().includes(value);
    const keywordsMatches = product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(value)
    );
    return nameMatches || keywordsMatches;
  });

  setProducts(searchedProducts);

  if (headerInputBoxRef.current) {
    headerInputBoxRef.current.value = "";
  }
}

export default searchProducts;
