import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateContractPage.scss";
import { createContract } from "../../services/contractService";
import Select from "../common/reusable/Select";

const customers = [
  { id: 1, firstName: "John", lastName: "Doe" },
  { id: 2, firstName: "Jane", lastName: "Doe" },
  { id: 3, firstName: "Alice", lastName: "Johnson" },
  { id: 4, firstName: "Bob", lastName: "Smith" },
  { id: 5, firstName: "Charlie", lastName: "Brown" },
  { id: 6, firstName: "David", lastName: "Wilson" },
  { id: 7, firstName: "Eva", lastName: "Martinez" },
  { id: 8, firstName: "Fiona", lastName: "Chen" },
  { id: 9, firstName: "George", lastName: "Hernandez" },
  { id: 10, firstName: "Hannah", lastName: "Lee" },
  { id: 11, firstName: "Ian", lastName: "Kim" },
  { id: 12, firstName: "Julia", lastName: "Davis" },
  { id: 13, firstName: "Kyle", lastName: "Garcia" },
  { id: 14, firstName: "Liam", lastName: "Lopez" },
  { id: 15, firstName: "Mia", lastName: "Jones" },
  { id: 16, firstName: "Nora", lastName: "Perez" },
  { id: 17, firstName: "Oscar", lastName: "Young" },
  { id: 18, firstName: "Paula", lastName: "Harris" },
  { id: 19, firstName: "Quinn", lastName: "Clark" },
  { id: 20, firstName: "Rachel", lastName: "Lewis" },
];

const CreateContractPage = () => {
  const navigate = useNavigate();
  const [contractType, setContractType] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleSubmit = async () => {
    await createContract(contractType, selectedCustomerId);
    navigate("/contracts");
  };

  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
  }));

  return (
    <div className="contracts-container">
      <input
        type="text"
        value={contractType}
        onChange={(e) => setContractType(e.target.value)}
        placeholder="Contract Type"
      />
      <Select
        options={customerOptions}
        elementSelected={setSelectedCustomerId}
      />
      <button onClick={handleSubmit}>Create Contract</button>
    </div>
  );
};

export default CreateContractPage;
