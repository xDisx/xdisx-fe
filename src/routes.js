import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContractsPage from "./components/contracts/ContractsPage";
import CustomersPage from "./components/customers/CustomersPage";
import Navigation from "./components/common/Navigation";
import CreateContractPage from "./components/contracts/CreateContractPage";
import CreateCustomerPage from "./components/customers/CreateCustomerPage";
import CustomerDetailsPage from "./components/customers/CustomerDetailsPage";
import ProductsPage from "./components/products/ProductsPage";
import CreateProductsPage from "./components/products/CreateProductsPage";
import ProductDetailsPage from "./components/products/ProductDetailsPage";
import ContractDetailsPage from "./components/contracts/ContractDetailsPage";
import LoginPage from "./components/login/LoginPage";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? <Element {...rest} /> : <Navigate to="/login" />;
};

const AuthRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token");
  return !token ? <Element {...rest} /> : <Navigate to="/" />;
};

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);
  const username = localStorage.getItem("username");

  return (
    <Router>
      {isAuthenticated && <Navigation username={username} />}
      <Routes>
        <Route path="/" element={<Navigate to="/contracts" />} />
        <Route path="/login" element={<AuthRoute element={LoginPage} />} />
        <Route
          path="/contracts"
          element={<PrivateRoute element={ContractsPage} />}
        />
        <Route
          path="/customers"
          element={<PrivateRoute element={CustomersPage} />}
        />
        <Route
          path="/products"
          element={<PrivateRoute element={ProductsPage} />}
        />
        <Route
          path="/customers/:id"
          element={<PrivateRoute element={CustomerDetailsPage} />}
        />
        <Route
          path="/products/:id"
          element={<PrivateRoute element={ProductDetailsPage} />}
        />
        <Route
          path="/contracts/:id"
          element={<PrivateRoute element={ContractDetailsPage} />}
        />
        <Route
          path="/contracts/create"
          element={<PrivateRoute element={CreateContractPage} />}
        />
        <Route
          path="/customers/create"
          element={<PrivateRoute element={CreateCustomerPage} />}
        />
        <Route
          path="/products/create"
          element={<PrivateRoute element={CreateProductsPage} />}
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
