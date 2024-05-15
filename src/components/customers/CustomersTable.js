import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceUnavailable from "../common/reusable/ServiceUnavailable";

const CustomersTable = ({ customers, serviceUnavailableMessage }) => {
  const navigate = useNavigate();

  if (!customers && !serviceUnavailableMessage) {
    return <div className="table-container">Loading customers</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                <td>{customer.id}</td>
                <td>
                  {customer.firstName} {customer.lastName}
                </td>
                <td>{customer.email}</td>
                <td>{customer.created} UTC</td>
              </tr>
            ))}
        </tbody>
      </table>
      {serviceUnavailableMessage && (
        <ServiceUnavailable message={serviceUnavailableMessage} />
      )}
    </div>
  );
};

export default CustomersTable;
