const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const jobModel = mongoose.model("Job", jobSchema);

module.exports = jobModel;
