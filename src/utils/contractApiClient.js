import axios from "axios";

const contractApiClient = axios.create({
  baseURL: "http://localhost:1242/xdisx",
});

export default contractApiClient;
