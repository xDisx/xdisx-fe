import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ContractsPage.scss";
import ContractsTable from "./ContractsTable";
import { getContracts } from "../../services/contractService";

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getContracts()
      .then((response) => {
        if (response.data.contracts) {
          setContracts(response.data.contracts);
          setServiceUnavailableMessage("");
        } else if (response.data.message) {
          setServiceUnavailableMessage(response.data.message);
          setContracts([]); // Clear any previously loaded contracts
        }
      })
      .catch((error) => {
        setServiceUnavailableMessage(
          "Failed to fetch contracts due to a network error."
        );
        console.error("Error fetching contracts:", error);
      });
  }, []);

  const handleCreateClick = () => {
    if (!serviceUnavailableMessage) {
      navigate("/contracts/create");
    }
  };

  return (
    <div className="contracts-container">
      <div className="create-button-row">
        <div
          className={
            serviceUnavailableMessage
              ? "create-button disabled"
              : "create-button"
          }
          onClick={handleCreateClick}
        >
          Create Contract
        </div>
      </div>
      <ContractsTable
        contracts={contracts}
        serviceUnavailableMessage={serviceUnavailableMessage}
      />
    </div>
  );
};

export default ContractsPage;
