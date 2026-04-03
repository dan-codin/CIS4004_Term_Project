const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ride: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" }
});

module.exports = mongoose.model("Reservation", ReservationSchema);