import { MenuItem } from "./menu-item.js";

export class MenuTable {
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
