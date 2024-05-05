import React from "react";
import "./CustomersPage.scss";
import CustomersTable from "./CustomersTable";

const CustomersPage = () => {
  return (
    <div className="customers-container">
      <div className="create-button-row">
        <div className="create-button">Create Customer</div>
      </div>
      <CustomersTable />
    </div>
  );
};

export default CustomersPage;
