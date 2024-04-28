export class MenuItem {
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
