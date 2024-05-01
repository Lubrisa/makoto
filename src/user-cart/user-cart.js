import { MenuItem } from "../menu/menu-item.js";
import { MenuTableController } from "../menu/menu-table-controller.js";

export class UserCart {
  #cartItems = new Map();
  #cardUpdateListeners = [];

  constructor(menuTableController) {
    if (menuTableController === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new user cart. You must give a MenuTableController instance."
      );
    if (!(menuTableController instanceof MenuTableController))
      throw new TypeError(
        "Invalid type for menu table controller, this field must be a MenuTableController instance."
      );

    const tableRows = menuTableController.menuTableRows;
    tableRows.forEach((row) => {
      row.addQuantityIncreaseListener(this.increaseCartItemQuantity.bind(this));
      row.addQuantityDecreaseListener(this.decreaseCartItemQuantity.bind(this));

      if (row.count > 0)
        this.increaseCartItemQuantity(row.menuItem, row.count);
    });
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

    if (this.getCartItemQuantity(menuItem) === 0) this.addItemToCart(menuItem);
    else this.#cartItems.set(menuItem, this.getCartItemQuantity(menuItem) + 1);

    this.#onCartUpdate(menuItem, quantity);
  }

  decreaseCartItemQuantity(menuItem, quantity = -1) {
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
    else if (quantity >= 0)
      throw new Error("You must remove at least one item from the cart.");
    else if (!this.#cartItems.has(menuItem))
      throw new Error(
        "The item you are trying to decrease the quantity does not exist in the cart."
      );

    if (this.getCartItemQuantity(menuItem) === 1) {
      this.removeItemFromCart(menuItem);
      this.#onCartUpdate(menuItem, quantity);
      return;
    }

    const currentQuantity = this.getCartItemQuantity(menuItem);
    const newQuantity = currentQuantity - quantity;

    if (newQuantity < 0)
      throw new Error("You are trying to remove more items than the cart has.");
    else if (newQuantity === 0) this.removeItemFromCart(menuItem);
    else this.#cartItems.set(menuItem, this.getCartItemQuantity(menuItem) - 1);

    this.#onCartUpdate(menuItem, quantity);
  }

  addItemToCart(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the addition of a new item to cart. You must give a MenuItem instance."
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

  #onCartUpdate(cartItem, cartItemDifference) {
    this.#cardUpdateListeners.forEach((listener) =>
      listener(cartItem, cartItemDifference)
    );
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
