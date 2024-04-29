import React, { useState } from "react";
import { createContract } from "../../services/contractService";

function ContractForm() {
  const [contractType, setContractType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = await createContract(contractType);
    console.log(contract.data);
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="contractType" className="form-label">
                Contract Type:
              </label>
              <input
                type="text"
                className="form-control"
                id="contractType"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
              />
            </div>
            <div className="col-md-6 d-flex align-items-end flex-column">
              <div className="mt-auto p-2">
                <button type="submit" className="btn btn-primary mt-2">
                  Create Contract
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContractForm;
