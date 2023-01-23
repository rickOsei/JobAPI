const CustomError = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.message);
  }
  res.status(500).json("Internal server error");
};

module.exports = errorHandler;
