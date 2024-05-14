import contractApiClient from "../utils/contractApiClient";

export function createContract(
  customerId,
  productId,
  period,
  price,
  deviceCode,
  deviceType,
  acquisitionDate
) {
  return contractApiClient.post("/contract", {
    customerId,
    productId,
    period,
    price,
    deviceCode,
    deviceType,
    acquisitionDate,
  });
}

export const getContracts = (searchParams, page) => {
  const params = new URLSearchParams({
    ...searchParams,
    pageNumber: page,
  });
  return contractApiClient.get("/contracts", { params: params });
};

export const getContract = (id) => {
  return contractApiClient.get(`/contracts/${id}`);
};

export const updateContractStatus = (contractId, newStatus) => {
  return contractApiClient.put(`/contracts/${contractId}`, { newStatus });
};
