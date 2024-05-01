export function RetrieveUserCart() {
  const userCart = new Map();

  const cartItemsJSON = localStorage.getItem("userCart");
  if (cartItemsJSON === null) return userCart;

  const userCartData = JSON.parse(cartItemsJSON);
  userCartData.forEach((menuItemIdAndQuantity) => {
    const { cartItem, quantity } = menuItemIdAndQuantity;
    userCart.set(cartItem, quantity);
  });

  return userCart;
}
