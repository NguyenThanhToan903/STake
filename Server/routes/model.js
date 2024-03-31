const router = require("express").Router();
const Sample = require("../models/Sample");
const { Worker } = require("worker_threads");

const { verifyTokenUser } = require("../jwt/verifyTokenUser");

//post movie
router.post("/", async (req, res) => {
  // const newModel = new Sample(req.body);
  // try {
  //   const saveModel = await newModel.save();
  //   res.status(200).json(saveModel);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  const createWorker = new Worker("./threadWorker/createModelWorker.js", {
    workerData: req.body,
  });
  createWorker.on("message", (message) => {
    if (message.status === 200) {
      res.status(200).json(message.model);
    } else {
      res.status(500).json({ error: message.error });
    }
  });
});

//get all movie

// router.get("/", async (req, res) => {
//   const qPage = parseInt(req.query.qPage);
//   const firstIndex = (qPage - 1) * 30;
//   const lastIndex = qPage * 30;

//   let totalPage = 0;
//   let model = [];
//   let modelPage = [];
//   try {
//     model = await Movies.find().sort({ createdAt: -1 });

//     totalPage = Math.ceil(model.length / 30);
//     modelPage = model?.slice(firstIndex, lastIndex);
//     res.status(200).json({ model: modelPage, totalPage: totalPage });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/all", async (req, res) => {
//   try {
//     const movie = await Movies.find().sort({ createdAt: -1 });
//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// Get movie

// router.get("/find/:id", async (req, res) => {
//   try {
//     const model = await Model.findById(req.params.id);
//     res.status(200).json(model);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// delete movie;
// router.delete("/:id", verifyTokenUser, async (req, res) => {
//   try {
//     const movie = await Model.findByIdAndDelete(req.params.id);
//     try {
//       await movie.delete();
//       res.status(200).json("Movie has been delete...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//edit movie
// router.put("/:id", verifyTokenUser, async (req, res) => {
//   try {
//     const updateModel = await Model.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       {
//         new: true,
//       }
//     );

//     res.status(200).json(updateModel);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
