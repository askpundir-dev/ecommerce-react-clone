function searchProducts({searchProductsRef,allProducts,setProducts}) {
  // console.log(allProducts)
  if (!searchProductsRef.current.value){
    setProducts(allProducts);
    console.log('returning...')
    return;
  } 
  const searchQuery = searchProductsRef.current.value.toLowerCase().trim();
  console.log(searchQuery);
  const searchedProducts = allProducts.filter((product) => {
    const nameMatches = product.name.toLowerCase().includes(searchQuery);
    const keywordsMatchs = product.keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchQuery)
    );
    return nameMatches || keywordsMatchs;
  });
   setProducts(searchedProducts);
   searchProductsRef.current.value='';

}

export default searchProducts;
