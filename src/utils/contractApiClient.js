import axios from "axios";

const contractApiClient = axios.create({
  baseURL: "http://localhost:1243/api/contract/xdisx",
});

contractApiClient.interceptors.request.use(
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

export default contractApiClient;
