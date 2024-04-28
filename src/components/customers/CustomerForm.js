import React, { useState } from "react";
import { createCustomer } from "../../services/customerService";

function CustomerForm() {
  const [customerType, setCustomerType] = useState("PRIVATE");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customer = await createCustomer(customerType);
    console.log(customer);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <label htmlFor="contractType" className="form-label">
          Customer Type:
        </label>
        <input
          type="text"
          className="form-control"
          id="customerType"
          value={customerType}
          onChange={(e) => setCustomerType(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Customer
      </button>
    </form>
  );
}

export default CustomerForm;
