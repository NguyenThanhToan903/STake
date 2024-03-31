const router = require("express").Router();
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Employee.findOne({ email: email }).then((user) => {
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
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Employee.create({ name, email, password: hash })
        .then((employee) => res.json(employee))
        .catch((err) => rs.json(err));
    })
    .catch((err) => {
      console.log(err.message);
    });
});
module.exports = router;
