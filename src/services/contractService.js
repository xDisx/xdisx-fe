import contractApiClient from "../utils/contractApiClient";

export function createContract(contractType, customerId) {
  return contractApiClient.post("/contract", { contractType, customerId });
}

export const getContracts = (searchParams, page) => {
  const params = new URLSearchParams({
    ...searchParams,
    pageNumber: page,
  });
  return contractApiClient.get("/contracts", { params: params });
};
