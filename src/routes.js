import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContractsPage from "./components/contracts/ContractsPage";
import CustomersPage from "./components/customers/CustomersPage";
import Navigation from "./components/common/Navigation";

function AppRoutes() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
