const express = require("express");
require("dotenv").config();
const router = require("./routes/index")
const cors = require("cors")
const app = express();

// express middlewares
app.use(express.json());
app.use(cors());

// define app routes
app.use("/api/v1", router); // Route requests to /api/v1 to the router module

// server setup and db connection build
const PORT = process.env.PORT;
(async () => {
    try {
        await connectDB(process.env.MONGO_URI); // Connect to the MongoDB database
        console.log("CONNECTED TO DB SUCCESSFULLY..!");

        app.listen(PORT, () => {
            console.log(`server is running and listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
})();