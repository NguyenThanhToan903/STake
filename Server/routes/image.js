const router = require("express").Router();
const { Worker } = require("worker_threads");
const fileUploader = require("../config/cloudinary");

const cloudinary = require("cloudinary").v2;

router.post("/upload", async (req, res, next) => {
  const uploadWorker = new Worker("../threadWorker/uploadImageWorker.js", {
    workerData: req.file,
  });
  uploadWorker.on("message", (message) => {
    if (message.error) {
      res.status(500).json({ error: message.error });
    } else {
      res.json({ file: message.file });
    }
  });

  //   try {
  //     if (!req.file) {
  //       next(new Error("No file uploaded!"));
  //       return;
  //     }

  //     res.json({ file: req.file });
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
});

router.delete("/remove/:id", async (req, res) => {
  const deleteWorker = new Worker("../threadWorker/deleteImageWorker.js", {
    workerData: req.params.id,
  });
  deleteWorker.on("message", (message) => {
    if (message.error) {
      res.status(500).json({ error: message.error });
    } else {
      res.json({ message: message.message });
    }
  });

  //   try {
  //     const result = await cloudinary.uploader.destroy(req.params.id);

  //     if (result.result === "not found") {
  //       throw new Error("delete images failed");
  //     }
  //     return res.status(200).json({ message: "Delete image successfully" });
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
});

module.exports = router;
