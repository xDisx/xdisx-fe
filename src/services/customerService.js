import customerApiClient from "../utils/customerApiClient";

export function createCustomer(customerType) {
  return customerApiClient.post("/customer", { customerType });
}
