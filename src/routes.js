import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContractsPage from "./components/contracts/ContractsPage";
import CustomersPage from "./components/customers/CustomersPage";
import Navigation from "./components/common/Navigation";
import CreateContractPage from "./components/contracts/CreateContractPage";
import CreateCustomerPage from "./components/customers/CreateCustomerPage";
import CustomerDetailsPage from "./components/customers/CustomerDetailsPage";
import ProductsPage from "./components/products/ProductsPage";
import CreateProductsPage from "./components/products/CreateProductsPage";

function AppRoutes() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/customers/:id" element={<CustomerDetailsPage />} />
        <Route path="/contracts/create" element={<CreateContractPage />} />
        <Route path="/customers/create" element={<CreateCustomerPage />} />
        <Route path="/products/create" element={<CreateProductsPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
