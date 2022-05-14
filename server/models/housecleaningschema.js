const mongoose = require("mongoose");
const houseCleaningSchema = new mongoose.Schema({
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

const HouseCleaning = mongoose.model("houseCleaning", houseCleaningSchema);
module.exports = HouseCleaning;
