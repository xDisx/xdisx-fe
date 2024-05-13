import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateContractPage.scss";
import { createContract } from "../../services/contractService";
import { getCustomers } from "../../services/customerService";
import { getProducts } from "../../services/productService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // This imports the default styling for the date picker

const CreateContractPage = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deviceCode, setDeviceCode] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState(new Date());
  const [deviceType, setDeviceType] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedConfiguration, setSelectedConfiguration] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (customerName.length > 2) {
      const searchParams = { customerName };
      getCustomers(searchParams, 0).then((response) => {
        setCustomers(response.data.customers);
      });
    } else {
      setCustomers([]);
    }
  }, [customerName]);

  useEffect(() => {
    if (deviceType) {
      getProducts(deviceType).then((response) => {
        setProducts(response.data);
      });
    }
  }, [deviceType]);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCustomers([]);
    setCustomerName(customer.firstName + " " + customer.lastName);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setCustomers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateContract = async () => {
    const { period, price } = selectedConfiguration || {};
    if (selectedCustomer?.id && selectedProduct?.id && period && price) {
      await createContract({
        customerId: selectedCustomer.id,
        productId: selectedProduct.id,
        period,
        price,
      });
      navigate("/contracts");
    }
  };

  return (
    <div className="create-contract-container">
      <section>
        <h2>Select Customer</h2>
        <input
          type="search"
          className="customer-search"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Search customer by name"
        />
        {customers.length > 0 && (
          <div ref={dropdownRef} className="customer-dropdown">
            {customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => handleSelectCustomer(customer)}
                className="customer-option"
              >
                {customer.firstName} {customer.lastName}
              </div>
            ))}
          </div>
        )}
        {selectedCustomer && (
          <div className="customer-info">
            <p>
              <strong>First Name:</strong> {selectedCustomer.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {selectedCustomer.lastName}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedCustomer.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {selectedCustomer.address}
            </p>
          </div>
        )}
      </section>

      <section>
        <h2>Device Information</h2>
        <label htmlFor="deviceCode">Device Code</label>
        <input
          id="deviceCode"
          type="text"
          className="device-input"
          value={deviceCode}
          onChange={(e) => setDeviceCode(e.target.value)}
          placeholder="Device Code"
        />
        <label htmlFor="acquisitionDate">Acquisition Date</label>
        <DatePicker
          id="acquisitionDate"
          className="date-picker"
          selected={acquisitionDate}
          onChange={(date) => setAcquisitionDate(date)}
          maxDate={new Date()}
        />
        <div className="device-types">
          {["Laptop", "Smartphone", "Tablet"].map((type) => (
            <label key={type} className="device-type">
              <input
                type="radio"
                name="deviceType"
                value={type}
                checked={deviceType === type}
                onChange={() => setDeviceType(type)}
              />{" "}
              {type}
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2>Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                selectedProduct?.id === product.id ? "selected" : ""
              }`}
              onClick={() => setSelectedProduct(product)}
            >
              {selectedProduct?.id === product.id && (
                <div className="checkmark">✔</div>
              )}
              <h3>{product.productName}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <section>
          <h2>Pricing Information</h2>
          <table>
            <thead>
              <tr>
                <th>Period (Years)</th>
                <th>Price (EUR)</th>
              </tr>
            </thead>
            <tbody>
              {selectedProduct.durationOptions.map((option, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedConfiguration(option)}
                  className={
                    selectedConfiguration?.id === option.id ? "selected" : ""
                  }
                >
                  <td>{option.years}</td>
                  <td>{option.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <button
        onClick={handleCreateContract}
        disabled={
          !selectedCustomer || !selectedProduct || !selectedConfiguration
        }
      >
        Create Contract
      </button>
    </div>
  );
};

export default CreateContractPage;
