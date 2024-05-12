import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "../../services/customerService"; // Assume you have this service
import { getContracts } from "../../services/contractService";
import ContractsTable from "../contracts/ContractsTable";
import "./CustomerDetailsPage.scss";

const CustomerDetailsPage = () => {
  const [customer, setCustomer] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [totalElements, setTotalElements] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getCustomer(id)
      .then((response) => {
        setCustomer(response.data);
        fetchContracts(id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const fetchContracts = (customerId) => {
    const searchParams = {
      customerId: customerId,
      pageSize: 140,
    };
    getContracts(searchParams, 0)
      .then((response) => {
        setContracts(response.data.contracts);
        setTotalElements(response.data.totalElements);
      })
      .catch((error) => {
        console.error("Failed to fetch contracts:", error);
      });
  };

  if (!customer) {
    return <div className="customer-details-container">Loading customer</div>;
  }

  return (
    <div className="customer-details-container">
      <h2>Customer Details</h2>
      {customer ? (
        <div className="customer-info">
          <p>
            <strong>Number:</strong> {customer.id}
          </p>
          <p>
            <strong>First Name:</strong> {customer.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {customer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {customer.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {customer.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {customer.address}
          </p>
          <p>
            <strong>Created:</strong> {customer.created} UTC
          </p>
        </div>
      ) : (
        <p>No customer details available.</p>
      )}
      <h3>Contracts</h3>
      <h4>{totalElements} contracts</h4>
      <ContractsTable contracts={contracts} />
    </div>
  );
};

export default CustomerDetailsPage;
