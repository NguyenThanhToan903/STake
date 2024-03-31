const { parentPort, workerData } = require("worker_threads");
const cloudinary = require("cloudinary").v2;

parentPort.on("message", async (id) => {
  try {
    const result = await cloudinary.uploader.destroy(id);
    if (result.result === "not found") {
      throw new Error("Delete image failed");
    }
    parentPort.postMessage({ message: "Delete image successfully" });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
});
