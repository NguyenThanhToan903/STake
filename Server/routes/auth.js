const router = require("express").Router();
const { json } = require("body-parser");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Employee.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) return res.json("The password incorrect");
        if (response) {
          const { password, ...others } = user._doc;

          res.json(others);
        }
      });
    } else {
      res.json("No record existed");
    }
  });
});

// router.get("/user", async (req, res) => {
//   // const { email, password } = req.body;
//   console.log(req.body);
//   // Employee.findOne({ email: email }).then((user) => {
//   //   if (user) {
//   //     bcrypt.compare(password, user.password, (err, response) => {
//   //       if (err) return res.json("The password incorrect");
//   //       if (response) {
//   //         const { password, ...others } = user._doc;

//   //         res.json(others);
//   //       }
//   //     });
//   //   } else {
//   //     res.json("No record existed");
//   //   }
//   // });
// });

router.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Employee.create({ name, email, password: hash })
        .then((employee) => {
          const { password, ...others } = employee._doc;
          res.json(others);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => {
      console.log(err.message);
    });
});
module.exports = router;

router.get("/user", (req, res) => {
  res.json(Employee.findOne({ mail: "toan" }));
});
