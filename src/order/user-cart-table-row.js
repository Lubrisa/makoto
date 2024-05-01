export class UserCartTableRow {
  #cartItem;
  #htmlElement;
  #total = 0;

  constructor(cartItem) {
    if (cartItem === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new user cart table row. You must give a cart item."
      );

    this.#cartItem = cartItem;
    this.#htmlElement = this.#htmlElement;
  }

  get htmlElement() {
    if (this.#htmlElement) return this.#htmlElement;

    const tableRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const quantityCell = document.createElement("td");
    const totalCell = document.createElement("td");

    const [menuItem, quantity] = this.#cartItem;

    nameCell.textContent = menuItem.name;
    priceCell.textContent = menuItem.price;
    quantityCell.textContent = quantity;
    this.#total = menuItem.price * quantity;
    totalCell.textContent = total;

    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(quantityCell);
    tableRow.appendChild(totalCell);

    return tableRow;
  }

  get cartItem() {
    return this.#cartItem;
  }

  get total() {
    return this.#total;
  }
}
