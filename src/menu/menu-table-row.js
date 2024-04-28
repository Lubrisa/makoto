import { MenuItem } from "./menu-item.js";

export class MenuTableRow {
  #menuItem;
  #htmlElement;

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

    this.htmlElement
      .querySelector(".add-button")
      .addEventListener("click", this.#onQuantityIncrease.bind(this));
    this.htmlElement
      .querySelector(".remove-button")
      .addEventListener("click", this.#onQuantityDecrease.bind(this));
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

    tableRow.setAttribute("data-id", this.#menuItem.id);
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
    quantitySpan.textContent = "00";
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

  #onQuantityIncrease() {
    const quantityCount =
      this.htmlElement.querySelector(".quantityCounter").textContent;

    try {
      const quantity = parseInt(quantityCount);
      const newQuantity = quantity + 1;
      this.htmlElement.querySelector("span").textContent =
        newQuantity.toString();
      this.#quantityIncreaseListeners.forEach((listener) =>
        listener(this.#menuItem.id, newQuantity)
      );
    } catch (err) {
      console.error(err);
    }
  }

  #onQuantityDecrease() {
    this.#quantityDecreaseListeners.forEach((listener) =>
      listener(this.#menuItem)
    );
  }
}
