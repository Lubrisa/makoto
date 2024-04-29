import { UserCart } from "./user-cart.js";

export function SaveUserCart(userCart) {
  if (userCart === undefined)
    throw new TypeError(
      "Missing parameter in the creation of a new user cart saver. You must give a user cart instance."
    );
  if (!(userCart instanceof UserCart))
    throw new TypeError(
      "Invalid type for user cart, this field must be a UserCart instance."
    );

  const cartItemsAndQuantities = [];
  for (const cartItemAndQuantityPair of userCart.cartItems) {
    const cartItem = cartItemAndQuantityPair[0];
    const quantity = cartItemAndQuantityPair[1];
    const cartItemAndQuantity = { cartItem, quantity };
    cartItemsAndQuantities.push(cartItemAndQuantity);
  }
  const cartItemsJSON = JSON.stringify(cartItemsAndQuantities);
  localStorage.setItem("userCart", cartItemsJSON);
}
