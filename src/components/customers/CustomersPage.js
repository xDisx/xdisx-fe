import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomersPage.scss";
import CustomersTable from "./CustomersTable";
import { getCustomers } from "../../services/customerService";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");
  const [searchParams, setSearchParams] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomersDirect(searchParams, currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchCustomersDirect = (params, page) => {
    getCustomers(params, page)
      .then((response) => {
        if (response.data.customers) {
          setCustomers(response.data.customers);
          setTotalPages(response.data.totalPages);
          setTotalElements(response.data.totalElements);
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
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = () => {
    const page = 0;
    setCurrentPage(page);
    fetchCustomersDirect(searchParams, page);
  };

  const handleSearchClear = () => {
    const resetParams = { customerName: "", email: "", phoneNumber: "" };
    const page = 0;
    setSearchParams(resetParams);
    setCurrentPage(page);
    fetchCustomersDirect(resetParams, page); // Pass the reset parameters directly
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    if (!serviceUnavailableMessage) {
      navigate("/customers/create");
    }
  };

  return (
    <div className="customers-container">
      <h3>Search customers</h3>
      <div className="search-section">
        <input
          type="text"
          name="customerName"
          placeholder="Search Name"
          value={searchParams.customerName}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={searchParams.email}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={searchParams.phoneNumber}
          onChange={handleSearchChange}
        />
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
          Create Customer
        </div>
      </div>
      {!serviceUnavailableMessage ? (
        <>
          {" "}
          <h4>Results</h4>
          <h4>
            Displaying {customers.length} of {totalElements} Customers.
          </h4>
        </>
      ) : null}

      <CustomersTable
        customers={customers}
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

export default CustomersPage;
