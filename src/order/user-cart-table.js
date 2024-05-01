import { UserCart } from "../user-cart/user-cart.js";
import { UserCartTableRow } from "./user-cart-table-row.js";

export class UserCartTable {
  #tableRows = [];

  constructor(userCart, tbodyElement) {
    if (userCart === undefined || tbodyElement === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new user cart table. You must give a user cart instance and a table element."
      );
    if (!(userCart instanceof UserCart))
      throw new TypeError(
        "Invalid type for user cart, this field must be a UserCart instance."
      );
    if (!(tbodyElement instanceof HTMLElement))
      throw new TypeError(
        "Invalid type for table element, this field must be an HTMLElement instance."
      );

    this.#renderUserCartTable(userCart, tbodyElement);
  }

  #renderUserCartTable(userCart, tbodyElement) {
    for (const cartItem of userCart.cartItems.entries()) {
      const tableRow = new UserCartTableRow(cartItem);
      tbodyElement.appendChild(tableRow.htmlElement);

      this.#tableRows.push(tableRow);
    }
  }

  get tableRows() {
    return this.#tableRows;
  }
}
