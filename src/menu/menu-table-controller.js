import { MenuItem } from "./menu-item.js";
import { MenuTable } from "./menu-table.js";
import { MenuTableRow } from "./menu-table-row.js";

export class MenuTableController {
  #menuTable;
  #menuTableRows = [];
  #onMenuTableUpdateListeners = [];

  constructor(menuTable, menuItemsCount = new Map()) {
    if (menuTable === undefined)
      throw new TypeError(
        "Missing pararameter in the creation of a new MenuTableController. You must give a MenuTable instance."
      );
    else if (!(menuTable instanceof MenuTable))
      throw new TypeError(
        "Invalid type for menu table, this field must be a MenuTable instance."
      );
    else if (!(menuItemsCount instanceof Map))
      throw new TypeError(
        "Invalid type for menu items count, this field must be a Map instance."
      );

    this.#menuTable = menuTable;
    this.#generateTableRows(menuItemsCount);
  }

  #generateTableRows(
    menuItemsCount = new Map(),
    menuItems = this.#menuTable.menuItems
  ) {
    if (!(menuItemsCount instanceof Map))
      throw new TypeError(
        "Invalid type for menu items count, this field must be a Map instance."
      );
    else if (menuItems.some((item) => !(item instanceof MenuItem)))
      throw new TypeError(
        "Invalid type for menu items, all items must be instances of MenuItem."
      );

    menuItems.forEach((menuItem) => {
      const menuItemQuantity = menuItemsCount.has(menuItem)
        ? menuItemsCount.get(menuItem)
        : 0;

      const menuTableRow = new MenuTableRow(menuItem, menuItemQuantity);
      menuTableRow.addQuantityIncreaseListener((menuItem) => {
        this.#onTableUpdate(menuItem, 1);
      });
      menuTableRow.addQuantityDecreaseListener((menuItem) => {
        this.#onTableUpdate(menuItem, -1);
      });
      this.#menuTableRows.push(menuTableRow);
    });
  }

  renderMenuTableItems(tbodyElement) {
    if (tbodyElement === undefined)
      throw new TypeError(
        "Missing parameter in the rendering of the MenuTableItems. You must give a tbody element."
      );
    else if (!(tbodyElement instanceof HTMLElement))
      throw new TypeError(
        "Invalid type for tbody element, this field must be an HTMLElement instance."
      );

    this.#menuTableRows.forEach((menuTableRow) => {
      tbodyElement.appendChild(menuTableRow.htmlElement);
    });
  }

  addMenuTableUpdateListener(callback) {
    if (callback === undefined)
      throw new TypeError(
        "Missing parameter in the addMenuTableUpdateListener method. You must give a callback function."
      );
    else if (typeof callback !== "function")
      throw new TypeError(
        "Invalid type for the callback parameter in the addMenuTableUpdateListener method. You must give a callback function."
      );

    this.#onMenuTableUpdateListeners.push(callback);
  }

  #onTableUpdate(menuItem, quantityDifference) {
    this.#onMenuTableUpdateListeners.forEach((listener) =>
      listener(menuItem, quantityDifference)
    );
  }

  get menuTableRows() {
    return this.#menuTableRows;
  }
}
