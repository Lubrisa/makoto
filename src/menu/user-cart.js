import { MenuItem } from "./menu-item.js";
import { MenuTableRow } from "./menu-table-row.js";
import { MenuTableController } from "./menu-table-controller.js";

export class UserCart {
  #cartItems = new Map();

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

  increaseCartItemQuantity(menuItemId) {
    if (menuItemId === undefined)
      throw new TypeError(
        "Missing parameter in the increase of a cart item quantity. You must give a menu item id."
      );
    if (typeof menuItemId !== "number")
      throw new TypeError(
        "Invalid type for menu item id, this field must be a number."
      );

    if (!this.#cartItems.has(menuItemId)) this.addItemToCart(menuItemId);
    else this.#cartItems.set(menuItemId, this.#cartItems.get(menuItemId) + 1);
  }

  decreaseCartItemQuantity(menuItemId) {
    if (menuItemId === undefined)
      throw new TypeError(
        "Missing parameter in the decrease of a cart item quantity. You must give a menu item id."
      );
    if (typeof menuItemId !== "number")
      throw new TypeError(
        "Invalid type for menu item id, this field must be a number."
      );

    if (!this.#cartItems.has(menuItemId))
      throw new Error(
        "The item you are trying to decrease the quantity does not exist in the cart."
      );
    else if (this.#cartItems.get(menuItemId) === 1)
      this.removeItemFromCart(menuItemId);
    else this.#cartItems.set(menuItemId, this.#cartItems.get(menuItemId) - 1);
  }

  addItemToCart(menuItemId) {
    if (menuItemId === undefined)
      throw new TypeError(
        "Missing parameter in the addition of a new item to cart. You must give a menu item instance."
      );
    if (typeof menuItemId !== "number")
      throw new TypeError(
        "Invalid type for menu item, this field must be an instance of MenuItem."
      );

    if (this.#cartItems.has(menuItemId)) return;
    else this.#cartItems.set(menuItemId, 1);
  }

  removeItemFromCart(menuItemId) {
    if (menuItemId === undefined)
        throw new TypeError(
            "Missing parameter in the removal of an item from the cart. You must give a menu item id."
        );
    if (typeof menuItemId !== "number")
      throw new TypeError(
        "Invalid type for menu item, this field must be an instance of MenuItem."
      );

    if (!this.#cartItems.has(menuItemId))
      throw new Error(
        "The item you are trying to remove from the cart does not exist."
      );
    else this.#cartItems.delete(menuItemId);
  }

  get cartItems() {
    return this.#cartItems;
  }
}
