import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  withCredentials: true,
  credentials: "include",
  baseURL: BASE_URL,
});

axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
