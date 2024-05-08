import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomersPage.scss";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "../../services/customerService";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getCustomers()
      .then((response) => {
        if (response.data.customers) {
          setCustomers(response.data.customers);
          setServiceUnavailableMessage("");
        } else if (response.data.message) {
          setServiceUnavailableMessage(response.data.message);
          setCustomers([]);
        }
      })
      .catch((error) => {
        setServiceUnavailableMessage(
          "Failed to fetch customers due to a network error."
        );
        console.error("Error fetching customers:", error);
      });
  }, []);

  const handleCreateClick = () => {
    if (!serviceUnavailableMessage) {
      navigate("/customers/create");
    }
  };

  return (
    <div className="customers-container">
      <div className="create-button-row">
        <div
          className={
            serviceUnavailableMessage
              ? "create-button disabled"
              : "create-button"
          }
          onClick={handleCreateClick}
        >
          Create Customer
        </div>
      </div>
      <CustomersTable
        customers={customers}
        serviceUnavailableMessage={serviceUnavailableMessage}
      />
    </div>
  );
};

export default CustomersPage;
