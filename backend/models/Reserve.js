
const mongoose = require ("mongoose");

const ReserveSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            require: true
        },
        date:{
            type: Date,
            require: true
        },
        lat:{
            type: Number,
            require: true
        },
        long:{
            type: Number,
            require: true
        },
        

    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model("Ride",ReserveSchema)