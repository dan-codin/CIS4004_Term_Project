const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    make: String,
    model: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Vehicle", VehicleSchema);