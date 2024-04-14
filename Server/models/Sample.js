const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    size: String,

    color: String,
    email: {
      default: "x123@gmail.com",
      type: String,
    },
    thumbnail: {
      type: Array,
      default: [],
    },
    category: String,
    occupation: String,
    occupationIs: {
      type: String,
      default: undefined,
    },
    author: String,
    description: String,
    status: {
      default: "active",
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Sample = mongoose.model("Sample", sampleSchema, "sample");

module.exports = Sample;
