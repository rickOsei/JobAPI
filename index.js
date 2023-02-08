require("dotenv").config();
require("express-async-errors");

// extra security package
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const connect = require("./db/connect");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const express = require("express");
const server = express();
// router
const jobsRouter = require("./routes/jobs_routes");
const authRouter = require("./routes/auth_routes");

// middleware
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);

server.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

server.get("/", (req, res) => {
  res.send("Jobs API");
});
// routes
server.use("/api/v1/auth/", authRouter);
server.use("/api/v1/jobs/", auth, jobsRouter);

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
