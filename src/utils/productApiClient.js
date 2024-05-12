import axios from "axios";

const productApiClient = axios.create({
  baseURL: "http://localhost:1243/api/product/xdisx",
});

export default productApiClient;
