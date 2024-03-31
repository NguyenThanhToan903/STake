const mogoose = require("mongoose");

const EmployeeSchema = new mogoose.Schema({
  name: String,
  email: String,
  password: String,
});

const EmployeeModel = mogoose.model("employees", EmployeeSchema);

module.exports = EmployeeModel;
