import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCustomerPage.scss";
import { createCustomer } from "../../services/customerService";
import { toast } from "react-toastify";

const CreateCustomerPage = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [gdprConsent, setGdprConsent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const checkFormValidity = () => {
      const { firstName, lastName, email, phoneNumber, address } = customer;
      return (
        firstName && lastName && email && phoneNumber && address && gdprConsent
      );
    };
    setIsFormValid(checkFormValidity());
  }, [customer, gdprConsent]);

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const toggleGdprConsent = () => {
    setGdprConsent(!gdprConsent);
  };

  const handleCreate = async () => {
    const { firstName, lastName, email, phoneNumber, address } = customer;
    if (isFormValid) {
      try {
        const response = await createCustomer(
          firstName,
          lastName,
          email,
          phoneNumber,
          address
        );
        if (response.data.serviceDown) {
          toast.error("Customer service is down, please try again later!");
          return;
        }
        toast.success("Customer created succesfully!");
        navigate("/customers");
      } catch (error) {
        console.error("Failed to add customer:", error);
      }
    }
  };

  return (
    <div className="create-customer-container">
      <div className="customer-info">
        <h2>Customer Information</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={customer.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={customer.lastName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={customer.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="gdpr-consent">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={gdprConsent}
            onChange={toggleGdprConsent}
          />
          <span className="slider round"></span>
        </label>
        GDPR Consent
      </div>
      <button
        onClick={handleCreate}
        className="create-button"
        disabled={!isFormValid}
      >
        Add Customer
      </button>
    </div>
  );
};

export default CreateCustomerPage;
