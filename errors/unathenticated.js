const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
