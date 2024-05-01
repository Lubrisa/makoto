import { UserCart } from "./user-cart.js";
import { MenuTableController } from "../menu/menu-table-controller.js";

export class UserCartController {
  #cardUpdateListeners = [];

  constructor(userCart, menuTableController) {
    if (userCart === undefined || menuTableController === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new UserCartController. You must give a UserCart and a MenuTableController instance."
      );
    else if (!(userCart instanceof UserCart))
      throw new TypeError(
        "Invalid type for user cart, this field must be a UserCart instance."
      );
    else if (!(menuTableController instanceof MenuTableController))
      throw new TypeError(
        "Invalid type for menu table controller, this field must be a MenuTableController instance."
      );

    const tableRows = menuTableController.menuTableRows;
    tableRows.forEach((row) => {
      row.addQuantityIncreaseListener((menuItem) => {
        userCart.increaseCartItemQuantity(menuItem);
        this.#onCartUpdate(menuItem, 1);
      });
      row.addQuantityDecreaseListener((menuItem) => {
        userCart.decreaseCartItemQuantity(menuItem);
        this.#onCartUpdate(menuItem, -1);
      });
    });
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
}
