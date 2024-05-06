import contractApiClient from "../utils/contractApiClient";

export function createContract(contractType, customerId) {
  return contractApiClient.post("/contract", { contractType, customerId });
}

export const getContracts = () => {
  return contractApiClient.get("/contracts");
};
