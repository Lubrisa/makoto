import { MenuItem } from "./menu-item.js";
import { UserCart } from "./user-cart.js";

export class OrderValueCounter {
  #costCounterElement;

  constructor(userCart, costCounterElement) {
    if (userCart === undefined || costCounterElement === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new order value counter. You must give a user cart instance and a textual element to be the cost counter."
      );
    if (!(userCart instanceof UserCart))
      throw new TypeError(
        "Invalid type for user cart, this field must be a UserCart instance."
      );
    if (!(costCounterElement instanceof HTMLElement))
      throw new TypeError(
        "Invalid type for cost counter element, this field must be an HTMLElement instance."
      );

    this.#costCounterElement = costCounterElement;
    userCart.addCartUpdateListener(this.#updateCostCounter.bind(this));

    const cartItems = userCart.cartItems;
    cartItems.forEach((quantity, menuItem) => {
      this.#updateCostCounter(menuItem, quantity);
    });
  }

  #updateCostCounter(menuItem, quantityDifference) {
    if (menuItem === undefined || quantityDifference === undefined)
      throw new TypeError(
        "Missing parameter in the update of the cost counter. You must give a menu item instance and a number."
      );
    if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item, this field must be a MenuItem instance."
      );
    if (typeof quantityDifference !== "number")
      throw new TypeError(
        "Invalid type for quantity difference, this field must be a number."
      );

    const currentPrice = parseInt(this.#costCounterElement.textContent);
    const priceDifference = menuItem.price * quantityDifference;
    const newPrice = (currentPrice + priceDifference).toFixed(2);
    this.#costCounterElement.textContent = newPrice.toString();
  }
}
