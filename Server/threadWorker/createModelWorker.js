const { parentPort, workerData } = require("worker_threads");

const Sample = require("../models/Sample");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to create MongoDB");
  create(workerData);
});

mongoose.connection.on("error", (err) => {
  console.error("Connection error:", err);
});

const deepClone = (obj) => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
};

const create = async (data) => {
  try {
    const samples = await Sample.find();

    parentPort.postMessage({ status: 200, model: samples });
  } catch (error) {
    parentPort.postMessage({ status: 500, error: error.message });
  }
};

create(workerData);
