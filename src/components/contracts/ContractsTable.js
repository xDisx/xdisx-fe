import React from "react";
import "./ContractsTable.scss";
import ServiceUnavailable from "../common/reusable/ServiceUnavailable";

const ContractsTable = ({ contracts, serviceUnavailableMessage }) => {
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
          {contracts.map((contract) => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.contractType}</td>
              <td>{contract.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsTable;
