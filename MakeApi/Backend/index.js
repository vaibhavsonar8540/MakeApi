const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();              // ✅ Initialize app before usage

app.use(cookieParser());           // ✅ Now safe to use app
app.use(cors(
    {
        origin: "http://localhost:5173", 
        credentials: true, 
    }
));
app.use(express.json());

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT ;
    app.listen(port, () =>
      console.log(`Server running >>>>>`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
