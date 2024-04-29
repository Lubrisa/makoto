class MenuItem {
  #id;
  #name;
  #price;

  constructor(id, name, price) {
    if (!id || !name || !price)
      throw new TypeError(
        "Missing parameter in the creation of a new menu item. You must give an id, name and price."
      );
    else if (typeof id !== "number")
      throw new TypeError(
        "Invalid type for menu item id, this field must be a number."
      );
    else if (typeof price !== "number")
      throw new TypeError(
        "Invalid type for menu item price, this field must be a number."
      );
    else if (typeof name !== "string")
      throw new TypeError(
        "Invalid type for menu item name, this field must be a string."
      );

    this.#id = id;
    this.#name = name;
    this.#price = price;
  }

  get getId() {
    return this.#id;
  }

  get getName() {
    return this.#name;
  }

  get getPrice() {
    return this.#price;
  }
}

class MenuTable {
  #menuItems;

  constructor(menuItems = []) {
    if (menuItems.some((item) => !(item instanceof MenuItem)))
      throw new TypeError(
        "Invalid type for menu items, all items must be instances of MenuItem."
      );

    this.#menuItems = menuItems;
  }

  getMenuItems() {
    return this.#menuItems;
  }

  getMenuItemById(id) {
    return this.#menuItems.find((item) => item.getId === id);
  }
}

class MenuTableRow {
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

  #onQuantityIncrease() {
    const newQuantity =
      parseInt(
        this.htmlElement.querySelector(".quantity-counter").textContent
      ) + 1;

    this.htmlElement.querySelector("span").textContent = newQuantity.toString();

    this.#quantityIncreaseListeners.forEach((listener) =>
      listener(this.#menuItem.id)
    );
  }

  #onQuantityDecrease() {
    const currentQuantity = parseInt(
      this.htmlElement.querySelector(".quantity-counter").textContent
    );

    if (currentQuantity === 0) return;

    const newQuantity = currentQuantity - 1;

    this.htmlElement.querySelector("span").textContent = newQuantity.toString();

    this.#quantityDecreaseListeners.forEach((listener) =>
      listener(this.#menuItem.id)
    );
  }
}

class MenuTableController {
  #menuTable;
  #menuTableRows = [];

  constructor(menuTable) {
    if (menuTable === undefined)
      throw new TypeError(
        "Missing pararameter in the creation of a new menu table controller. You must give a menu table instance."
      );
    else if (!(menuTable instanceof MenuTable))
      throw new TypeError(
        "Invalid type for menu table, this field must be a MenuTable instance."
      );

    this.#menuTable = menuTable;
  }

  renderMenuTableItems(tbodyElement, menuItems = this.#menuTable.menuItems) {
    menuItems.forEach((menuItem) => {
      const menuTableRow = new MenuTableRow(menuItem);
      tbodyElement.appendChild(menuTableRow.htmlElement);

      this.#menuTableRows.push(menuTableRow);
    });
  }

  get menuTableRows() {
    return this.#menuTableRows;
  }
}

const menuItems = [
  new MenuItem(0, "Mix", 59.99),
  new MenuItem(1, "Lula a dorê", 59.99),
  new MenuItem(2, "Sashimi com temaki", 59.99),
  new MenuItem(3, "Filadélfia assado", 59.99),
  new MenuItem(4, "Jiron", 59.99),
  new MenuItem(5, "Barca de sashimi", 59.99),
  new MenuItem(6, "Mix de peças", 59.99),
  new MenuItem(7, "Sashimi temperado", 59.99),
  new MenuItem(8, "Temaki filadelfia", 59.99),
  new MenuItem(9, "Filadelfia", 59.99),
];
const menuTable = new MenuTable(menuItems);

const tbodyElement = document.querySelector("#menu-table");
const menuTableController = new MenuTableController(menuTable, tbodyElement);
menuTableController.renderMenuTableItems(tbodyElement);
const userCart = new UserCart(menuTableController);
const costCounterElement = document.querySelector("#cost-counter");
const orderValueCounter = new OrderValueCounter(userCart, costCounterElement);
