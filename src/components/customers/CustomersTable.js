import React from "react";
import ServiceUnavailable from "../common/reusable/ServiceUnavailable";

const CustomersTable = ({ customers, serviceUnavailableMessage }) => {
  if (serviceUnavailableMessage) {
    return <ServiceUnavailable message={serviceUnavailableMessage} />;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.customerType}</td>
              <td>{customer.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersTable;
