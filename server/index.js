const express = require("express");
require("dotenv").config();
const router = require("./routes/index")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const { default: mongoose } = require("mongoose");

const app = express();

// express middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Parse cookie headers

// define app routes
app.use("/api/v1", router); // Route requests to /api/v1 to the router module

app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace

    // Handle specific types of errors
    if (err.name === "ValidationError") {
        return res.status(400).json({ error: err.message });
    } else if (err.name === "CastError") {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // Handle other types of errors
    if (err.statusCode) {
        // If the error has a custom status code set, use it
        return res.status(err.statusCode).json({ error: err.message });
    }

    // Default error response for unhandled errors
    res.status(500).json({ error: "Something went wrong!" });
});


const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

connectToDB().then(() => {
    console.log("connected")
});


// server setup and db connection build
const PORT = process.env.PORT;
(async () => {
    try {
        // await connectDB(process.env.MONGO_URI); // Connect to the MongoDB database
        // console.log("CONNECTED TO DB SUCCESSFULLY..!");

        app.listen(PORT, () => {
            console.log(`server is running and listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();