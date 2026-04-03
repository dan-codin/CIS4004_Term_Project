const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");

// Create ride
router.post("/", async (req, res) => {
    const ride = new Ride(req.body);
    await ride.save();
    res.json(ride);
});

//Get all rides
router.get("/", async (req, res) => {
    const rides = await Ride.find().populate("createdBy");
    res.json(rides);
});

// Update ride
router.put("/:id", async (req, res) => {
    const updated = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(update);
});

// Delete ride
router.delete("/:id", async (req, res) => {
    await Ride.findByIdAndDelete(req.params.id);
    res.json({ message: "Ride deleted" });
});

module.exports = router;