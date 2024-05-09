import customerApiClient from "../utils/customerApiClient";

export function createCustomer(
  firstName,
  lastName,
  email,
  phoneNumber,
  address
) {
  return customerApiClient.post("/customer", {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
  });
}

export const getCustomers = (searchParams, page) => {
  const params = new URLSearchParams({
    ...searchParams,
    pageNumber: page,
  });

  return customerApiClient.get("/customers", { params: params });
};
