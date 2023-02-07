const CustomError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  const customAPIError = {
    message: err.message || "Something went wrong try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  // if (err instanceof CustomError) {
  //   res.status(err.statusCode).json(err.message);
  // }
  if (err.name === "ValidationError") {
    customAPIError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customAPIError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customAPIError.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customAPIError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customAPIError.message = `No item found with id : ${err.value}`;
    customAPIError.statusCode = 404;
  }
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  res
    .status(customAPIError.statusCode)
    .json({ message: customAPIError.message });
};

module.exports = errorHandler;
