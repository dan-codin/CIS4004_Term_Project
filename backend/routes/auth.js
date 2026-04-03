const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Register
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if(existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    res.json(newUser);
});

//Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    res.json(user);
});

module.exports = router;