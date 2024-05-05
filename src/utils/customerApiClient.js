import axios from "axios";

const customerApiClient = axios.create({
  baseURL: "http://localhost:1243/api/customer/xdisx",
});

export default customerApiClient;
