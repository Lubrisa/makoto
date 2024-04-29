export function RetrieveUserCart() {
  const cartItemsJSON = localStorage.getItem("userCart");
  if (cartItemsJSON === null) return null;

  return JSON.parse(cartItemsJSON);
}
