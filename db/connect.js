const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectDB = (URI) => {
  return mongoose.connect(
    URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
      if (err) console.log(err);
      else console.log("mongdb is connected");
    }
  );
};

module.exports = connectDB;
