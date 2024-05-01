import { UserCartTable } from "./user-cart-table.js";

export class OrderFormTotalCounter {
  constructor(userCartTable, totalCounterElement) {
    if (userCartTable === undefined || totalCounterElement === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new order form total counter. You must give a UserCartTable instance and a textual html element to be the counter."
      );
    else if (!(userCartTable instanceof UserCartTable))
      throw new TypeError(
        "Invalid type for user cart table, this field must be a UserCartTable instance."
      );
    else if (!(totalCounterElement instanceof HTMLElement))
      throw new TypeError(
        "Invalid type for total counter element, this field must be an HTMLElement instance."
      );

    this.#updateTotalCounter(userCartTable, totalCounterElement);
  }

  #updateTotalCounter(userCartTable, totalCounterElement) {
    const total = userCartTable.tableRows.reduce((total, tableRow) => total + tableRow.total, 0);

    totalCounterElement.textContent = total;
  }
}
