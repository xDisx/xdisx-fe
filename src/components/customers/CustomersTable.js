import React, { useState } from "react";

const CustomersTable = () => {
  const [customers] = useState([
    { id: 1, customerType: "Full-Time", created: "2022-01-01" },
    { id: 2, customerType: "Part-Time", created: "2022-02-15" },
    { id: 3, customerType: "Consultant", created: "2022-03-20" },
  ]);

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
