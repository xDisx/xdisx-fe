import contractApiClient from "../utils/contractApiClient";

export function createContract(customerId) {
  return contractApiClient.post("/contract", { customerId });
}

export const getContracts = (searchParams, page) => {
  const params = new URLSearchParams({
    ...searchParams,
    pageNumber: page,
  });
  return contractApiClient.get("/contracts", { params: params });
};
