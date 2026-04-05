require('dotenv').config()
const cors = require('cors');
const express = require("express");
const mongoose =require ("mongoose");
const app = express();
const {MongoClient, ObjectId} = require('mongodb');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
//use json files
app.use(express.json());

//allow parse
app.use(express.urlencoded({extended:true}))

//connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database is connected")
}).catch((error)=>
    console.log(error)
)
//routes
//Register
app.post("/register", async (req, res) => {
    try{

        const { Firstname, Lastname, Username, Password } = req.body;
        const users = db.collection('Users');
        let existingUser = await users.findOne({ Username:Username });

        if(existingUser) {
            //res.status(400).json({ message: "Username already exists" });
            return res.json({ message: "Username already exists"});
        }
        else{
            let newUser = await users.insertOne({Firstname, Lastname, Username, Password });
    
            return res.json({success: "User proile created", User: newUser, redirectUrl:'/'});

        }
    }
     catch(err){
        console.log(err);
    }
});

//Login
app.post('/login', async (req, res) => {
    try{

        const { Username, Password } = req.body;
    
        const users = db.collection('Users');
        const user = await users.findOne({ Username });
        if (!user || user.Password !== Password) {
            return res.status(400).json({ message: "Invalid credentials" })
            
        }
        res.json({ User: user, redirectUrl:'/home'});
    }
    catch(err){
        console.log(err);
    }
});

app.post('/offer', async (req, res)=>{
    try{
        const offers = db.collection('Rides');
        let result = await offers.insertOne(req.body);
        res.json(result);
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }

})
app.get('/request', async (req, res)=>{
    try{
        const rides = db.collection('Rides');
        let result = await rides.find({RideDate: req.query.RideDate}).toArray();
        res.json(result);
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: err.message });
    }

})

//driver route
app.post('/driver', async (req, res) => {
    try{

        const { Firstname, Lastname, UserID} = req.body;
    
        const drivers = db.collection('Drivers');
        let driverResult = await drivers.findOne({ UserID });
        if (driverResult){
                return res.status(400).json({ message: "Driver already exist", redirectUrl:'/driver'})
        }
        else{

            await drivers.insertOne( {Firstname, Lastname, UserID});
            res.json({success:" your driver profile was created", redirectUrl:'/home' })
        }
    }
    catch(err){
        console.log(err);
    }
});

//delet driver
app.delete('/driver', async (req, res) => {
    try{

        const { Firstname, Lastname, UserID} = req.body;
    
        const drivers = db.collection('Drivers');
        let driverResult = await drivers.findOne({ UserID });
        if (!driverResult){
                return res.status(400).json({ message: "You do not have a driver profile", redirectUrl:'/driver'})
        }
        else{

            await drivers.deleteOne( {UserID});
            res.json({success:" your driver profile was deleted", redirectUrl:'/home' })
        }
    }
    catch(err){
        console.log(err);
    }
});

//verify driver status
app.get('/driver/verification', async (req, res) => {
    try{    
        const drivers = db.collection('Drivers');
        let driverResult = await drivers.findOne({UserID: req.query.UserID});
        if (!driverResult){
                return res.status(400).json({ message: "You do not have a driver profile", redirectUrl:'/driver'})
        }
        else{
            res.json({success: true})
        }
    }
    catch(err){
        console.log(err);
    }
});
//set port
port = process.env.PORT
app.listen(port, ()=>{
    console.log("node server is running on "+ port)
});

//connect mongoDB locally
async function connectDB(uri) {
    uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    try{
        await client.connect();
        db = client.db('carpool');
    }
    catch (err){
        console.log(err);
        return null;
    }   
}
 //add car
 app.post('/vehicle', async (req, res) => {
    try{
    
        const drivers = db.collection('Vehicles');
        await drivers.insertOne(req.body);
        res.json({success:" was added"})
        }
    
    catch(err){
        console.log(err);
    }
});

//get user vehicle list
app.get('/vehicle/list', async (req, res) => {
    try{
    
        const drivers = db.collection('Vehicles');
        const vehicles = await drivers.find({UserID: req.query.UserID}).toArray();
        if(vehicles){
            return res.json({success:true, 'Vehicles':vehicles})
        }
        else{
            return res.json({message: "you need to add a vehicle to offer rides"})
        }
    }
    catch(err){
        console.log(err);
    }
});

//run mongoDB
connectDB();