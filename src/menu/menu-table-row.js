import { MenuItem } from "./menu-item.js";

export class MenuTableRow {
  #menuItem;
  #htmlElement;
  #count;

  #quantityIncreaseListeners = [];
  #quantityDecreaseListeners = [];

  constructor(menuItem) {
    if (menuItem === undefined)
      throw new TypeError(
        "Missing parameter in the creation of a new menu table row. You must give a menu item instance."
      );
    else if (!(menuItem instanceof MenuItem))
      throw new TypeError(
        "Invalid type for menu item, this field must be a MenuItem instance."
      );

    this.#menuItem = menuItem;
    this.#htmlElement = this.htmlElement;
    this.#count = 0;

    this.htmlElement
      .querySelector(".add-button")
      .addEventListener("click", this.increaseQuantity.bind(this, 1));
    this.htmlElement
      .querySelector(".remove-button")
      .addEventListener("click", this.decreaseQuantity.bind(this, 1));
  }

  get htmlElement() {
    if (this.#htmlElement) return this.#htmlElement;

    const tableRow = document.createElement("tr");
    const nameCell = document.createElement("td");
    const priceCell = document.createElement("td");
    const quantityCell = document.createElement("td");
    const addButton = document.createElement("button");
    const addButtonIcon = document.createElement("i");
    const quantitySpan = document.createElement("span");
    const removeButton = document.createElement("button");
    const removeButtonIcon = document.createElement("i");

    nameCell.textContent = this.#menuItem.name;
    priceCell.textContent = this.#menuItem.price;
    quantityCell.classList.add(
      "d-table-cell",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    addButton.setAttribute("type", "button");
    addButton.classList.add(
      "btn",
      "btn-outline-dark",
      "btn-sm",
      "fs-5",
      "add-button"
    );
    addButtonIcon.classList.add("bi", "bi-plus-circle");
    quantitySpan.classList.add("mx-2", "mx-md-4", "quantity-counter");
    quantitySpan.textContent = "0";
    removeButton.setAttribute("type", "button");
    removeButton.classList.add(
      "btn",
      "btn-outline-dark",
      "btn-sm",
      "fs-5",
      "remove-button"
    );
    removeButtonIcon.classList.add("bi", "bi-dash-circle");

    addButton.appendChild(addButtonIcon);
    removeButton.appendChild(removeButtonIcon);
    quantityCell.appendChild(addButton);
    quantityCell.appendChild(quantitySpan);
    quantityCell.appendChild(removeButton);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(quantityCell);

    return tableRow;
  }

  addQuantityIncreaseListener(callback) {
    if (callback === undefined)
      throw new TypeError(
        "Missing parameter in the addQuantityIncreaseListener method. You must give a callback function."
      );
    else if (typeof callback !== "function")
      throw new TypeError(
        "Invalid type for the callback parameter in the addQuantityIncreaseListener method. You must give a function."
      );

    this.#quantityIncreaseListeners.push(callback);
  }

  addQuantityDecreaseListener(callback) {
    if (callback === undefined)
      throw new TypeError(
        "Missing parameter in the addQuantityIncreaseListener method. You must give a callback function."
      );
    else if (typeof callback !== "function")
      throw new TypeError(
        "Invalid type for the callback parameter in the addQuantityIncreaseListener method. You must give a function."
      );

    this.#quantityDecreaseListeners.push(callback);
  }

  increaseQuantity(quantity) {
    const newQuantity = this.#count + quantity;
    this.#count = newQuantity;

    this.htmlElement.querySelector("span").textContent = newQuantity.toString();

    this.#onQuantityIncrease();
  }

  decreaseQuantity(quantity) {
    if (this.#count === 0) return;

    const newQuantity = this.#count - 1;
    this.#count = newQuantity;

    this.htmlElement.querySelector("span").textContent = newQuantity.toString();

    this.#onQuantityDecrease();
  }

  #onQuantityIncrease() {
    this.#quantityIncreaseListeners.forEach((listener) =>
      listener(this.#menuItem)
    );
  }

  #onQuantityDecrease() {
    this.#quantityDecreaseListeners.forEach((listener) =>
      listener(this.#menuItem)
    );
  }
}
