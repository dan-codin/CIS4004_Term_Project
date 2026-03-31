require('dotenv').config()
const express = require("express");
const mongoose =require ("mongoose");
const app = express();
const reserveRoute = require('./routes/reserve')


//use json files
app.use(express.json());

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database is connected")
}).catch((error)=>
    console.log(error)
)
//routes
app.use("/reserve", reserveRoute);
//set port
port = process.env.PORT
app.listen(port, ()=>{
    console.log("node server is running on "+ port)
});