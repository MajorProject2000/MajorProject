const mongoose = require("mongoose");
const plumberSchema = new mongoose.Schema({
  service_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time_required: {
    type: String,
    required: true,
  },
});

const Plumber = mongoose.model("plumbers", plumberSchema);
module.exports = Plumber;
