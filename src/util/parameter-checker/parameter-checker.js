export class ParameterChecker {
  static checkIfUndefined(...parameters) {
    if (parameters.some((parameter) => parameter === undefined))
      throw new TypeError("Missing parameter.");
    return this;
  }
}
