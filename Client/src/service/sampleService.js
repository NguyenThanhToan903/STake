import axiosInstance from "../config";
import objectToFormData from "../helper/toFormData";

export const samplePostData = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  await axiosInstance.post(
    "/create-sample",
    objectToFormData(formData),
    config
  );
};

export const sampleGetData = async () => {
  return (await axiosInstance.get("/create-sample")).data;
};
