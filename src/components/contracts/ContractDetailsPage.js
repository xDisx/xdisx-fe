import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContract } from "../../services/contractService";
import { getProduct } from "../../services/productService";
import { getCustomer } from "../../services/customerService";
import Modal from "../common/reusable/Modal";
import "./ContractDetailsPage.scss";

const ContractDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [product, setProduct] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const statusTransitions = {
    CREATED: ["ACTIVE", "REJECTED"],
    ACTIVE: ["TERMINATED"],
  };

  useEffect(() => {
    const fetchData = async () => {
      const contractData = await getContract(id);
      setContract(contractData.data);
      if (contractData.data.productId) {
        const productData = await getProduct(contractData.data.productId);
        setProduct(productData.data);
      }
      if (contractData.data.customerId) {
        const customerData = await getCustomer(contractData.data.customerId);
        setCustomer(customerData.data);
      }
    };
    fetchData();
  }, [id]);

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
    //await updateContractStatus({ contractId: id, newStatus: actionToConfirm });
    //navigate("/contracts");
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
              <div className="dropdown-content">
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

      {showModal && (
        <Modal
          isOpen={showModal}
          title="Confirm Action"
          content={`Are you sure you want to change the status to ${actionToConfirm}?`}
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
        <div className="row">
          <div>
            <strong>Product Name:</strong>
            <div>{product?.productName}</div>
          </div>
        </div>
      </div>
      <div className="section">
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
      </div>
    </div>
  );
};

export default ContractDetailsPage;
