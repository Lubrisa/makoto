import { MenuItem } from "./menu-item.js";
import { MenuTableRow } from "./menu-table-row.js";
import { MenuTableController } from "./menu-table-controller.js";

export class UserCart {
  #cartItems = new Map();
  #cardUpdateListeners = [];

  constructor(menuTableController) {
    if (menuTableController === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new user cart. You must give a menu table controller instance."
      );
    if (!(menuTableController instanceof MenuTableController))
      throw new TypeError(
        "Invalid type for menu table controller, this field must be a MenuTableController instance."
      );

    const tableRows = menuTableController.menuTableRows;
    tableRows.forEach((row) => {
      row.addQuantityIncreaseListener(this.increaseCartItemQuantity.bind(this));
      row.addQuantityDecreaseListener(this.decreaseCartItemQuantity.bind(this));
    });
  }

  increaseCartItemQuantity(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the increase of a cart item quantity. You must give a menu item id."
      );
    if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item id, this field must be a instance of MenuItem."
      );

    if (this.addItemToCart(menuItem))
      this.#cartItems.set(menuItem, this.#cartItems.get(menuItem) + 1);
  }

  decreaseCartItemQuantity(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the decrease of a cart item quantity. You must give a menu item id."
      );
    if (typeof menuItem !== "number")
      throw new TypeError(
        "Invalid type for menu item id, this field must be a number."
      );

    if (!this.#cartItems.has(menuItem))
      throw new Error(
        "The item you are trying to decrease the quantity does not exist in the cart."
      );
    else if (this.#cartItems.get(menuItem) === 1)
      this.removeItemFromCart(menuItem);
    else this.#cartItems.set(menuItem, this.#cartItems.get(menuItem) - 1);
  }

  addItemToCart(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the addition of a new item to cart. You must give a menu item instance."
      );
    if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item, this field must be an instance of MenuItem."
      );

    if (this.#cartItems.has(menuItem)) return true;
    else this.#cartItems.set(menuItem, 1);
  }

  removeItemFromCart(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the removal of an item from the cart. You must give a menu item id."
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

  addCartUpdateListener(callback) {
    if (callback === undefined)
      throw new TypeError(
        "Missing parameter in the addCartUpdateListener method. You must give a callback function."
      );
    if (typeof callback !== "function")
      throw new TypeError(
        "Invalid type for the callback parameter in the addCartUpdateListener method. You must give a callback function."
      );

    this.#cardUpdateListeners.push(callback);
  }

  #onCartUpdate(cartItem, newItemQuantity) {
    this.#cardUpdateListeners.forEach((listener) =>
      listener(cartItem, newItemQuantity)
    );
  }

  getCartItemQuantity(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the getCardItemQuantity method. You must give a menu item instance."
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
