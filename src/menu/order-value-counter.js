import { MenuItem } from "./menu-item.js";
import { MenuTableController } from "./menu-table-controller.js";

export class OrderValueCounter {
  #costCounterElement;
  #currentPrice = 0;

  constructor(menuTableController, costCounterElement) {
    if (menuTableController === undefined || costCounterElement === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new order value counter. You must give a MenuTableController instance and a textual element to be the cost counter."
      );
    else if (!(menuTableController instanceof MenuTableController))
      throw new TypeError(
        "Invalid type for menu table controller, this field must be a MenuTableController instance."
      );
    else if (!(costCounterElement instanceof HTMLElement))
      throw new TypeError(
        "Invalid type for cost counter element, this field must be an HTMLElement instance."
      );

    this.#costCounterElement = costCounterElement;
    menuTableController.menuTableRows.forEach((menuTableRow) => {
      this.#updateCostCounter(menuTableRow.menuItem, menuTableRow.count);
    });
    menuTableController.addMenuTableUpdateListener(
      this.#updateCostCounter.bind(this)
    );
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

    const priceDifference = menuItem.price * quantityDifference;
    const newPrice = this.#currentPrice + priceDifference;
    this.#currentPrice = newPrice <= 0 ? 0 : newPrice;
    this.#costCounterElement.textContent = this.#currentPrice.toFixed(2);
  }

  get currentPrice() {
    return this.#currentPrice;
  }
}
