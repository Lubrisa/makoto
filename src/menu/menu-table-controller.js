import { MenuItem } from "./menu-item.js";
import { MenuTable } from "./menu-table.js";
import { MenuTableRow } from "./menu-table-row.js";

export class MenuTableController {
  #menuTable;
  #menuTableRows = [];

  constructor(menuTable) {
    if (menuTable === undefined)
      throw new TypeError(
        "Missing pararameter in the creation of a new MenuTableController. You must give a MenuTable instance."
      );
    else if (!(menuTable instanceof MenuTable))
      throw new TypeError(
        "Invalid type for menu table, this field must be a MenuTable instance."
      );

    this.#menuTable = menuTable;
  }

  renderMenuTableItems(
    tbodyElement,
    menuItemsCount = new Map(),
    menuItems = this.#menuTable.menuItems
  ) {
    if (tbodyElement === undefined)
      throw new TypeError(
        "Missing parameter in the rendering of the MenuTableItems. You must give a tbody element."
      );
    else if (!(tbodyElement instanceof HTMLElement))
      throw new TypeError(
        "Invalid type for tbody element, this field must be an HTMLElement instance."
      );
    else if (!(menuItemsCount instanceof Map))
      throw new TypeError(
        "Invalid type for menu items count, this field must be a Map instance."
      );
    else if (menuItems.some((item) => !(item instanceof MenuItem)))
      throw new TypeError(
        "Invalid type for menu items, all items must be instances of MenuItem."
      );

    menuItems.forEach((menuItem) => {
      let menuItemQuantity = 0;
      if (menuItemsCount.has(menuItem.id))
        menuItemQuantity = menuItemsCount.get(menuItem.id);

      const menuTableRow = new MenuTableRow(menuItem, menuItemQuantity);
      tbodyElement.appendChild(menuTableRow.htmlElement);

      this.#menuTableRows.push(menuTableRow);
    });
  }

  get menuTableRows() {
    return this.#menuTableRows;
  }
}
