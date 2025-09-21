function searchProducts({ headerInputBoxRef, allProducts, setProducts }) {
  // console.log(allProducts)
  if (!headerInputBoxRef.current.value) {
    setProducts(allProducts);
    console.log("returning...");
    return;
  }
  const searchQuery = headerInputBoxRef.current.value.toLowerCase().trim();
  console.log(searchQuery);
  const searchedProducts = allProducts.filter((product) => {
    const nameMatches = product.name.toLowerCase().includes(searchQuery);
    const keywordsMatches = product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery)
    );
    return nameMatches || keywordsMatches;
  });
  setProducts(searchedProducts);
  headerInputBoxRef.current.value = "";
}

export default searchProducts;
