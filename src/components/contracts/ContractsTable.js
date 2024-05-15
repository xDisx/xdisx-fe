import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContractsTable.scss";
import ServiceUnavailable from "../common/reusable/ServiceUnavailable";

const ContractsTable = ({ contracts, serviceUnavailableMessage }) => {
  const navigate = useNavigate();

  if (!contracts && !serviceUnavailableMessage) {
    return <div className="table-container">Loading contracts</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Device code</th>
            <th>Customer name</th>
            <th>Created On</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contracts &&
            contracts.map((contract) => (
              <tr
                key={contract.id}
                onClick={() => navigate(`/contracts/${contract.id}`)}
              >
                <td>{contract.id}</td>
                <td>{contract.productName}</td>
                <td>{contract.deviceCode}</td>
                <td>{contract.customerName}</td>
                <td>{contract.created}</td>
                <td>{contract.contractStatus}</td>
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

export default ContractsTable;
