// helper for formatting cents into dollar string
export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}
