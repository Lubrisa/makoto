import { MenuTable } from "./menu-table.js";
import { MenuTableRow } from "./menu-table-row.js";

export class MenuTableController {
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

  get getMenuTableRows() {
    return this.#menuTableRows;
  }
}
