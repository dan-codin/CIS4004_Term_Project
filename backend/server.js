import mongoose from "mongoose";

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use("/api", authRoutes);
app.use("/api/rides", rideRoutes)
app.use("/api/reservations", reservationRoutes);

//connect DB
mongoose.connect("mongodb://127.0.0.1:27017/carro", {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));