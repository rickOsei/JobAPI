const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = (URI) => {
  return mongoose.connect(URI, { useNewUrlParser: true }, () =>
    console.log("Connected to db")
  );
};

module.exports = connectDB;
