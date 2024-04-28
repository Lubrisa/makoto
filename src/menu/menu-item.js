export class MenuItem {
  #id;
  #name;
  #price;

  constructor(id, name, price) {
    if (id === undefined || name === undefined || price === undefined)
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
    else if (id < 0 || name === "" || price <= 0)
      throw new TypeError(
        "Invalid menu item. The id must be greater than 0, the name must not be empty and the price must be greater than 0."
      );

    this.#id = id;
    this.#name = name;
    this.#price = price;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }
}
