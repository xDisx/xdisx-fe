import axios from "axios";

const customerApiClient = axios.create({
  baseURL: "http://localhost:1243/api/customer/xdisx",
});

customerApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customerApiClient;
