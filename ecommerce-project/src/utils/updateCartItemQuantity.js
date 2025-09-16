function updateCartItemInState(prevCart, updatedItem) {
  return prevCart.map((item) =>
    item.productId === updatedItem.productId
      ? { ...item, quantity: updatedItem.quantity }
      : item
  );
}
export default updateCartItemInState;