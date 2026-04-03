const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
    pickup: String,
    dropoff: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Ride", RideSchema);