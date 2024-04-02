const express = require("express");
const router = express.Router();
const multer = require("multer");

const SampleController = require("../controller/sampleController");

//upload thumbnail
const upload = multer();
//Middlewares upload
const uploadCloudMiddleware = require("../middleware/uploadCloudMiddlewares");

router.get("/", SampleController.index);

router.post(
  "/",
  // upload.single("thumbnail"),
  // upload.fields([{ name: "thumbnail", maxCount: 8 }]),
  // uploadCloudMiddleware.uploadFields,
  SampleController.postSample
);

module.exports = router;
