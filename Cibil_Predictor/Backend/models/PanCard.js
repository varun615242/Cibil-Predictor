const mongoose = require("mongoose");

const PanCardSchema = new mongoose.Schema({
  pancard: { type: String, required: true, unique: true },
  owner: { type: String, required: true } // Example: Name associated with PAN card
});

module.exports = mongoose.model("PanCard", PanCardSchema);
