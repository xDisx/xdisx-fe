import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateContractPage.scss";
import { createContract } from "../../services/contractService";
import { getCustomers } from "../../services/customerService";
import { getProducts } from "../../services/productService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // This imports the default styling for the date picker
import { toast } from "react-toastify";

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
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");
  const [
    productServiceUnavailableMessage,
    setProductServiceUnavailableMessage,
  ] = useState("");

  useEffect(() => {
    if (customerName.length > 2) {
      const searchParams = { customerName };
      getCustomers(searchParams, 0).then((response) => {
        if (response.data.customers) {
          setCustomers(response.data.customers);
          setServiceUnavailableMessage("");
        } else if (response.data.serviceDown) {
          setCustomers([]);
          setServiceUnavailableMessage(response.data.serviceDown);
        }
      });
    } else {
      setCustomers([]);
    }
  }, [customerName]);

  useEffect(() => {
    if (deviceType) {
      getProducts({ deviceType: deviceType.toUpperCase() }).then((response) => {
        if (response.data.serviceDown) {
          setProductServiceUnavailableMessage(response.data.serviceDown);
          setProducts([]);
          setSelectedProduct(null);
        } else {
          setProducts(response.data);
          setProductServiceUnavailableMessage("");
        }
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
    const { years, price } = selectedConfiguration || {};

    if (
      selectedCustomer?.id &&
      selectedProduct?.id &&
      years &&
      price &&
      deviceCode &&
      deviceType
    ) {
      const response = await createContract(
        selectedCustomer.id,
        selectedProduct.id,
        years,
        price,
        deviceCode,
        deviceType.toUpperCase(),
        acquisitionDate
      );
      if (response.data.serviceDown) {
        toast.error("Contract service is down, please try again later!");
        return;
      }
      toast.success("Contract successfully created");

      navigate(`/contracts/${response.data.id}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCustomerName(value);
    if (value.length > 2) {
      const searchParams = { customerName: value };
      getCustomers(searchParams, 0).then((response) => {
        if (response.data.customers) {
          setCustomers(response.data.customers);
          setServiceUnavailableMessage("");
        } else if (response.data.serviceDown) {
          setCustomers([]);
          setSelectedCustomer(null);
          setServiceUnavailableMessage(response.data.serviceDown);
        }
      });
    } else {
      setCustomers([]);
      setSelectedCustomer(null);
    }
  };

  const handleSelectConfiguration = (option) => {
    setSelectedConfiguration(option);
    console.log("Selected Configuration: ", option);
  };

  const formatDateForAPI = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0"); // Months are zero-indexed in JS
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setAcquisitionDate(formatDateForAPI(date));
  };

  return (
    <div className="create-contract-container">
      <h1>Create a new contract</h1>
      <section>
        <h2>Select Customer</h2>
        <input
          type="search"
          className="customer-search"
          value={customerName}
          onChange={handleInputChange}
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
        {serviceUnavailableMessage && (
          <div className="service-unavailable">{serviceUnavailableMessage}</div>
        )}
      </section>
      <section>
        <h2>Device Information</h2>
        <input
          type="text"
          className="device-input"
          value={deviceCode}
          onChange={(e) => setDeviceCode(e.target.value)}
          placeholder="Device Code"
        />
        <div className="acquisition">Acquisition Date</div>
        <DatePicker
          id="acquisitionDate"
          className="date-picker"
          selected={acquisitionDate}
          onChange={handleDateChange}
          maxDate={new Date()}
          dateFormat={"dd.MM.yyyy"}
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
          {products &&
            products.map((product) => (
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
        {productServiceUnavailableMessage && (
          <div className="service-unavailable">
            {productServiceUnavailableMessage}
          </div>
        )}
      </section>
      {selectedProduct && (
        <section>
          <div className="pricing-section">
            <h2>Pricing Information</h2>
            <div className="pricing-list">
              {selectedProduct.durationOptions.map((option) => (
                <div
                  key={option.id}
                  className={`pricing-item ${
                    selectedConfiguration?.id === option.id ? "selected" : ""
                  }`}
                  onClick={() => handleSelectConfiguration(option)}
                >
                  <span className="year">{option.years} Years</span>
                  <span className="price">€{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <button
        onClick={handleCreateContract}
        disabled={
          !selectedCustomer ||
          !selectedProduct ||
          !selectedConfiguration ||
          !deviceCode ||
          !deviceType
        }
      >
        Add Contract
      </button>
    </div>
  );
};

export default CreateContractPage;
