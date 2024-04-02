const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

var cookieParser = require("cookie-parser");
const appRouter = require("./routes/index");

const app = express();

const cors = require("cors");
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["set-cookies"] })
);

const PORT = process.env.PORT || 6969;
const URL = process.env.DATABASE_URL;

mongoose
  .connect(URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// app.get("/", function (req, res) {
//   // Cookies that have not been signed
//   console.log("Cookies: ", req.cookies);
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

appRouter(app);

app.listen(PORT, () => {
  console.log("backend running");
});
