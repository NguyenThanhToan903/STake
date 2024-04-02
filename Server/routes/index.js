const auth = require("./auth");
const sample = require("./sample");

module.exports = (app) => {
  app.use("/api/auth", auth);
  app.use("/api/create-sample", sample);
};
