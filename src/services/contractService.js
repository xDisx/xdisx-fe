import contractApiClient from "../utils/contractApiClient";

export function createContract(contractType) {
  return contractApiClient.post("/contract", { contractType });
}
