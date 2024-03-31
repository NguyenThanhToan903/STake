const { parentPort, workerData } = require("worker_threads");
const fileUploader = require("../config/cloudinary");

parentPort.on("message", async (file) => {
  try {
    const uploadedFile = await fileUploader.single(file.fieldname);
    parentPort.postMessage({ file: uploadedFile });
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
});
