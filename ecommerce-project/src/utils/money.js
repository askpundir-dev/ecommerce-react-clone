// helper for formatting cents into dollar string
export function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}
