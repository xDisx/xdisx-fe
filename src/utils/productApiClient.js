import axios from "axios";

const productApiClient = axios.create({
  baseURL: "http://localhost:1243/api/product/xdisx",
});

productApiClient.interceptors.request.use(
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

export default productApiClient;
