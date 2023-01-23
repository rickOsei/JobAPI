const express = require("express");
const connect = require("./db/connect");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const server = express();
require("dotenv").config();
require("express-async-errors");

server.use(express.json());

// routes

// error handler middleware
server.use(notFound);
server.use(errorHandler);

const port = process.env.PORT || 3000;

// listen to request
const start = () => {
  try {
    // connection to db
    connect(process.env.URI);
    server.listen(port, () =>
      console.log(`Server is listening on port: ${port}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
