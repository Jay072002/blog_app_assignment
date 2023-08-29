const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

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