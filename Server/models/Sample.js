const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema(
  {
    image: {
      path: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
    name: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sample", SampleSchema);
