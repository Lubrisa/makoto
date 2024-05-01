import { MenuItem } from "../menu/menu-item.js";
import { MenuTableController } from "../menu/menu-table-controller.js";

export class UserCart {
  #cartItems = new Map();

  constructor(userCartData = new Map(), menuItems = []) {
    if (!(userCartData instanceof Map))
      throw new TypeError(
        "Invalid type for user cart data, this field must be a Map instance."
      );
    else if (!Array.isArray(menuItems))
      throw new TypeError(
        "Invalid type for menu items, this field must be an array."
      );
    else if (menuItems.some((item) => !(item instanceof MenuItem)))
      throw new TypeError(
        "Invalid type for menu items, all elements must be instances of MenuItem."
      );
    for (const key of userCartData.keys()) {
      if (typeof key !== "number" || key < 0)
        throw new TypeError(
          "Invalid type for user cart data key, it must be a number equals or greater than zero."
        );
    }

    for (const menuItemIdCountPair of userCartData.entries()) {
      const [menuItemId, count] = menuItemIdCountPair;
      const menuItem = menuItems.find((item) => item.id === menuItemId);
      if (menuItem === undefined)
        throw new Error(
          "The user cart data has a key that does not match any menu item."
        );
      this.increaseCartItemQuantity(menuItem, count);
    }
  }

  increaseCartItemQuantity(menuItem, quantity = 1) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the increase of a cart item quantity. You must give a MenuItem instance."
      );
    else if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item id, this field must be a instance of MenuItem."
      );
    else if (typeof quantity !== "number")
      throw new TypeError(
        "Invalid type for quantity, this field must be a number."
      );
    else if (quantity <= 0)
      throw new Error("You must add at least one item to the cart.");

    if (this.getCartItemQuantity(menuItem) === 0)
      this.addItemToCart(menuItem, quantity);
    else
      this.#cartItems.set(
        menuItem,
        this.getCartItemQuantity(menuItem) + quantity
      );
  }

  decreaseCartItemQuantity(menuItem, quantity = 1) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the decrease of a cart item quantity. You must give a MenuItem instance."
      );
    else if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item id, this field must be a number."
      );
    else if (typeof quantity !== "number")
      throw new TypeError(
        "Invalid type for quantity, this field must be a number."
      );
    else if (quantity === 0)
      throw new Error("You must remove at least one item from the cart.");
    else if (quantity < 0)
      throw new Error("You must give a positive value to be removed.");
    else if (!this.#cartItems.has(menuItem))
      throw new Error(
        "The item you are trying to decrease the quantity does not exist in the cart."
      );

    if (this.getCartItemQuantity(menuItem) === 1) {
      this.removeItemFromCart(menuItem);
      return;
    }

    const currentQuantity = this.getCartItemQuantity(menuItem);
    const newQuantity = currentQuantity - quantity;

    if (newQuantity < 0)
      throw new Error("You are trying to remove more items than the cart has.");
    else if (newQuantity === 0) this.removeItemFromCart(menuItem);
    else this.#cartItems.set(menuItem, this.getCartItemQuantity(menuItem) - 1);
  }

  addItemToCart(menuItem, quantity = 1) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the addition of a new item to cart. You must give a MenuItem instance."
      );
    if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item, this field must be an instance of MenuItem."
      );

    if (this.#cartItems.has(menuItem)) return true;
    else this.#cartItems.set(menuItem, quantity);
  }

  removeItemFromCart(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the removal of an item from the cart. You must give a MenuItem id."
      );
    if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item, this field must be an instance of MenuItem."
      );

    if (!this.#cartItems.has(menuItem))
      throw new Error(
        "The item you are trying to remove from the cart does not exist."
      );
    else this.#cartItems.delete(menuItem);
  }

  getCartItemQuantity(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the getCardItemQuantity method. You must give a MenuItem instance."
      );
    if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item, this field must be an instance of MenuItem."
      );

    if (!this.#cartItems.has(menuItem)) return 0;
    return this.#cartItems.get(menuItem);
  }

  get cartItems() {
    return this.#cartItems;
  }
}
