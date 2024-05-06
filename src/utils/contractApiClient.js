import axios from "axios";

const contractApiClient = axios.create({
  baseURL: "http://localhost:1243/api/contract/xdisx",
});

export default contractApiClient;
