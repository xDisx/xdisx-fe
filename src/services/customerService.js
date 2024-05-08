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

export const getCustomers = () => {
  return customerApiClient.get("/customers");
};
