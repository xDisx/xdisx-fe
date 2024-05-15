import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContract } from "../../services/contractService";
import { getProduct } from "../../services/productService";
import { updateContractStatus } from "../../services/contractService";
import { getCustomer } from "../../services/customerService";
import Modal from "../common/reusable/Modal";
import "./ContractDetailsPage.scss";
import { toast } from "react-toastify";

const ContractDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [product, setProduct] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [serviceUnavailableMessage, setServiceUnavailableMessage] =
    useState("");
  const [
    customerServiceUnavailableMessage,
    setCustomerServiceUnavailableMessage,
  ] = useState("");
  const [
    productServiceUnavailableMessage,
    setProductServiceUnavailableMessage,
  ] = useState("");
  const dropdownRef = useRef(null);

  const statusTransitions = {
    CREATED: ["ACTIVE", "REJECTED"],
    ACTIVE: ["TERMINATED"],
  };

  const successMessages = {
    REJECTED: "Contract succesfully rejected!",
    ACTIVE: "Contract succesfully activated!",
    TERMINATED: "Contract succesfully terminated!",
  };

  const modalMessages = {
    REJECTED: "Are you sure you want to reject the contract?",
    ACTIVE: "Are you sure you want to activate the contract?",
    TERMINATED: "Are you sure you want to terminate the contract?",
  };

  useEffect(() => {
    const fetchData = async () => {
      const contractData = await getContract(id);
      if (contractData.data.serviceDown) {
        setServiceUnavailableMessage(contractData.data.serviceDown);
      } else {
        setContract(contractData.data);
        if (contractData.data.productId) {
          const productData = await getProduct(contractData.data.productId);
          if (productData.data.serviceDown) {
            setProduct(null);
            setProductServiceUnavailableMessage(productData.data.serviceDown);
          } else {
            setProduct(productData.data);
            setProductServiceUnavailableMessage("");
          }
        }
        if (contractData.data.customerId) {
          const customerData = await getCustomer(contractData.data.customerId);
          if (customerData.data.serviceDown) {
            setCustomer(null);
            setCustomerServiceUnavailableMessage(customerData.data.serviceDown);
          } else {
            setCustomer(customerData.data);
            setCustomerServiceUnavailableMessage("");
          }
        }
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const confirmAction = (newStatus) => {
    setActionToConfirm(newStatus);
    setShowModal(true);
    setShowDropdown(false); // Close dropdown when modal opens
  };

  const handleConfirmAction = async () => {
    console.log({ contractId: id, newStatus: actionToConfirm });
    const response = await updateContractStatus(id, actionToConfirm);

    if (response.data.serviceDown) {
      toast.error(response.data.serviceDown);
      return;
    }

    toast.success(successMessages[actionToConfirm]);
    navigate("/contracts");
    setShowModal(false);
  };

  return (
    <div className="contract-details-page">
      <div className="header">
        <h1>Contract Details</h1>
        {contract && statusTransitions[contract.contractStatus] && (
          <div className="actions">
            <button onClick={handleDropdownToggle} className="action-button">
              Action
            </button>
            {showDropdown && (
              <div ref={dropdownRef} className="dropdown-content">
                {statusTransitions[contract.contractStatus].map((status) => (
                  <div key={status} onClick={() => confirmAction(status)}>
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {serviceUnavailableMessage ? (
        <div className="service-unavailable">{serviceUnavailableMessage}</div>
      ) : null}

      {showModal && (
        <Modal
          isOpen={showModal}
          title="Confirm Action"
          content={modalMessages[actionToConfirm]}
          onConfirm={handleConfirmAction}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className="section">
        <div className="row">
          <div>
            <strong>Device Code:</strong>
            <div>{contract?.deviceCode}</div>
          </div>
          <div>
            <strong>Device Type:</strong>
            <div>{contract?.deviceType}</div>
          </div>
          <div>
            <strong>Acquisition Date:</strong>
            <div>{contract?.acquisitionDate}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <strong>Created:</strong>
            <div>{contract?.created}</div>
          </div>
          <div>
            <strong>Status:</strong>
            <div>{contract?.contractStatus}</div>
          </div>
          <div>
            <strong>Start Date:</strong>
            <div>{contract?.contractStartDate || "-"}</div>
          </div>
        </div>
        <div className="row">
          <div>
            <strong>Planned End Date:</strong>
            <div>{contract?.contractPlannedEndDate || "-"}</div>
          </div>
        </div>
      </div>
      <div className="section">
        {productServiceUnavailableMessage ? (
          <div className="service-unavailable">
            {productServiceUnavailableMessage}
          </div>
        ) : (
          <div className="row">
            <div>
              <strong>Product Name:</strong>
              <div>{product?.productName}</div>
            </div>
          </div>
        )}
      </div>

      <div className="section">
        {customerServiceUnavailableMessage ? (
          <div className="service-unavailable">
            {customerServiceUnavailableMessage}
          </div>
        ) : (
          <>
            <h3>Customer information</h3>
            <div className="row">
              <div>
                <strong>First Name:</strong>
                <div>{customer?.firstName}</div>
              </div>
              <div>
                <strong>Last Name:</strong>
                <div>{customer?.lastName}</div>
              </div>
            </div>
            <div className="row">
              <div>
                <strong>Phone Number:</strong>
                <div>{customer?.phoneNumber}</div>
              </div>
              <div>
                <strong>Email:</strong>
                <div>{customer?.email}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContractDetailsPage;
