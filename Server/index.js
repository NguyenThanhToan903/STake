const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee.js");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee");
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) return res.json("The password incorrect");
        if (response) {
          res.json("Success");
        }
      });
    } else {
      res.json("No record existed");
    }
  });
});
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      EmployeeModel.create({ name, email, password: hash })
        .then((employee) => res.json(employee))
        .catch((err) => rs.json(err));
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.listen(3001, () => {
  console.log("Server is running");
});
