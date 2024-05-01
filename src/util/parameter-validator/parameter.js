export class Parameter {
  #name;
  #value;

  constructor(parameter) {
    if (parameter === undefined)
      throw new TypeError(
        "Error in the creation of a new Parameter. You must give a object with the parameter name and it's value"
      );
    else if (
      parameter === null ||
      typeof parameter !== "object" ||
      Object.keys(parameter).length !== 1
    )
      throw new TypeError(
        "Error in the creation of a new Parameter. The parameter must be a object with the parameter name and it's value"
      );

    const [name, value] = Object.entries(parameter);
    this.#name = name;
    this.#value = value;
  }

  get name() {
    return this.#name;
  }

  get value() {
    return this.#value;
  }

  get nameValuePair() {
    return [this.name, this.value];
  }
}
