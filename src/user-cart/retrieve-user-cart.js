export function RetrieveUserCart() {
  const cartItemsJSON = localStorage.getItem("userCart");
  if (cartItemsJSON === null) return null;

  const userCartData = JSON.parse(cartItemsJSON);
  const userCart = new Map();
  userCartData.forEach((cartItemAndQuantity) => {
    const { cartItem, quantity } = cartItemAndQuantity;
    userCart.set(cartItem, quantity);
  });

  return userCart;
}
