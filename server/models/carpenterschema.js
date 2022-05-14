const mongoose = require("mongoose");
const carpenterSchema = new mongoose.Schema({
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

const Carpenter = mongoose.model("carpenters", carpenterSchema);
module.exports = Carpenter;
