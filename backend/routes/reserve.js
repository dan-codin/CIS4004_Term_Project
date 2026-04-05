//create route to reserve a ride
const router = require("express").Router()
const Ride = require("../models/Reserve");

//create new request

router.post("/", async (req, res)=>{
    const request = new Ride(req.body);
    try{
        const savedRequest = await request.save();
        res.status(200).json(savedRequest);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;