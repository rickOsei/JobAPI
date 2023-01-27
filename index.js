require("dotenv").config();
require("express-async-errors");
const connect = require("./db/connect");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const express = require("express");
const server = express();
// router
const jobsRouter = require("./routes/jobs_routes");
const authRouter = require("./routes/auth_routes");

// routes
server.use("/api/v1/auth/", authRouter);
server.use("/api/v1/jobs/", jobsRouter);

// middlewares
server.use(express.json());

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
