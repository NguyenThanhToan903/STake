const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const sampleRoute = require("./routes/sample");

const app = express();
app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["set-cookies"] })
);

<<<<<<< HEAD
dotenv.config();
=======
const PORT = process.env.PORT || 6969; //port
const URL = process.env.DATABASE_URL;
>>>>>>> f6e0db2d016f61c54b7c3af3734ddb39f401b61b

const PORT = process.env.PORT || 6969;
const MONGO_URL = process.env.MONGO_URL;

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
