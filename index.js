import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import pinRoute from "./routes/pins.js";
import userRoute from "./routes/users.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Travel Pin.");
});

const PORT = process.env.PORT || 8800;
// const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGODB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log("Server started at port 8800");
});
