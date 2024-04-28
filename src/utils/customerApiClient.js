import axios from "axios";

const customerApiClient = axios.create({
  baseURL: "http://localhost:1239/xdisx",
});

export default customerApiClient;
