// utils/cartSummary.js
export function calculateCartSummary(cart, products, deliveryOptions) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalItems = 0;

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(p => p.id === cartItem.productId);
    if (!matchingProduct) return;

    totalItems += cartItem.quantity;
    productPriceCents += cartItem.quantity * matchingProduct.priceCents;

    const matchingOption = deliveryOptions.find(o => o.id === cartItem.deliveryOptionId);
    if (matchingOption) {
      shippingPriceCents += matchingOption.priceCents;
    }
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = Math.round(totalBeforeTaxCents * 0.1); // 10% tax
  const orderTotalCents = totalBeforeTaxCents + taxCents;

  return {
    totalItems,
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    orderTotalCents
  };
}

// helper for formatting cents into dollar string
export function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
