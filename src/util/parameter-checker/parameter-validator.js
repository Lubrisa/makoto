export class ParameterValidator {
  static checkIfIsUndefined(parameter) {
    if (parameter === undefined)
      throw new TypeError(
        "Missing parameter. You must give a parameter to validate."
      );
    else if (parameter === null || typeof parameter !== "object")
      throw new TypeError(
        "Invalid parameter to validade. You must give a object with the parameter name and it's value."
      );

    const [name, value] = Object.entries(parameter);
    if (value === undefined) throw new TypeError(`Missing parameter: ${name}`);

    return ParameterValidator;
  }
}
