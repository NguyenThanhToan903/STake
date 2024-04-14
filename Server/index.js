const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const sampleRoute = require("./routes/sample");
const http = require("http");

const app = express();
app.use(express.json());
app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["set-cookies"] })
);
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected");
});

dotenv.config();

const PORT = process.env.PORT || 6969;
const MONGO_URL = process.env.MONGODB_URL;

//connect database
mongoose
  .connect(MONGO_URL)
  .then(console.log("connect to Mongoose"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("connect to port " + PORT);
});

app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/create-sample", sampleRoute);
