import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContractsPage from "./components/contracts/ContractsPage";
import CustomersPage from "./components/customers/CustomersPage";
import Navigation from "./components/common/Navigation";
import CreateContractPage from "./components/contracts/CreateContractPage";
import CreateCustomerPage from "./components/customers/CreateCustomerPage";
import CustomerDetailsPage from "./components/customers/CustomerDetailsPage";

function AppRoutes() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetailsPage />} />
        <Route path="/contracts/create" element={<CreateContractPage />} />
        <Route path="/customers/create" element={<CreateCustomerPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
