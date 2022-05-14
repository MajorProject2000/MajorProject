const mongoose = require("mongoose");
const electricianSchema = new mongoose.Schema({
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

const Electrician = mongoose.model("electricians", electricianSchema);
module.exports = Electrician;
