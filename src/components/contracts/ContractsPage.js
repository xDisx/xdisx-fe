import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ContractsPage.scss";
import ContractsTable from "./ContractsTable";
import { getContracts } from "../../services/contractService";

const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");
  const [searchParams, setSearchParams] = useState({
    customerName: "",
    deviceCode: "",
    contractStatus: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchContractsDirect(searchParams, currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchContractsDirect = (params, page) => {
    getContracts(params, page)
      .then((response) => {
        if (response.data.contracts) {
          setContracts(response.data.contracts);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
          setServiceUnavailableMessage("");
        } else if (response.data.serviceDown) {
          setServiceUnavailableMessage(response.data.serviceDown);
          setContracts([]);
          setTotalPages(0);
          setTotalElements(0);
        }
      })
      .catch((error) => {
        setServiceUnavailableMessage(
          "Failed to fetch contracts due to a network error."
        );
        console.error("Error fetching contracts:", error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = () => {
    const page = 0;
    setCurrentPage(page);
    fetchContractsDirect(searchParams, page);
  };

  const handleSearchClear = () => {
    const resetParams = {
      customerName: "",
      deviceCode: "",
      contractStatus: "",
    };
    const page = 0;
    setSearchParams(resetParams);
    setCurrentPage(page);
    fetchContractsDirect(resetParams, page); // Pass the reset parameters directly
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    if (!serviceUnavailableMessage) {
      navigate("/contracts/create");
    }
  };

  return (
    <div className="contracts-container">
      <h3>Search contracts</h3>
      <div className="search-section">
        <input
          type="text"
          name="customerName"
          placeholder="Search Customer Name"
          value={searchParams.customerName}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="deviceCode"
          placeholder="Device Code"
          value={searchParams.deviceCode}
          onChange={handleSearchChange}
        />
        <div className="select-container">
          <select
            name="contractStatus"
            value={searchParams.contractStatus}
            onChange={handleSearchChange}
          >
            <option value="" disabled>
              Contract Status
            </option>
            <option value="CREATED">CREATED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="REJECTED">REJECTED</option>
            <option value="TERMINATED">TERMINATED</option>
          </select>
        </div>
        <div className="action-buttons">
          <button onClick={handleSearchSubmit} className="search-button">
            🔍
          </button>
          <button onClick={handleSearchClear} className="clear-button">
            ✖
          </button>
        </div>
      </div>
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
      {!serviceUnavailableMessage ? (
        <>
          {" "}
          <h4>Results</h4>
          <h4>
            Displaying {contracts.length} of {totalElements} Contracts.
          </h4>
        </>
      ) : null}
      <ContractsTable
        contracts={contracts}
        serviceUnavailableMessage={serviceUnavailableMessage}
      />
      <div className="pagination">
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContractsPage;
