import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  baseURL: BASE_URL,
});

axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
